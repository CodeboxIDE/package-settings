define([
    "src/schema"
], function(Schema) {
    var _ = codebox.require("hr/utils");
    var hr = codebox.require("hr/hr");
    var File = codebox.require("models/file");

    var Manager = hr.Model.extend({
        defaults: {},

        initialize: function() {
            Manager.__super__.initialize.apply(this, arguments);

            this.schemas = new (hr.Collection.extend({ model: Schema }));
        },

        // Add/Get a schema
        schema: function(id, infos) {
            var that = this;

            if (!infos) {
                var normKey = function(key) {
                    if (!key) return id;
                    return id+"."+key;
                };

                return {
                    get: function(key, def) {
                        return that.get(normKey(key), def);
                    },
                    set: function(key, value) {
                        return that.set(normKey(key), value);
                    },
                    change: function(key, func) {
                        if (!func) {
                            key = null;
                            func = key;
                        }
                        that.on("change:"+normKey(key), func);
                    }
                };
            }

            this.schemas.add({
                'id': id,
                'schema': infos
            });

            return this.schema(id);
        },

        // Export
        exportJson: function() {
            var that = this;
            return _.object(
                this.schemas.map(function(schema) {
                    return [
                        schema.id,
                        _.extend({}, schema.getDefaults(), that.get(schema.id) || {})
                    ];
                })
            );
        },

        // Get file
        getFile: function() {
            var code = JSON.stringify(this.exportJson(), null, 4);
            var f = File.buffer("Codebox Settings.json", code, "codebox-settings.json");
            return f;
        }
    });

    return Manager;
});
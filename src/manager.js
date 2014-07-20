define(function() {
    var _ = codebox.require("hr/utils");
    var hr = codebox.require("hr/hr");

    var Manager = hr.Model.extend({
        defaults: {},

        initialize: function() {
            Manager.__super__.initialize.apply(this, arguments);

            this.models = new hr.Collection();
        },

        // Add/Get a model
        model: function(id, infos) {
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

            this.models.add(_.extend({}, infos, {
                'id': id
            }));

            return this.model(id);
        }
    });

    return Manager;
});
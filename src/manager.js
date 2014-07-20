define([
    "src/schema"
], function(Schema) {
    var _ = codebox.require("hr/utils");
    var hr = codebox.require("hr/hr");
    var File = codebox.require("models/file");

    var Manager = hr.Class.extend({
        initialize: function() {
            Manager.__super__.initialize.apply(this, arguments);

            this.schemas = new (hr.Collection.extend({ model: Schema }));
        },

        // Add/Get a schema
        schema: function(id, infos) {
            var that = this;

            if (!infos) return this.schemas.get(id);

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
                        schema.getData()
                    ];
                })
            );
        },

        // Import
        importJSON: function(data) {
            this.schemas.each(function(schema) {
                schama.data.set(data[schema.id] || {});
            });
        },

        // Get file
        getFile: function() {
            // Generate the string content
            var code = JSON.stringify(this.exportJson(), null, 4);

            // Build the file buffer
            var f = File.buffer("Codebox Settings.json", code, "codebox-settings.json");

            // Handle write operations
            this.listenTo(f, "write", function(data) {
                this.importJSON(JSON.parse(data));
            });

            return f;
        }
    });

    return Manager;
});
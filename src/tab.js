var templateForm = require("./templates/form.html");

var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var FormView = codebox.require("views/form");
var View = codebox.require("hr.view");

var Tab = codebox.tabs.Panel.inherit(View.Template).extend({
    className: "component-settings",
    template: templateForm,
    events: {
        "click .do-submit": "onSubmit",
        "click .do-open-json": "onOpenJson"
    },

    initialize: function() {
        Tab.__super__.initialize.apply(this, arguments);

        this.form = new FormView({
            schema: codebox.settings.toSchema(),
            values: codebox.settings.exportJson()
        });

        this.listenTo(codebox.settings, "change", function() {
            _.defer(this.form.setValues.bind(this.form), codebox.settings.exportJson());
        });
    },

    render: function() {
        this.form.detach();
        this.form.update();

        return Tab.__super__.render.apply(this, arguments);
    },

    finish: function() {
        this.form.$el.appendTo(this.$(".form-content"));

        return Tab.__super__.finish.apply(this, arguments);
    },

    // Submit form
    onSubmit: function(e) {
        if (e) e.preventDefault();

        var data = this.form.getValues();
        codebox.settings.importJSON(data);
    },

    // Open as json
    onOpenJson: function(e) {
        if (e) e.preventDefault();

        return commands.run("file.open", {
            file: codebox.settings.getFile()
        });
    }
});

module.exports = Tab;

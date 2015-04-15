var templateForm = require("./templates/form.html");

var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var FormView = codebox.require("views/form");
var View = codebox.require("hr.view");

var Dialog = View.Template.extend({
    tagName: "div",
    className: "component-settings",
    template: templateForm,
    events: {
        "click .do-submit": "doSubmit",
        "click .do-open-json": "doOpenJson",
        "click .do-close": "doClose"
    },

    initialize: function() {
        Dialog.__super__.initialize.apply(this, arguments);

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

        return Dialog.__super__.render.apply(this, arguments);
    },

    finish: function() {
        this.form.$el.appendTo(this.$(".form-content"));

        return Dialog.__super__.finish.apply(this, arguments);
    },

    // Submit form
    doSubmit: function(e) {
        if (e) e.preventDefault();

        var data = this.form.getValues();
        codebox.settings.importJSON(data);
        this.parent.close(e);
    },

    // Open as json
    doOpenJson: function(e) {
        var that = this;
        if (e) e.preventDefault();

        return commands.run("file.open", {
            file: codebox.settings.getFile()
        })
        .then(function() {
            that.parent.close();
        });
    },

    // Close dialog
    doClose: function(e) {
        this.parent.close(e);
    }
});

module.exports = Dialog;

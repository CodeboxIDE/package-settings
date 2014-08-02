define(function() {
    var hr = codebox.require("hr/hr");
    var FormView = codebox.require("views/form");

    var Tab = codebox.tabs.Panel.extend({
        className: "component-settings",

        initialize: function() {
            Tab.__super__.initialize.apply(this, arguments);

            this.form = new FormView({
                schema: codebox.settings.toSchema(),
                values: codebox.settings.exportJson(),
                submit: "Save Settings"
            });

            this.listenTo(this.form, "submit", function(data) {
                console.log("save ", data);
                codebox.settings.importJSON(data);
            });

            this.form.update();
            this.form.appendTo(this);
        }
    });

    return Tab;
});
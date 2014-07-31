define(function() {
    var hr = codebox.require("hr/hr");
    var FormView = codebox.require("views/form");

    var Tab = codebox.tabs.Panel.extend({
        className: "component-settings",

        initialize: function() {
            Tab.__super__.initialize.apply(this, arguments);

            this.form = new FormView({
                schema: codebox.settings.toSchema(),
                values: codebox.settings.exportJson()
            })
        },

        templateContext: function() {
            return {
                models: this.model.models,
                values: this.model.toJSON()
            };
        }
    });

    return Tab;
});
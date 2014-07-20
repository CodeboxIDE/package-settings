define([
    "text!src/templates/tab.html"
], function(templateFile) {
    var hr = codebox.require("hr/hr");

    var Tab = codebox.tabs.Panel.extend({
        className: "component-settings",
        template: templateFile,

        initialize: function() {
            Tab.__super__.initialize.apply(this, arguments);
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
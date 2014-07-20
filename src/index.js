define([
    "src/tab",
    "src/manager",
    "less!src/stylesheets/main.less"
], function(Tab, Manager) {
    var commands = codebox.require("core/commands");
    var dialogs = codebox.require("utils/dialogs");

    var manager = new Manager();

    commands.register({
        id: "settings.open",
        title: "Settings: Open",
        run: function(args, context) {
            return codebox.tabs.add(Tab, {
                model: manager
            }, {
                type: "settings",
                title: "Settings",
                uniqueId: "settings"
            });
        }
    });

    // Exports settings manager
    codebox.settings = manager;
});
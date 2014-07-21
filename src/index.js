define([
    "src/manager"
], function(Manager) {
    var commands = codebox.require("core/commands");

    var manager = new Manager();

    commands.register({
        id: "settings.open",
        title: "Settings: Open",
        shortcuts: [
            "mod+,"
        ],
        run: function(args, context) {
            return commands.run("file.open", {
                file: manager.getFile()
            });
        }
    });

    // Exports settings manager
    codebox.settings = manager;

    // Load settings
    manager.load();
});
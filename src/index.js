define([
    "src/tab",
    "less!src/stylesheets/main.less"
], function(Tab) {
    var commands = codebox.require("core/commands");

    // Modify current command to open settings
    var openSettings = commands.get("settings.open");
    var baseRunner = openSettings.get("run");

    openSettings.set("run", function() {
        return codebox.tabs.add(Tab, {}, {
            uniqueId: "settings",
            type: "settings",
            title: "Settings"
        });
    });
});
require("./stylesheets/main.less");

var Dialog = require("./dialog");

var commands = codebox.require("core/commands");
var dialogs = codebox.require("utils/dialogs");

// Modify current command to open settings
var openSettings = commands.get("settings.open");
var baseRunner = openSettings.get("run");

openSettings.set("run", function() {
    return dialogs.open(Dialog, {
        size: "large"
    });
});

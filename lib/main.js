
module.exports = function(codebox) {
    codebox.rpc.service("settings", {
        'get': function() {
            return codebox.hooks.use("settings.get");
        },
        'set': function(args) {
            return codebox.hooks.use("settings.set", args);
        }
    });
};

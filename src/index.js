define([
    "less!src/stylesheets/main.less"
], function() {
    var commands = codebox.require("core/commands");
    var dialogs = codebox.require("utils/dialogs");

    commands.register({
        id: "settings.open",
        title: "Settings: Open",
        run: function(args, context) {
            /*return codebox.tabs.add(codebox.tabs.HtmlPanel, {
                className: "component-markdown-preview",
                content: markdown.render(context.getContent())
            }, {
                type: "markdown",
                title: "Markdown: " + context.model.get("name"),
                section: "markdown"
            });*/
        }
    });
});
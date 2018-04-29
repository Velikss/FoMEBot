const Command = require("../structures/Command.js");

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Displays all available commands.",
            category: "System",
            usage: "help [command]",
            aliases: ["h", "halp"]
        });
    }

    async run(message, args) {
        //If no specific command is called, show all commands
        if (!args[0]) {
            const myCommands = this.client.commands;

            //Fetch command names, sort by longest
            //This makes help commands "aligned" in the output.
            const commandNames = myCommands.keyArray();
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            let currentCategory = "";
            let output = `= Command List =\n\n[Use ${this.client.config.prefix}help <commandname> for details]\n`;

            const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
            sorted.forEach( c => {
                const cat = c.help.category;
                if (currentCategory !== cat) {
                    output += `\u200b\n== ${cat} ==\n`;
                    currentCategory = cat;
                }
                output += `${this.client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
            });
            message.channel.send(output, {code:"asciidoc", split: { char: "\u200b" }});
        } else {
            // Show individual command's help.
            let command = args[0];
            if (this.client.commands.has(command)) {
                command = this.client.commands.get(command);
                message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}`, {code:"asciidoc"});
            }
        }
    }
}

module.exports = Help;

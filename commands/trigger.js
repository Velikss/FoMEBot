const Command = require("../structures/Command.js");

class Trigger extends Command {
    constructor(client) {
        super(client, {
            name: "trigger",
            description: "Changes the triggers available to the bot",
            usage: 'trigger <add/del> "<key>" "<value>"',
            permission: 5
        });
    }

    async run(message, args) {

        const raw = args.slice(1).join(" ");

        //regex magic don't worry about it too much
        const clean = raw.match(/\w+|"[^"]+"/g).map(phrase => phrase.replace(/['"]/g, ''));

        var key = clean[0].toLowerCase(),
            val = clean[1];

        switch(args[0]) {
            case "add":
                if (clean.length === 2) {

                    this.client.dic[key] = val;
                    this.client.saveList();

                    message.channel.send(`You added key "${key}" with value "${val}"`);
                }
                else {
                    message.channel.send(`Arguments invalid! See \`${this.client.config.prefix}help\` for more information.`);
                }
                break;

            case "del":
                if (clean.length === 1) {
                    if (this.client.dic[key]){
                        delete this.client.dic[key];
                        this.client.saveList();

                        message.channel.send(`Deleted trigger "${key}" from the list!`);
                    }
                    else {
                        message.channel.send("Key does not exist!");
                    }
                }
                else {
                    message.channel.send(`Arguments invalid! See \`${this.client.config.prefix}help\` for more information.`);
                }
                break;

            default:
                message.channel.send(`Unknown argument. See \`${this.client.config.prefix}help\` for more information.`);
        }
    }
}

module.exports = Trigger;

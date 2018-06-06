const Command = require("../structures/Command.js");

class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            description: "Checks uptime of bot.",
            category: "System",
            usage: "uptime"
        });
    }

    async run(message, args) {
            var raw_seconds = Math.floor(this.client.uptime / 1000)
            var minutes = Math.floor(raw_seconds / 60);
            var seconds = Math.floor(raw_seconds % 60);
            message.channel.send(`I have been running for: ${minutes} minutes and ${seconds} seconds`);
    }
}

module.exports = Uptime;

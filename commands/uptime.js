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
        if (message.member.roles.find("name", "Staff")) {
            var minutes = this.client.uptime / 1000 / 60;
            message.channel.send('I have been running for: ' + minutes + ' minutes.');
        } else {
            message.channel.send('Sadly this command is not available to you :slight_frown:');
        }
    }
}

module.exports = Uptime;

const Command = require("../structures/Command.js");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Latency response times.",
            usage: "ping",
            aliases: ["pong"]
        });
    }

    async run(message, args) {
        try {
            const msg = await message.channel.send("Ping!");
            msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
        } catch (e) {
           this.client.logger.error(e);
        }
    }
}

module.exports = Ping;

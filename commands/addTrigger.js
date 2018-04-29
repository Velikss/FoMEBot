const Command = require("../structures/Command.js");

class AddTrigger extends Command {
    constructor(client) {
        super(client, {
            name: "addTrigger",
            description: "Adds a trigger and response.",
            category: "System"n
            usage: 'addTrigger "trigger" "response"'
        });
    }

    async run(message, args) {
        try {
            const msg = await message.channel.send("Ping!");
            msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = AddTrigger;

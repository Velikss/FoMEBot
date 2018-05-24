const Command = require("../structures/Command.js");

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Evaluates arbitrary Javascript.",
            category: "System",
            usage: "eval <expression>",
            aliases: ["ev"],
        });
    }

    async run(message, args) {
        // this.client.logger.log(this.client.config.owner.indexOf(message.author.id) == -1);
        if (this.client.config.owner.indexOf(message.author.id) == -1) return;

        const code = args.join(" ");
        try {
            const evaled = eval(code);
            const clean = await this.client.clean(this.client, evaled);
            message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(this.client, err)}\n\`\`\``);
        }

    }
}

module.exports = Eval;

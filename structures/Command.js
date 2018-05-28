class Command{
    constructor(client, {
        name = null,
        description = "No description provided.",
        category = "Miscellaneous",
        permLevel = 0,
        usage = "No usage provided.",
        aliases = ["N/A"]
    }) {
        this.client = client;
        this.conf = { aliases, permLevel };
        this.help = { name, description, category, usage };
    }

    async run(message, args) {
        throw new Error(`Command ${this.constructor.name} doesn't provide a run method.`);
    }
}

module.exports = Command;

const Discord = require("discord.js");
const list = require("./list.json");
const fs = require("fs");
const Enmap = require("enmap"); //Kinda like Collections but better caching and storage
const path = require("path");
const klaw = require("klaw");

class Crusader extends Discord.Client {
    constructor(options) {
        super(options);
        this.config = require("./config.json");
        this.logger = require("./util/Logger");

        this.dic = new Object;
        this.commands = new Enmap();
        this.aliases = new Enmap();
    }

    //Cleans input, mainly for eval.
    async clean(client, text){
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof evaled !== "string")
            text = require("util").inspect(text, {depth: 0});

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "NO TOKEN FOR YOU");

        return text;
    }

    loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(client);
            client.logger.log(`Loading Command: ${props.help.name}. 👌`);
            props.conf.location = commandPath;
            if (props.init) {
                props.init(client);
            }
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    permlevel(message)
    {
        if (client.config.owner.indexOf(message.author.id) !== -1) return 10;

        else if (message.member.roles.find("name", client.config.modRole)) return 5;

        else return 0;
    }
}

const client = new Crusader();

const init = async () => {

    await fs.readFile('./list.json', 'utf8', (err, data) => {
        if (err) throw err;
        client.dic = JSON.parse(data);
    });

    //Command Handler
    klaw("./commands").on("data", (item) => {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== ".js") return;
        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
        if (response) client.logger.warn(response);
    });

    //Initializing events
    await fs.readdir("./events/", (err, files) => {
        client.logger.log("Loading a total of " + files.length + " events...");
        if (err) console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let eventFunction = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            // super-secret recipe to call events with all their proper arguments *after* the `client` var.
            client.on(eventName, (...args) => eventFunction.run(client, ...args));
        });
    });

    //Code to be run when a message is received
    client.login(client.config.token);
}

init();

client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
    .on("reconnect", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", e => client.logger.error(e))
    .on("warn", info => client.logger.warn(info));

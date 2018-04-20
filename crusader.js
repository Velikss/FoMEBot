const Discord = require("discord.js");
const config = require("./config.json");
const list = require("./list.json");
const fs = require("fs");

const client = new Discord.Client();

var obj;
fs.readFile('./list.json', 'utf8', function (err, data) {
	if (err)
	    throw err;
	obj = JSON.parse(data);
//	console.log(obj);
});

//Start logger
var logger = require('winston');
logger.remove(logger.transports.Console);
logger.level = 'debug';
logger.add(logger.transports.Console, {
    colorize: true
});

//Initializing events
fs.readdir("./events/", (err, files) => {
    console.log("Loading a total of " + files.length + " events...");
    if (err)
        return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

//Code to be run when a message is received
client.on("message", (message) => {
//Blocks bots, except for the gamechat bot
    if (message.author.bot && message.author.id !== "366713944695373834")
        return;
	
//Reminds people that tagging staff in staff-help is needless, hopefully they will remember...
    if (message.channel.name === "staff-help" && message.isMentioned("338451664816308225")) {
        message.channel.send("**Infidel!** There is no need to tag staff in this channel!");
        console.log(message.author.username + 'TAGGED STAFF IN STAFF-HELP REEEEEEEE');
        return;
    }

    if (message.content.indexOf(config.prefix) === 0) {
        console.log(message.author.username + ' tried running command:' + message.content + " (#" + message.channel.name + ")");
        // This is the best way to define args. Trust me.
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        // The list of if/else is replaced with those simple 2 lines:
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {
            console.error(err);
        }
    }

//If bot gets mentioned
    if (message.isMentioned(client.user)) {
        message.reply('what do you want, you filthy infidel.');
    }

//Loop for responses
    var message_content = message.content.toLowerCase();
    Object.keys(obj).forEach(key => {
        if (message_content.includes(key))
        {
	    console.log("Found key \"" + key + "\" in message \"" + message_content + "\" sent by " + message.author.username + " (#" + message.channel.name + ")");
            message.channel.send(obj[key]);
        }
    });

});
client.login(config.token);

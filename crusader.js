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

    if (message.author.bot && message.author.id !== "366713944695373834")
        return;

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

//Basic response commands
/*
    if (message_content.includes("what will you take") || message_content.includes("what will we take")) {
        console.log(message.author.username + ' said: ' + message.content);
        message.channel.send("**WE WILL TAKE JERUSALEM**");
    } else if (message_content.includes("we will take jerusalem")) {
        console.log(message.author.username + ' said: ' + message.content);
        message.channel.send("**DEUS VULT**");
    } else if (message_content.includes("what is 1+1")) {
        console.log(message.author.username + ' said: ' + message.content);
        message.channel.send("**DEUS VULT**");
    } else if (message_content.includes("what is our mission")) {
        console.log(message.author.username + ' said: ' + message.content);
        message.channel.send("**To slay the Saracens!!11!!!1!!1**");
    } else if (message_content.includes("deus vult") || message_content.includes("gods will")) {
        console.log(message.author.username + ' said: ' + message.content);
        message.react("436514499156115480");
        message.channel.send("Yes! **DEUS VULT**");
    } else if (message.content === "no u") {
        console.log(message.author.username + ' said: ' + message.content);
        message.channel.send("Infidel!");
    }
*/
});
client.login(config.token);

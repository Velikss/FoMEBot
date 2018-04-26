const Discord = require("discord.js");
const list = require("./list.json");
const fs = require("fs");

const client = new Discord.Client();
client.config = require("./config.json");

fs.readFile('./list.json', 'utf8', function (err, data) {
	if (err)
	    throw err;
	client.dic = JSON.parse(data);
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
        if (!file.endsWith(".js")) return;
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

//Code to be run when a message is received
client.login(client.config.token);

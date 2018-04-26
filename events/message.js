exports.run = (client, message) => {
    //Blocks bots, except for the gamechat bot and ignore discordconsole channel
    if (message.author.bot && message.author.id !== "366713944695373834" || message.channel.id === "381458100986839041")
        return;

    //Reminds people that tagging staff in staff-help is needless, hopefully they will remember...
    //     if (message.channel.name === "staff-help" && message.isMentioned("338451664816308225")) {
    //         message.channel.send("**Infidel!** There is no need to tag staff in this channel!");
    //         console.log(message.author.username + 'TAGGED STAFF IN STAFF-HELP REEEEEEEE');
    //         return;
    //     }

    if (message.content.indexOf(client.config.prefix) === 0) {
        console.log(message.author.username + ' tried running command:' + message.content + " (#" + message.channel.name + ")");
        // This is the best way to define args. Trust me.
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
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
    Object.keys(client.dic).forEach(key => {
        if (message_content.includes(key))
        {
            console.log("Found key \"" + key + "\" in message \"" + message_content + "\" sent by " + message.author.username + " (#" + message.channel.name + ")");
            message.channel.send(client.dic[key]);
        }
    });
}

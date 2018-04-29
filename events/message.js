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

        // This is the best way to define args. Trust me.
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        //Check if the command or alias exists
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (!cmd) return;

        //Logs and runs
        console.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
        cmd.run(message, args);

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
            console.log(`Found key "${key}" in message "${message_content}" sent by ${message.author} (#${message.channel.name})`);
            message.channel.send(client.dic[key]);
        }
    });
}

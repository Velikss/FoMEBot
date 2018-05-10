exports.run = (client, message) => {

    //Blocks bots, except for the gamechat bot and ignore discordclient.logger channel
    if (message.author.bot && message.author.id !== "366713944695373834" || message.channel.id === "381458100986839041") return;

    if (message.content.indexOf(client.config.prefix) === 0) {

        // This is the best way to define args. Trust me.
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        //Check if the command or alias exists
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (!cmd) return;

        //Logs and runs
        client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
        cmd.run(message, args);
    }

    //Stops running if the channel isn't the designated meme channel
    if (client.config.memeChannel && message.channel.id !== client.config.memeChannel) return;

    //If bot gets mentioned
    if (message.isMentioned(client.user)) {
        message.reply('what do you want, you filthy infidel.');
    }

    //Loop for responses
    var message_content = message.content.toLowerCase();
    Object.keys(client.dic).map(key => {
        if (message_content.includes(key))
        {
            client.logger.log(`Found key "${key}" in message "${message_content}" sent by ${message.author.username} (#${message.channel.name})`, "cmd");
            message.channel.send(client.dic[key]);
        }
    });
}

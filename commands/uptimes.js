exports.run = (client, message, args) => {
    if (message.member.roles.find("name", "Staf")) {
        var minutes = client.uptime / 1000 / 60;
        message.channel.send('I have been running for: ' + minutes + ' minutes.');
    } else {
        message.channel.send('Sadly this command is not available to you :slight_frown:');
        message.react(":ok:");
    }
};


exports.run = (client, message, args) => {
    message.channel.send('Current latency is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
};


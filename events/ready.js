exports.run = (client) => {
  client.logger.log(`Ready to serve in ` + client.channels.size + ` channels on ` + client.guilds.size + ` servers, for a total of ` + client.users.size + ` users.`, "ready");
  client.user.setActivity('with infidels');
}



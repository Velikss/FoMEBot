exports.run = (client, member) => {
  member.guild.channels.find("name", "welcome").send(member.user + ' just left the guild! 🙁');
  console.log(member.displayName + " left " + member.guild.name);
};

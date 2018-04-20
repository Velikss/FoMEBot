exports.run = (client, member) => {
  member.guild.channels.find("name", "welcome").send("Welcome " + member.user + " to the Fellowships of Middle Earth discord guild!");
  console.log(member.user + " joined " + member.guild.name);
};

exports.run = (client, member) => {
  member.guild.channels.find("name", "welcome").send("Welcome " + member.user + " to the Fellowships of Middle Earth discord server!");
  console.log(member.displayName + " joined " + member.guild.name);
};

exports.run = (client, member) => {
  const WelcomeChannel = member.guild.channels.find("id", "436973797304827924");
  WelcomeChannel.send('Welcome ' + member.user + ' to the Fellowships of Middle Earth discord guild!');
  console.log(member.user + " joined " + member.guild.name);
};

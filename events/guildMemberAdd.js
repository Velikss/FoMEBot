exports.run = (client, member) => {
  const WelcomeChannel = member.guild.channels.find("id", "336852719950364674");
  defaultChannel.send('Welcome ' + member.user + ' to the Fellowships of Middle Earth discord guild!');
  console.log(member.user + " joined " + member.guild.name);
};

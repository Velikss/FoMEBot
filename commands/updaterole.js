const Command = require("../structures/Command.js");

class UpdateRole extends Command {
    constructor(client) {
        super(client, {
            name: "updaterole",
            description: "Gives everyone a role, optional time requirement",
            category: "System",
            permLevel: 10,
            usage: "updaterole <roleid> [ammount of days the users must have been present]"
        });
    }

    async run(message, args) {
        if(!args[0]) {

          message.channel.send("You did not enter a role!");

        } if (args.length == 1) {

          let role = message.guild.roles.find(role => role.name === args[0]);

          let addedCount = 0;
          let removedCount = 0;
          let alreadyHadRoleCount = 0;

          //Checks each member and adds role if possible
          message.channel.send("*Processing users...* ⚠").then((msg)=>{
            var d = new Date();

            message.guild.fetchMembers().then(g => {
              let count = 0;
              g.members.forEach((member) => {
                count++;
                  if(!member.roles.has(role.id)) {
                    member.addRole(role);
                    addedCount++;
                  } else { alreadyHadRoleCount++ }
              });
              msg.edit("**Processed " + count + " users!** ✅ \n ➕ Gave " + addedCount + " user(s) the " + role.name + " role. (" + alreadyHadRoleCount + " other user(s) already had the role)");
            });
          });
        } if (args.length == 2) {

          let role = message.guild.roles.find(role => role.name === args[0]);
          let timeMS = args[1] * 86400000;

          let addedCount = 0;
          let removedCount = 0;
          let alreadyHadRoleCount = 0;

          //Checks each member and adds role if possible
          message.channel.send("*Processing users...* ⚠").then((msg)=>{
            var d = new Date();

            message.guild.fetchMembers().then(g => {
              let count = 0;
              g.members.forEach((member) => {
                count++;
                if((d.getTime() - member.joinedAt.getTime()) > timeMS) {
                  if(!member.roles.has(role.id)) {
                    member.addRole(role);
                    addedCount++;
                  } else { alreadyHadRoleCount++ }
                } else {
                  if(member.roles.has(role.id)) {
                    member.removeRole(role);
                    removedCount++;
                  }
                }
              });
              msg.edit("**Processed " + count + " users!** ✅ \n ➕ Gave " + addedCount + " user(s) the " + role.name + " role. (" + alreadyHadRoleCount + " user(s) already had the role) \n ➖ Removed the " + role.name +" role from " + removedCount + " user(s).");
            });
          });
      }
    }
}

module.exports = UpdateRole;

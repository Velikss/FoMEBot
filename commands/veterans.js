const Command = require("../structures/Command.js");

class Veterans extends Command {
    constructor(client) {
        super(client, {
            name: "updateveterans",
            description: "Updates the veteran role.",
            category: "System",
            usage: "updateveterans"
        });
    }

    async run(message, args) {
            let addedCount = 0;
            let removedCount = 0;
            let count = 0;
            message.guild.fetchMembers().then(g => {
              g.members.forEach((member) => {
                  count++;
              });
            });

            message.channel.send("*Processing " + count + " users...* ⚠").then((msg)=>{
              var d = new Date();

              message.guild.fetchMembers().then(g => {
                let count = 0;
                g.members.forEach((member) => {
                  count++;
                  if((d.getTime() - member.joinedAt.getTime()) >= 10368000000) {
                    member.addRole('509124883314245663');
                    addedCount++;
                  } else {
                    member.removeRole('509124883314245663');
                    removedCount++;
                  }
                });
                msg.edit("**Processed " + count + " users!** ✅ \n ➕ Gave " + addedCount + " user(s) the Veteran role. \n ➖ Removed the Veteran role from " + removedCount + " user(s), because they are no true OG.");
              });
            });


    }
}

module.exports = Veterans;

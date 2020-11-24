const Discord = require("discord.js");
const bot = new Discord.Client();
const { TOKEN, sendMessage } = require("./src/utils/bot");
const { commands } = require("./src/data/commands");

bot.login(TOKEN);

bot
  .on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  })
  .on("message", (msg) => {
    let found = false;

    commands.forEach((command) => {
      if (msg.content.split(" ")[0] === command.usage) {
        command.call(bot, msg);
        found = true;
      }
    });

    if (!found && msg.content.substr(0, 2) === "m!") {
      msg.reply(`Command not found! Run m!help for help!`);
    }
  })
  .on("voiceStateUpdate", (oldMember, newMember) => {
    const newUserChannel = newMember.voiceChannel;
    const oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
      const role = newMember.guild.roles.find((role) => {
        return role.name === "Friends";
      });
      sendMessage(
        bot,
        "general",
        `<@${newMember.id}> wants to talk to someone! <@&${role.id}>`
      );
    } else if (newUserChannel === undefined) {
      // User leaves a voice channel
    }
  })
  .on("messageReactionAdd", (reaction, user) => {
    const guild = reaction.message.guild;
    if (reaction.emoji.name === "👺" && !user.bot) {
      guild.fetchMember(user).then((member) => {
        const role = guild.roles.find((role) => {
          return role.name === "Friends";
        });
        member
          .addRole(role)
          .then(() => {
            console.log("added role");
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  })
  .on("messageReactionRemove", (reaction, user) => {
    const guild = reaction.message.guild;
    if (reaction.emoji.name === "👺" && !user.bot) {
      guild.fetchMember(user).then((member) => {
        const role = guild.roles.find((role) => {
          return role.name === "Friends";
        });
        member
          .removeRole(role)
          .then(() => {
            console.log("removed role");
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  });

const { commands } = require("../data/_commands");

const help = (bot, msg) => {
  msg.reply(JSON.stringify(commands));
};

module.exports = {
  help,
};

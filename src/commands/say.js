const { sendMessage } = require("../utils/bot");

const say = (bot, msg) => {
  sendMessage(bot, msg.channel.name, msg.content.split(" ").slice(1).join(" "));
};

module.exports = {
  say,
};

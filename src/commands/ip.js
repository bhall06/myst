const { getIP } = require("../utils/server");

const ip = (bot, msg) => {
  getIP()
    .then((ip) => {
      msg.reply(`IP: ${ip}:25565`);
    })
    .catch((error) => {
      msg.reply(`Sorry, there was an error: ${error}`);
    });
};

module.exports = {
  ip,
};

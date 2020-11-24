const server = require("../utils/server");

const start = (bot, msg) => {
  console.log("hi");
  server
    .log(bot, "Starting Server...")
    .then((ref) => {
      msg.reply(`Attempting to start the server, check ${ref} for logs`);
      server.start(bot).catch((error) => {
        msg.reply(`Sorry, there was an error: ${error}`);
      });
    })
    .catch((error) => {
      msg.reply(`Sorry, there was an error: ${error}`);
    });
};

module.exports = {
  start,
};

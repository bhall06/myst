const http = require("http");
const { sendMessage } = require("./bot");
const { execute } = require("./terminal");

const log = (bot, message) => {
  return new Promise((resolve, reject) => {
    sendMessage(bot, "server-log", message).then(resolve).catch(reject);
  });
};

const start = (bot) => {
  return new Promise((resolve, reject) => {
    execute(
      "echo Entering Directory... && cd ~/Desktop/MinecraftServer/Server && echo Running Server Start-Up Command... && java -Xmx8192M -Xms8192M -jar server.jar",
      (output) => {
        log(bot, output).then(resolve).catch(reject);
      },
      reject
    );
  });
};

const getIP = () => {
  return new Promise((resolve, reject) => {
    const options = {
      host: "ipv4bot.whatismyipaddress.com",
      port: 80,
      path: "/",
    };

    http
      .get(options, function (res) {
        res.on("data", function (chunk) {
          resolve(chunk);
        });
      })
      .on("error", function (e) {
        reject(e.message);
      });
  });
};

module.exports = {
  log,
  start,
  getIP,
};

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const TOKEN = process.env.TOKEN;

const sendMessage = (bot, channelName, message) => {
  return new Promise((resolve, reject) => {
    const channel = bot.channels.find((channel) => {
      return channel.name === channelName;
    });
    if (channel !== null) {
      if (message !== "") {
        channel.send(message);
        resolve(`<#${channel.id}>`);
      }
    } else {
      reject("Create a channel called #server-log!");
    }
  });
};

const sendFiles = (bot, channelName, files) => {
  return new Promise((resolve, reject) => {
    const channel = bot.channels.find((channel) => {
      return channel.name === channelName;
    });
    if (channel !== null) {
      if (files.length > 0) {
        channel.send({
          files,
        });
      }
      resolve(`<#${channel.id}>`);
    } else {
      reject("Create a channel called #server-log!");
    }
  });
};

const getChannel = (bot, channelName) => {
  return bot.channels.find((channel) => {
    return channel.name === channelName;
  });
};

const react = (bot, messageID, emoji) => {};

module.exports = {
  TOKEN,
  sendMessage,
  sendFiles,
  getChannel,
};

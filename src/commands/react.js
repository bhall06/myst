const react = (bot, msg) => {
  const recentMessage = msg.channel.messages
    .filter((message) => {
      return message.author.id === bot.user.id;
    })
    .sort((a, b) => {
      return a.createdTimestamp - b.createdTimestamp;
    })
    .array()[0];

  recentMessage.react(msg.content.split(" ")[1]);
};

module.exports = {
  react,
};

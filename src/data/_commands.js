const commands = [
  {
    name: "baka",
    description: {
      short: "?????",
      long:
        "idk man, kinda sus if u ask me [requested by <@340777045430894603>]",
    },
    usage: "m!baka",
  },
  {
    name: "start",
    description: {
      short: "Starts the Minecraft Server!",
      long:
        "When you run this command the server will start and the logs will be printed out in <#780053086839373825>. If the server is already started you won't cause WW3. It will just come up with some errors and nothing else will happen.",
    },
    usage: "m!start",
  },
  {
    name: "ip",
    description: {
      short: "Gets the IP of the Minecraft Server!",
      long:
        "When you run this command the IP address of the minecraft server will be printed out. This is because it is hosted under my IP address which may change if my internet were to restart.",
    },
    usage: "m!ip",
  },
  {
    name: "ping",
    description: {
      short: "Check whether the bot is online!",
      long: "When you run this command the bot will respond with 'Pong!'",
    },
    usage: "m!ping",
  },
  {
    name: "help",
    description: {
      short: "Get some help!",
      long:
        "When you run this command you will get a list of commands, their usage, and a description for each. Though you probably already knew that, since you had to run that command to get here in the first place.",
    },
    usage: "m!help",
  },
  {
    name: "lockdown",
    description: {
      short: "Lockdown the channel!",
      long:
        "When you run this command it will mute everyone apart from the bot and the owner so the owner can test things or idk why else he may do this but yeah.",
    },
    usage: "sdoiajdgi",
  },
  {
    name: "fractal",
    usage: "m!fractal",
  },
  {
    name: "say",
    usage: "m!say",
  },
  {
    name: "react",
    usage: "m!react",
  },
];

module.exports = {
  commands,
};

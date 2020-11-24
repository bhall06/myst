const {
  baka,
  start,
  ip,
  ping,
  help,
  fractal,
  say,
  react,
} = require("../commands");
const { commands } = require("./_commands");

const calls = [baka, start, ip, ping, help, () => {}, fractal, say, react];

module.exports = {
  commands: commands.map((command, index) => {
    return {
      ...command,
      call: calls[index],
    };
  }),
};

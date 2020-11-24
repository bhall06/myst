const { sendFiles } = require("../utils/bot");
const { newtonfractal } = require("../utils/fractal");
const { Complex } = require("../utils/fractal/complex");

const fractal = (bot, msg) => {
  const args = msg.content.split(" ").slice(1);
  const coeffs = [];
  const coeffStrs = args[0].split(",");

  for (let i = 0; i < coeffStrs.length; i++) {
    const coeffStr = coeffStrs[i];
    const real = coeffStr.split(":")[0];
    const imag = coeffStr.split(":")[1];
    coeffs.push(new Complex(parseInt(real), parseInt(imag)));
  }

  const originStr = args[1];
  const real = originStr.split(":")[0];
  const imag = originStr.split(":")[1];
  const origin = new Complex(parseInt(real), parseInt(imag));

  const width = parseInt(args[2]);

  const image = newtonfractal.GenerateFractal(coeffs, origin, width);

  sendFiles(bot, msg.channel.name, [image]);
};

module.exports = {
  fractal,
};

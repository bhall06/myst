const exec = require("child_process").exec;

const execute = (command, callback, error) => {
  console.log(`Executing command ${command}`);

  const cmd = exec(command);

  cmd.stdout.on("data", function (data) {
    callback(data);
  });

  cmd.stderr.on("data", function (data) {
    error(data);
  });
};

module.exports = {
  execute,
};

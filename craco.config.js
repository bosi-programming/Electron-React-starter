const CracoLinariaPlugin = require("craco-linaria");

module.exports = {
  babel: {
    presets: ["@linaria"],
  },
  plugins: [
    {
      plugin: CracoLinariaPlugin,
    },
  ],
};

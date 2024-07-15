const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("path");
const fs = require("fs-extra");
const package = require("./package.json");

module.exports = {
  hooks: {
    prePackage: async () => {
      const PYTHON_DIR = path.resolve(__dirname, "./app/build");
      const PYTHON_DES_DIR = path.resolve(__dirname, "./src");
      fs.copy(PYTHON_DIR, PYTHON_DES_DIR, function (err) {
        if (err) {
          console.error(err);
        }
      });
    },
    postPackage: async (forgeConfig, { outputPaths }) => {
      const PYTHON_DIR = path.resolve(__dirname, "./python");
      const PYTHON_DES_DIR = path.resolve(`${outputPaths}/python`);
      fs.copy(PYTHON_DIR, PYTHON_DES_DIR, function (err) {
        if (err) {
          console.error(err);
        }
      });
    },
  },
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    // {
    //   name: "@electron-forge/maker-deb",
    //   config: {},
    // },
    // {
    //   name: "@electron-forge/maker-rpm",
    //   config: {},
    // },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

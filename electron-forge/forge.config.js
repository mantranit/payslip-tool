const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require("path");
const fs = require("fs-extra");
const package = require("./package.json");

module.exports = {
  hooks: {
    postPackage: async (forgeConfig, packageResult) => {
      console.log(forgeConfig, packageResult);
      // const PYTHON_DIR = path.resolve(__dirname, "./python");
      // const PYTHON_DES_DIR = path.resolve(
      //   __dirname,
      //   `./out/${outputPaths}/python`
      // );
      // fs.copy(PYTHON_DIR, PYTHON_DES_DIR, function (err) {
      //   if (err) {
      //     console.log("An error occured while copying PYTHON folder.");
      //     return console.error(err);
      //   }
      //   console.log("Copy PYTHON completed!");
      // });
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
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
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

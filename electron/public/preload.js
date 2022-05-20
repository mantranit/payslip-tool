// All of the Node.js APIs are available in the preload process.
const { contextBridge } = require("electron");
const { dialog } = require("electron").remote;
const { PythonShell } = require("python-shell");

contextBridge.exposeInMainWorld("appAPI", {
  import: (callbackSuccess, callbackError) => {
    dialog.showOpenDialog({ properties: ['openFile'] }).then((response) => {
      if (response.canceled) {
        return;
      }
      const pyshell = new PythonShell(`${process.cwd()}/python/import.py`, { args: [response.filePaths[0]] });
      pyshell.on('message', function (data) {
        callbackSuccess(data);
      });
      pyshell.on('error', function (error) {
        callbackError(error)
      });
    });
  }
});

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // TODO: webview loaded
});


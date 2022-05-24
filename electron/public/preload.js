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
      PythonShell.run(`${process.cwd()}/python/import.py`, { args: [response.filePaths[0]] }, (err, results) => {
        if (err) {
          return callbackError(err);
        }
        callbackSuccess(results);
      });
    });
  },
  getAll: (sql, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/fetch.py`, { args: [sql] }, (err, results) => {
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(results);
    });
  },
  preview: (sql, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/pdf.py`, { args: [sql, true] }, (err, results) => {
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(results);
    });
  }
});

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // TODO: webview loaded
});


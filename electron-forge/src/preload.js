// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// All of the Node.js APIs are available in the preload process.
const { contextBridge } = require("electron");
const { dialog, app } = require("electron").remote;
const { PythonShell } = require("python-shell");

contextBridge.exposeInMainWorld("appAPI", {
  selectFile: (callback) => {
    dialog.showOpenDialog({ properties: ["openFile"] }).then((response) => {
      if (response.canceled) {
        return;
      }
      callback(response.filePaths[0]);
    });
  },
  import: (month, file, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/import.py`, {
      args: [app.getPath("userData"), month, file],
    })
      .then((results) => {
        callbackSuccess(results[0]);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  fetch: (sql, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/fetch.py`, {
      args: [app.getPath("userData"), sql],
    })
      .then((results) => {
        callbackSuccess(JSON.parse(results[0]).data);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  saveSetting: (data, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/setting.py`, {
      args: [app.getPath("userData"), data],
    })
      .then((results) => {
        callbackSuccess(results);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  preview: (month, id, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/pdf.py`, {
      args: [app.getPath("userData"), month, id],
    })
      .then((results) => {
        callbackSuccess(results[0]);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  checkTableExist: (month, callbackSuccess, callbackError) => {
    const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${month.replace(
      "/",
      "_"
    )}'`;
    PythonShell.run(`${process.cwd()}/python/fetch.py`, {
      args: [app.getPath("userData"), sql, true],
    })
      .then((results) => {
        callbackSuccess(JSON.parse(results[0]).data);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  sendMail: (month, id, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/send.py`, {
      args: [app.getPath("userData"), month, id],
    })
      .then((results) => {
        callbackSuccess(results);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  sendMailAll: (month, callbackSuccess, callbackError, callbackFinished) => {
    let pyshell = new PythonShell(`${process.cwd()}/python/send.py`, {
      pythonOptions: ["-u"],
      args: [app.getPath("userData"), month, null],
    });
    pyshell.on("message", function (message) {
      callbackSuccess(message);
    });
    // end the input stream and allow the process to exit
    pyshell.end(function (err, code, signal) {
      if (err) {
        callbackError(err);
      }
      callbackFinished(code, signal);
    });
  },
});

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // TODO: webview loaded
});

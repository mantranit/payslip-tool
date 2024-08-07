// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("appAPI", {
  selectFile: (callback) => {
    ipcRenderer.invoke("selectFile").then((response) => {
      if (response.canceled) {
        return "";
      }
      return callback(response.filePaths[0]);
    });
  },
  import: (month, file, callbackSuccess, callbackError) => {
    ipcRenderer
      .invoke("import", month, file)
      .then((results) => {
        callbackSuccess(JSON.parse(results[0]).data);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  fetch: (sql, callbackSuccess, callbackError) => {
    ipcRenderer
      .invoke("fetch", sql)
      .then((results) => {
        callbackSuccess(JSON.parse(results[0]).data);
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
    const oneRow = true;
    ipcRenderer
      .invoke("fetch", sql, oneRow)
      .then((results) => {
        callbackSuccess(JSON.parse(results[0]).data);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  details: (month, id, callbackSuccess, callbackError) => {
    ipcRenderer
      .invoke("details", month, id)
      .then((results) => {
        callbackSuccess(results[0]);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  sendMail: (month, id, callbackSuccess, callbackError) => {
    ipcRenderer
      .invoke("sendMail", month, id)
      .then((results) => {
        callbackSuccess(results);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  sendMailAll: (month) => {
    ipcRenderer.invoke("sendMailAll", month);
  },
  saveSetting: (data, callbackSuccess, callbackError) => {
    ipcRenderer
      .invoke("saveSetting", data)
      .then((results) => {
        callbackSuccess(results);
      })
      .catch((err) => {
        callbackError(err);
      });
  },
  onPythonEvent: (channel, func) => {
    let validChannels = [
      "sendMailAllSuccess",
      "sendMailAllError",
      "sendMailAllFinished",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

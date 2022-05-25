// All of the Node.js APIs are available in the preload process.
const { contextBridge } = require("electron");
const { dialog } = require("electron").remote;
const { PythonShell } = require("python-shell");

contextBridge.exposeInMainWorld("appAPI", {
  selectFile: (callback) => {
    dialog.showOpenDialog({ properties: ['openFile'] }).then((response) => {
      if (response.canceled) {
        return;
      }
      callback(response.filePaths[0]);
    });
  },
  import: (file, table, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/import.py`, { args: [file, table] }, (err, results) => {
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(results[0]);
    });
  },
  getAll: (sql, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/fetch.py`, { args: [sql] }, (err, results) => {
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(JSON.parse(results[0]).data);
    });
  },
  preview: (id, month, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/pdf.py`, { args: [id, month] }, (err, results) => {
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(results[0]);
    });
  },
  checkTableExist: (month, callbackSuccess, callbackError) => {
    const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${month.replace('/', '_')}'`;
    PythonShell.run(`${process.cwd()}/python/fetch.py`, { args: [sql, true] }, (err, results) => {
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(JSON.parse(results[0]).data);
    });
  },
  sendMail: (id, month, callbackSuccess, callbackError) => {
    PythonShell.run(`${process.cwd()}/python/send.py`, { args: [month, id] }, (err, results) => {
      console.log(err, results);
      if (err) {
        return callbackError(err);
      }
      callbackSuccess(results);
    });
  },
});

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // TODO: webview loaded
});


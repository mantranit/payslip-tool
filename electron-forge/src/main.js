const {
  app,
  BrowserWindow,
  dialog,
  Menu,
  protocol,
  ipcMain,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { PythonShell } = require("python-shell");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    icon: path.resolve(__dirname, "./images/icon.png"),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  let showExitPrompt = true;

  mainWindow.on("close", function (e) {
    if (showExitPrompt) {
      // The dialog box below will open, instead of your app closing.
      e.preventDefault();
      dialog
        .showMessageBox(this, {
          type: "question",
          buttons: ["Yes", "No"],
          title: "Confirm",
          message: "Are you sure you want to quit?",
        })
        .then(({ response }) => {
          if (response === 0) {
            showExitPrompt = false;
            this.webContents.executeJavaScript("localStorage.clear();", true);
            this.close();
          }
        });
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const resourcesPath = isDev ? process.cwd() : process.resourcesPath;

  ipcMain.handle("selectFile", () => {
    return dialog.showOpenDialog({ properties: ["openFile"] });
  });

  ipcMain.handle("import", (event, month, file) => {
    return PythonShell.run(`${resourcesPath}/python/import.py`, {
      args: [app.getPath("userData"), month, file],
    });
  });

  ipcMain.handle("fetch", (event, sql, oneRow = false) => {
    return PythonShell.run(`${resourcesPath}/python/fetch.py`, {
      args: [app.getPath("userData"), sql, oneRow],
    });
  });

  ipcMain.handle("details", (event, month, id) => {
    return PythonShell.run(`${resourcesPath}/python/pdf.py`, {
      args: [app.getPath("userData"), month, id],
    });
  });

  ipcMain.handle("sendMail", (event, month, id) => {
    return PythonShell.run(`${resourcesPath}/python/send.py`, {
      args: [app.getPath("userData"), month, id],
    });
  });

  ipcMain.handle("sendMailAll", (event, month) => {
    let pyshell = new PythonShell(`${resourcesPath}/python/send.py`, {
      pythonOptions: ["-u"],
      args: [app.getPath("userData"), month, null],
    });
    pyshell.on("message", function (message) {
      event.sender.send("sendMailAllSuccess", message);
    });
    pyshell.end(function (err, code, signal) {
      if (err) {
        event.sender.send("sendMailAllError", err);
      } else {
        event.sender.send("sendMailAllFinished", code, signal);
      }
    });
  });

  ipcMain.handle("saveSetting", (event, data) => {
    return PythonShell.run(`${resourcesPath}/python/setting.py`, {
      args: [app.getPath("userData"), data],
    });
  });

  // init window
  createWindow();

  const isMac = process.platform === "darwin";
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    {
      label: "View",
      submenu: isDev
        ? [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "togglefullscreen" },
          ]
        : [{ role: "reload" }, { role: "togglefullscreen" }],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

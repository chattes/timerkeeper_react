// Basic init
const electron = require("electron");
const { app, BrowserWindow, Notification, ipcMain, Tray } = electron;
const path = require("path");
const url = require("url");
const WindowPosition = require("electron-window-position");
const { save, read, modify } = require("./electron_components/model");

require("electron-debug")();

// Let electron reloads by itself when webpack watches changes in ./app/
if (process.env.ELECTRON_START_URL) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

// To avoid being garbage collected
let window = null;
let tray = null;
app.dock.hide();

app.on("ready", () => {
  createTray();
  createWindow();
  handleEvents();
});

createWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: 0.2 * width,
    height: 0.6 * height,
    frame: false,
    // transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  window.loadURL(startUrl);

  window.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });
  window.on("blur", () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
  let position = getWindowPosition();
  window.setPosition(position.x, position.y, false);

  // Open the DevTools.
  // window.webContents.openDevTools();
};

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // Do nothing
  if (window === null) {
  }
});

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 6);
  return { x: x, y: y };
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, "./assets/icons/png/16x16.png"));
  console.log("Creating a Tray!!");
  tray.setToolTip("Consulting Hours");
  tray.on("click", function(event) {
    toggleWindow();
  });
};

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
};

const handleEvents = () => {
  ipcMain.on("record-time", (event, arg) => {
    console.log("Timer Stopped :: Record Time", arg);
  });
};

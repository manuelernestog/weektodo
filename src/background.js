"use strict";

import { app, protocol, BrowserWindow, Menu, Tray, ipcMain, nativeImage } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

const Config = require("electron-config");
const config = new Config();

const isDevelopment = process.env.NODE_ENV !== "production";
const gotTheLock = app.requestSingleInstanceLock();
const isServeMode = () => {
  return process.env.WEBPACK_DEV_SERVER_URL;
};

let mainWindow = null;
var tray = null;
var trayContextMenu = null;
var trayMenuTemplate = null;
var SplashScreenIsHidden = true;
const path = require("path");

protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true, stream: true } }]);

async function createWindow() {
  let opts = {
    minWidth: 1000,
    minHeight: 600,
    show: !config.get("runInBackground"),
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: false,
    },
  };

  Object.assign(opts, config.get("winBounds"));

  mainWindow = new BrowserWindow(opts);
  mainWindow.removeMenu();

   mainWindow.webContents.setWindowOpenHandler((details) => {
    require("electron").shell.openExternal(details.url);
    return { action: 'deny' }
  })

  ipcMain.on("show-current-window", showCurrentWindow);
  ipcMain.on("is-windows-visible", isWindowsVisible);
  ipcMain.on("match-open-on-startup", matchOpenOnStartup);
  ipcMain.on("set-open-on-startup", setOpenOnStartup);
  ipcMain.on("set-run-in-background", setRunInBackground);
  ipcMain.on("set-tray-context-menu-label", setTrayContextMenuLabel);
  ipcMain.on("set-dark-tray-icon", setDarkTrayIcon);
  ipcMain.on("clear-config", clearConfig);

  if (typeof config.get("runInBackground") == "undefined") {
    config.set("runInBackground", true);
  }

  mainWindow.on("close", function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      config.set("winBounds", mainWindow.getBounds());
      config.set("isMaximized", mainWindow.isMaximized());
      if (config.get("runInBackground")) {
        hideWindow(mainWindow);
      } else {
        closeApp();
      }
    }

    return false;
  });

  mainWindow.on("restore", function () {
    setTimeout(hideSplashScreen, 4500);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    mainWindow.loadURL("app://./index.html");
  }
}

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      } else {
        if (config.get("isMaximized")) mainWindow.maximize();
      }
      showWindow(mainWindow);
    } else {
      createWindow();
    }
    setTimeout(hideSplashScreen, 5000);
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (!app.dock.isVisible()) {
      showWindow(mainWindow);
    }
  });

  app.on("ready", async () => {
    createTray();
    createWindow();

    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installExtension(VUEJS_DEVTOOLS);
      } catch (e) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
    }
  });

  if (isDevelopment) {
    if (process.platform === "win32") {
      process.on("message", (data) => {
        if (data === "graceful-exit") {
          app.quit();
        }
      });
    } else {
      process.on("SIGTERM", () => {
        app.quit();
      });
    }
  }
}

function hideSplashScreen() {
  mainWindow.webContents.executeJavaScript(
    "if(document.getElementById('splashScreen')) document.getElementById('splashScreen').classList.add('hiddenSplashScreen');"
  );
}

function showCurrentWindow(event) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  if (config.get("isMaximized")) mainWindow.maximize();
  showWindow(win);
}

function isWindowsVisible(event) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  event.returnValue = win.isVisible();
}

function setOpenOnStartup(event, openOnStartup) {
  let AutoLaunch = require("auto-launch");
  let autoLauncher = new AutoLaunch({
    name: "WeekToDo Planner",
    path: app.getPath("exe"),
  });
  if (openOnStartup) {
    autoLauncher.enable();
  } else {
    autoLauncher.disable();
  }
}

function clearConfig() {
  config.set("runInBackground", true);
}

function setRunInBackground(event, runInBackground) {
  config.set("runInBackground", runInBackground);
}

function setDarkTrayIcon(event, darkTrayIcon) {
  config.set("darkTrayIcon", darkTrayIcon);
  tray.setImage(creatTrayIconPath());
}

function setTrayContextMenuLabel(event, labels) {
  config.set("openLabel", labels.open);
  config.set("quitLabel", labels.quit);
  trayMenuTemplate[0].label = labels.open;
  trayMenuTemplate[1].label = labels.quit;
  const menu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setContextMenu(menu);
}

function matchOpenOnStartup(event, openOnStartup) {
  let AutoLaunch = require("auto-launch");
  let autoLauncher = new AutoLaunch({
    name: "WeekToDo Planner",
    path: app.getPath("exe"),
  });

  autoLauncher
    .isEnabled()
    .then((isEnabled) => {
      if (openOnStartup != isEnabled) {
        if (openOnStartup) {
          autoLauncher.enable();
        } else {
          autoLauncher.disable();
        }
      }
    })
    .catch(function (err) {
      throw err;
    });
}

function showWindow(window) {
  if (process.platform === "darwin") app.dock.show();
  window.show();
  if (SplashScreenIsHidden) {
    SplashScreenIsHidden = false;
    setTimeout(function () {
      mainWindow.webContents.send("initial-checks");
    }, 4000);
  }
}

function hideWindow(window) {
  window.hide();
  if (process.platform === "darwin") app.dock.hide();
}

function closeApp() {
  app.isQuiting = true;
  config.set("winBounds", mainWindow.getBounds());
  config.set("isMaximized", mainWindow.isMaximized());
  app.quit();
}

function createTray() {
  if (!config.get("darkTrayIcon")) {
    config.set("darkTrayIcon", false);
  }

  var iconPath = creatTrayIconPath();
  tray = new Tray(iconPath);

  if (!config.get("openLabel")) {
    config.set("openLabel", "Open");
    config.set("quitLabel", "Quit");
  }

  trayMenuTemplate = [
    {
      label: config.get("openLabel"),
      click() {
        if (config.get("isMaximized")) mainWindow.maximize();
        showWindow(mainWindow);
        setTimeout(hideSplashScreen, 5000);
      },
    },
    {
      label: config.get("quitLabel"),
      click() {
        app.isQuiting = true;
        config.set("winBounds", mainWindow.getBounds());
        config.set("isMaximized", mainWindow.isMaximized());
        app.quit();
      },
    },
  ];

  trayContextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setToolTip("WeekToDo Planner");
  tray.setContextMenu(trayContextMenu);
  tray.on("click", () => {
    tray.popUpContextMenu();
  });
}

function creatTrayIconPath() {
  const path = require("path");
  const darkPrefix = config.get("darkTrayIcon") ? "Dark" : "";

  var iconPath;
  if (process.platform === "win32") {
    app.setAppUserModelId("WeekToDo");
    iconPath = path.join(__dirname, `/trayIcon${darkPrefix}.ico`);
  } else if (process.platform === "darwin") {
    iconPath = nativeImage.createFromPath(path.join(__dirname, `/trayIcon${darkPrefix}.png`));
  } else {
    iconPath = isServeMode()
      ? path.join(__dirname, `/bundled/trayIcon${darkPrefix}@3x.png`)
      : path.join(__dirname, `/trayIcon${darkPrefix}@3x.png`);
  }
  return iconPath;
}

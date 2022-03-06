'use strict'

import {app, protocol, BrowserWindow, Menu, Tray, Notification} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
require('@electron/remote/main').initialize()

const Config = require('electron-config')
const config = new Config()

const isDevelopment = process.env.NODE_ENV !== 'production'
const gotTheLock = app.requestSingleInstanceLock()
const isServeMode = () => {
    return process.env.WEBPACK_DEV_SERVER_URL
}

let mainWindow = null

let AutoLaunch = require('auto-launch');
let autoLauncher = new AutoLaunch({
    name: "WeekToDo"
});

autoLauncher.isEnabled().then(function (isEnabled) {
    if (isEnabled) {
        return;
    }
    autoLauncher.enable();
}).catch(function (err) {
    throw err;
});


protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    let opts = {
        minWidth: 1000,
        minHeight: 600,
        show: false,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: true
        }
    }
    Object.assign(opts, config.get('winBounds'))

    mainWindow = new BrowserWindow(opts)
    mainWindow.removeMenu()

    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    mainWindow.on('close', function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
            config.set('winBounds', mainWindow.getBounds());
            mainWindow.hide();
        }

        return false;
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
    } else {
        createProtocol('app')
        mainWindow.loadURL('app://./index.html')
    }
}

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.showInactive();
            mainWindow.focus();
            setTimeout(hideSplashScreen, 5000);
        } else {
            createWindow();
        }
    })
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    let tray = null
    const path = require('path')

    app.on('ready', async () => {
        const iconPath = isServeMode()
            ? path.join(__dirname, "/bundled/WeekToDo-icon-white-128.png")
            : path.join(__dirname, "/WeekToDo-icon-white-128.png")

        tray = new Tray(iconPath);

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Open', click() {
                    mainWindow.showInactive();
                    mainWindow.focus();
                    setTimeout(hideSplashScreen, 5000);
                }
            },
            {
                label: 'Quit', click() {
                    app.isQuiting = true;
                    config.set('winBounds', mainWindow.getBounds());
                    app.quit();
                }
            }
        ])
        tray.setToolTip('WeekToDo Planner')
        tray.setContextMenu(contextMenu)
        createWindow();

        if (isDevelopment && !process.env.IS_TEST) {
            try {
                await installExtension(VUEJS_DEVTOOLS)
            } catch (e) {
                console.error('Vue Devtools failed to install:', e.toString())
            }
        }
    })

    if (isDevelopment) {
        if (process.platform === 'win32') {
            process.on('message', (data) => {
                if (data === 'graceful-exit') {
                    app.quit()
                }
            })
        } else {
            process.on('SIGTERM', () => {
                app.quit()
            })
        }
    }
}

function hideSplashScreen() {
    mainWindow.webContents.executeJavaScript("document.getElementById('splashScreen').classList.add('hiddenSplashScreen');")
}



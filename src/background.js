'use strict'

import {app, protocol, BrowserWindow, Menu, Tray} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

const windowStateKeeper = require('electron-window-state');
const isDevelopment = process.env.NODE_ENV !== 'production'
const gotTheLock = app.requestSingleInstanceLock()
const isServeMode = () => {
    return process.env.WEBPACK_DEV_SERVER_URL
}
let mainWindow = null

console.log(app.getPath('exe'))

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
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 600
    });
    mainWindow = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        minWidth: 1000,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        }
    })
    mainWindowState.manage(mainWindow);
    mainWindow.removeMenu()

    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    mainWindow.on('close', function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
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
            mainWindow.show()
            mainWindow.focus()
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
                    if (mainWindow) {
                        mainWindow.show();
                    } else {
                        createWindow();
                    }
                }
            },
            {
                label: 'Quit', click() {
                    app.isQuiting = true;
                    app.quit();
                }
            }
        ])
        tray.setToolTip('WeekToDo Planner')
        tray.setContextMenu(contextMenu)

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



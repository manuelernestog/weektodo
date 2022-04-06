import isElectron from "is-electron";

export default {
    setOpenOnStartup: function (openOnStartConfig) {
        if (!isElectron()) return;

        const { ipcRenderer } = require('electron')
        let AutoLaunch = require("auto-launch");
        let autoLauncher = new AutoLaunch({
            name: "WeekToDo Planner",
            path: ipcRenderer.sendSync('get-app-path')
        });
        if (openOnStartConfig) {
            autoLauncher.enable();
        } else {
            autoLauncher.disable();
        }
    },
    matchOpenOnStartStatus: function (openOnStartup) {
        if (!isElectron()) return;

        const { ipcRenderer } = require('electron')
        let AutoLaunch = require("auto-launch");
        let autoLauncher = new AutoLaunch({
            name: "WeekToDo Planner",
            path: ipcRenderer.sendSync('get-app-path')
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
}
import isElectron from "is-electron";

export default {
    setOpenOnStartup: function (openOnStartConfig) {
        console.log(require("@electron/remote").app.getPath('exe'))
        let AutoLaunch = require("auto-launch");
        let autoLauncher = new AutoLaunch({
            name: "WeekToDo Planner",
            path: require("@electron/remote").app.getPath('exe')
        });
        if (openOnStartConfig) {
            autoLauncher.enable();
        } else {
            autoLauncher.disable();
        }
    },
    matchOpenOnStartStatus: function (openOnStartup) {
        if (!isElectron()) return;

        let AutoLaunch = require("auto-launch");
        let autoLauncher = new AutoLaunch({
            name: "WeekToDo Planner",
            path: require("@electron/remote").app.getPath('exe')
        });

        autoLauncher
            .isEnabled()
            .then((isEnabled) => {
                if (openOnStartup != isEnabled) {
                    if (openOnStartup) {
                        autoLauncher.enable();
                    }else{
                        autoLauncher.disable();
                    }
                }
            })
            .catch(function (err) {
                throw err;
            });
    }
}
import isElectron from "is-electron";

export default {
    setOpenOnStartup: function (openOnStartConfig) {
        let AutoLaunch = require("auto-launch");
        let autoLauncher = new AutoLaunch({
            name: "WeekToDo Planner",
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
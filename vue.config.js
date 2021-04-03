module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: "weektodo-app.netlify.app",
                productName: "WeekToDo",
                linux: {
                    category: "Utility",
                    target: ["AppImage","deb", "rpm","snap"],
                    icon: "build/icon/"
                },
                win: {
                    target: ["nsis", "portable", "msi"],
                }
            }
        }
    }
}
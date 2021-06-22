module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: "weektodo-app.netlify.app",
                productName: "WeekToDo",
                publish: ['github'],
                linux: {
                    category: "Utility",
                    target: ["deb", "rpm", "snap"],
                    icon: "build/icon/"
                },
                win: {
                    target: ["nsis"],
                },
                mac: {
                    category: "public.app-category.productivity",
                    target: ["dmg"]
                }
            }
        }
    }
}
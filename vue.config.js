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
                    icon: "build/icon/"
                },
                win: {
                },
                mac: {
                    category: "public.app-category.productivity",
                }
            }
        }
    }
}
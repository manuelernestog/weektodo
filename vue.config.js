module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: "weektodo-app.netlify.app",
                productName: "Weektodo",
                publish: ['github'],
                linux: {
                    category: "Utility",
                    target: ["deb", "rpm","pacman"],
                    icon: "build/icon.icns"
                },
                win: {
                    target: ["nsis"],
                },
                mac: {
                    category: "public.app-category.productivity",
                    target: ["dmg","pkg"]
                }
            }
        }
    }
}
export default {
    configList(vue) {
        return [
            {
              name: vue.$t('settings.general'),
              ico: "bi-sliders",
              linktype: "tagId",
              link: "config-general-tab",
            },
            {
              name: vue.$t('settings.behavior'),
              ico: "bi-shuffle",
              linktype: "tagId",
              link: "config-behavior-tab",
            },
            {
              name: vue.$t('settings.display'),
              ico: "bi-eye",
              linktype: "tagId",
              link: "config-display-tab",
            },
            {
              name: vue.$t('settings.notifications'),
              ico: "bi-bell",
              linktype: "tagId",
              link: "config-notifications-tab",
            },
            {
              name: vue.$t('settings.data'),
              ico: "bi-pie-chart",
              linktype: "tagId",
              link: "config-data-tab",
            },
            {
              name: vue.$t('settings.language'),
              ico: "bi-globe2",
              linktype: "tagId",
              link: "config-language-tab",
            },
          ]
    }
}
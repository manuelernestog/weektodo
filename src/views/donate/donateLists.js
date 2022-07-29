export default {
    donateList(vue) {
        return [
            {
                name: vue.$t('donate.contribute'),
                ico: "bi-heart-fill", color: "#d94242",
                linktype: "external",
                link: "https://support.weektodo.me"
            },
            {name: vue.$t('donate.shareWithFriends'), ico: "bi-share-fill", color: "#4297d9", linktype: "tagId", link: 'shareTab'},
            {name: vue.$t('donate.rate'), ico: "bi-star-half", color: "#d0b114", linktype: "external", link: 'https://alternativeto.net/software/weektodo/about/'},
            {
                name: vue.$t('donate.comment'),
                color: "#676767",       
                ico: "bi-chat-square-text",
                linktype: "email",
                link: "mailto:contact@weektodo.me"
            }
        ]
    },
    shareList(vue) {
        return [
            {
                name: "Twitter",
                ico: "bi-twitter",
                color: "#3eafda",
                linktype: "external",
                link: "https://twitter.com/intent/tweet?text=".concat('',vue.$t('donate.shareMessage'),"  https://weektodo.me")
            },
            {
                name: "Facebook",
                ico: "bi-facebook",
                color: "#4b6cad",
                linktype: "external",
                link: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fweektodo.me%2F"
            },
            {
                name: "Reddit",
                ico: "bi-reddit",
                color: "#ed4f1c",
                linktype: "external",
                link: "https://www.reddit.com/submit?title=".concat("",vue.$t('donate.shareMessage'),"&url=https%3A%2F%2Fweektodo.me%2F")
            }
        ]
    }
}
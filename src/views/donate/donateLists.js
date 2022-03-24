export default {
    donateList(vue) {
        return [
            {
                name: vue.$t('donate.contributeSponsor'),
                ico: "bi-heart-fill", color: "#d94242",
                linktype: "external",
                link: "https://support.weektodo.me"
            },
            {name: vue.$t('donate.share'), ico: "bi-share-fill", color: "#4297d9", linktype: "tagId", link: 'shareTab'},
            {name: vue.$t('donate.rate'), ico: "bi-star-half", color: "#d0b114", linktype: "tagId", link: 'rateTab'},
            {
                name: vue.$t('donate.translate'),
                color: "#676767",       
                ico: "bi-globe",
                linktype: "external",
                link: "https://github.com/Zuntek/WeekToDoWeb#translations"
            }
        ]
    },
    rateList() {
        return [
            {
                name: "AlternativeTo",
                img: "icons/alternativeto.png",
                linktype: "external",
                link: "https://alternativeto.net/software/weektodo/about/"
            },
            {
                name: "ProductHunt",
                img: "icons/product-hunt.svg",
                linktype: "external",
                link: "https://www.producthunt.com/posts/weektodo"
            },
            {
                name: "SaaSHub",
                img: "icons/SaaSHub.png",
                linktype: "external",
                link: "https://www.saashub.com/weektodo-reviews/new"
            },
        ]
    },
    shareList() {
        return [
            {
                name: "Facebook",
                ico: "bi-facebook",
                color: "#4b6cad",
                linktype: "external",
                link: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fweektodo.me%2F"
            },
            {
                name: "Twitter",
                ico: "bi-twitter",
                color: "#3eafda",
                linktype: "external",
                link: "https://twitter.com/intent/tweet?url=https%3A%2F%2Fweektodo.me%2F&text="
            },
            {
                name: "Linkedin",
                ico: "bi-linkedin",
                color: "#1a77af",
                linktype: "external",
                link: "http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fweektodo.me%2F&title="
            }
        ]
    }
}
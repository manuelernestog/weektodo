export default {
    donateList(vue) {
        return [
            {name: vue.$t('donate.share'), ico: "bi-share-fill", color: "#4297d9", linktype: "tagId", link: 'shareTab'},
            {name: vue.$t('donate.rate'), ico: "bi-star-half", color: "#d0b114", linktype: "tagId", link: 'rateTab'},
            {
                name: "Buy me a Coffee",
                img: "icons/ko-fi.png",
                linktype: "external",
                link: "https://ko-fi.com/manuelernestogr"
            },
            {
                name: "Buy me a Cripto Coffee ",
                img: "icons/cripto-ko-fi.png",
                linktype: "external",
                link: "https://paynest.app/manuelernestogr"
            },
            {
                name: "Traducir",
                color: "#676767",
                ico: "bi-translate",
                linktype: "external",
                link: "https://github.com/Zuntek/WeekToDoWeb#translations"
            },
            {
                name: vue.$t('donate.comment'),
                color: "#3d7c42",
                ico: "bi-chat-text-fill",
                linktype: "email",
                link: "mailto:week2do@gmail.com"
            },
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
                name: "Github",
                color: "#24292f",
                ico: "bi-github",
                linktype: "external",
                link: "https://github.com/Zuntek/WeekToDoWeb"
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
            {
                name: "Softpedia",
                img: "icons/softpedia.png",
                linktype: "external",
                link: "https://www.softpedia.com/get/Office-tools/Diary-Organizers-Calendar/WeekToDo.shtml"
            }
        ]
    },
    shareList() {
        return [
            {
                name: "Facebook",
                ico: "bi-facebook",
                color: "#4b6cad",
                linktype: "external",
                link: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fweektodo.netlify.app%2F"
            },
            {
                name: "Twitter",
                ico: "bi-twitter",
                color: "#3eafda",
                linktype: "external",
                link: "https://twitter.com/intent/tweet?url=https%3A%2F%2Fweektodo.netlify.app%2F&text="
            },
            {
                name: "Linkedin",
                ico: "bi-linkedin",
                color: "#1a77af",
                linktype: "external",
                link: "http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fweektodo.netlify.app%2F&title="
            },
            {
                name: "Pinterest",
                img: "icons/pinterest.svg",
                linktype: "external",
                link: "http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fweektodo.netlify.app%2F&media=&description="
            }
        ]
    }
}
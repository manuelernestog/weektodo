export default {
    donateList(vue) {
        return [
            {name: vue.$t('donate.share'), ico: "bi-share-fill", color: "#4297d9", linktype: "tagId", link: 'shareTab'},
            {name: vue.$t('donate.rate'), ico: "bi-star-half", color: "#d0b114", linktype: "tagId", link: 'rateTab'},
            {
                name: "PayPal",
                img: "icons/paypal.png",
                linktype: "external",
                link: "https://www.paypal.com/donate?hosted_button_id=TVWQZVZDCBSK2"
            },
            {
                name: vue.$t('donate.cryptocurrencies'),
                img: "icons/btc.svg",
                linktype: "tagId",
                link: 'cryptoTab'
            },
            {
                name: "Qvapay - AirTM/Payeer/"+vue.$t('donate.crypto'),
                img: "icons/qvapay.png",
                linktype: "external",
                link: 'https://qvapay.com/payme/merodriguez9112'
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
    cryptoList() {
        return [
            {
                name: "Bitcoin",
                img: "icons/btc.svg",
                linktype: "tagId",
                link: "btcTab"
            },
            {
                name: "Ethereum",
                img: "icons/eth.svg",
                linktype: "tagId",
                link: 'ethTab'
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
                name: "Softpedia",
                img: "icons/softpedia.png",
                linktype: "external",
                link: "https://www.softpedia.com/get/Office-tools/Diary-Organizers-Calendar/WeekToDo.shtml"
            },
            {
                name: "ProductHunt",
                img: "icons/product-hunt.svg",
                linktype: "external",
                link: "https://www.producthunt.com/posts/weektodo"
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
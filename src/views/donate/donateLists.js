export default {
    donateList(vue) {
        return [
            {name: "Rate", ico: "bi-star-half", color: "#8dc351", linktype: "tagId", link: 'rateTab'},
            {name: "Share", ico: "bi-share-fill", color: "blue", linktype: "tagId", link: 'shareTab'},
            {
                name: "PayPal",
                img: "icons/paypal.png",
                linktype: "external",
                link: "https://www.paypal.com/donate?hosted_button_id=TVWQZVZDCBSK2"
            },
            {
                name: vue.$t('donate.Cryptocurrencies'),
                img: "icons/btc.svg",
                linktype: "tagId",
                link: 'cryptoTab'
            },
            {
                name: "Report a Bug",
                ico: "bi-bug",
                linktype: "external",
                link: "https://www.paypal.com/donate?hosted_button_id=TVWQZVZDCBSK2"
            },
        ]
    },
    cryptoList(vue) {
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
            },
            {
                name: "Qvapay (" + vue.$t('donate.otherCrypto') + ")",
                img: "icons/qvapay.png",
                linktype: "external",
                link: 'https://qvapay.com/payme/merodriguez9112'
            }
        ]
    },
    rateList() {
        return [
            {
                name: "Github",
                ico: "bi-github",
                linktype: "external",
                link: "https://"
            },
            {
                name: "Alternative.me",
                img: "icons/eth.svg",
                linktype: "external",
                link: "https://"
            },
            {
                name: "Softpedia",
                img: "icons/eth.svg",
                linktype: "external",
                link: "https://"
            },
            {
                name: "ProductHunt",
                img: "icons/eth.svg",
                linktype: "external",
                link: "https://"
            }
        ]
    },
    shareList() {
        return [
            {
                name: "Facebook",
                ico: "bi-facebook",
                color: "blue",
                linktype: "external",
                link: "https://"
            },
            {
                name: "Twitter",
                ico: "bi-twitter",
                color: "blue",
                linktype: "external",
                link: "https://"
            },
            {
                name: "Linkedin",
                ico: "bi-linkedin",
                color: "blue",
                linktype: "external",
                link: "https://"
            },
            {
                name: "Instagram",
                ico: "bi-instagram",
                color: "blue",
                linktype: "external",
                link: "https://"
            }
        ]
    }
}
export default {
  click_handler(vue, functionCallback) {
    vue.$store.commit("setClicks", vue.$store.getters.clicks + 1);
    if (vue.$store.getters.clicks == 1) {
      let timer = setTimeout(() => {
        functionCallback();
        vue.$store.commit("setClicks", 0);
      }, 200);
      vue.$store.commit("setClicksTimer", timer);
    } else {
      clearTimeout(vue.$store.getters.clicksTimer);
      vue.$store.commit("setClicks", 0);
    }
  },
};

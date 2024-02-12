<template>
  <transition name="fade">
    <div
      v-if="show"
      id="splashScreen"
      class="splash-screen d-flex justify-content-center align-items-center"
      ref="splashScreen"
    >
      <div class="d-flex flex-column align-items-center">
        <div class="d-flex justify-content-center align-items-center" style="margin-bottom: 2.2rem">
          <img
            v-if="darkTheme"
            class="logo"
            src="../../public/img/weektodo-isologo-white.svg"
            alt="WeekToDo Logo"
            style="display: inline"
          />
          <img
            v-else
            class="logo"
            src="../../public/img/weektodo-isologo-color.svg"
            alt="WeekToDo Logo"
            style="display: inline"
          />
        </div>
        <div v-show="sponsor" class="d-flex justify-content-center" style="height: 50px">
          <a v-if="sponsor" :href="sponsor.url" class="d-flex sponsor-container align-items-center" target="_blank">
            <img :src="sponsor.img" class="sponsor-img" alt="WeekToDo Sponsor" />
            <div class="my-2 mx-2">
              <div class="fw-bolder d-inline" style="text-decoration: unset !important">{{ sponsor.name }}</div>
              <div class="opacity-50 mx-2 d-inline">{{ sponsor.message }}</div>
            </div>
          </a>
        </div>
        <div style="height: 25px; width: 200px" class="d-flex justify-content-center">
          <div v-show="sponsor" class="opacity-25" style="font-size: 0.7rem">{{ $t("ui.sponsoredBy") }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "splashScreen",
  data() {
    return {
      show: true,
      sponsor: null,
      darkTheme: this.$store.getters.config.darkTheme,
    };
  },
  mounted() {
    const axios = require("axios").default;
    axios
      .get("https://weektodo.me/api/sponsors")
      .then((response) => this.renderSponsor(response))
      .catch((error) => console.log(error.message));
  },
  methods: {
    hideSplash: function () {
      this.show = false;
    },
    renderSponsor: function (response) {
      var sponsors = [];

      sponsors.push({
        name: "WeekToDo",
        message: this.$t("donate.splashMessage"),
        url: "https://weektodo.me/support-us",
        img: "/icons/ko-fi.png",
      });

      response.data.bronze.forEach(function (obj) {
        sponsors.push(obj);
      });

      response.data.silver.forEach(function (obj) {
        for (let i = 0; i < 3; i++) {
          sponsors.push(obj);
        }
      });

      response.data.golden.forEach(function (obj) {
        for (let i = 0; i < 7; i++) {
          sponsors.push(obj);
        }
      });

      response.data.diamond.forEach(function (obj) {
        for (let i = 0; i < 15; i++) {
          sponsors.push(obj);
        }
      });

      this.sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
    },
  },
};
</script>

<style scoped>
.sponsor-container {
  height: fit-content;
  width: fit-content;
  padding: 4px 10px 4px 10px;
  font-size: 0.85rem;
  box-sizing: border-box;
  border-radius: 25px;
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  -moz-align-items: flex-start;
  align-items: flex-start;
  position: relative;
  background-color: #fefefe;
  box-shadow: 0 2px 20px 0 rgb(0 0 0 / 7%);
  /*border: 1px solid #dbdbdb;*/
  text-decoration: unset;
  color: unset;
  transition: transform 0.4s;
}

.dark-theme .sponsor-container {
  background-color: #102430;
}

.sponsor-container:hover {
  transform: scale(1.04);
}

.sponsor-img {
  width: 32px;
  border-radius: 25px;
}

/*.sponsor-text{*/
/*  text-decoration: unset;*/
/*}*/

.splash-screen {
  width: 100%;
  height: 100%;
  z-index: 1060;
  position: absolute;
  background-color: #fcfcfc;
}

.dark-theme .splash-screen {
  background-color: #13171d;
}

.logo {
  margin-right: 15px;
  width: 25rem;
}

.splash-screen h1 {
  color: #3f0e81;
}

.dark-theme .splash-screen h1 {
  color: #5329a3;
}

.splash-screen h1 {
  letter-spacing: 3px;
  font-size: 3rem;
  margin-bottom: 10px;
}

.splash-screen span {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  color: #79606b;
  margin-bottom: 20px;
}

.sponsor {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #bababa;
}

.dark-theme .splash-screen span {
  color: #c9d1d9;
}

.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

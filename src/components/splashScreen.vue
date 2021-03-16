<template>
  <transition name="fade">
    <div v-if="show" class="splash-screen d-flex justify-content-center align-items-center" ref="splashScreen">
      <div class="d-flex flex-column align-items-center">
        <img class="logo" src="../../public/WeekToDo-Logo-Color.svg">
        <h1>WeekToDo</h1>
        <span>{{$t('ui.splashSub')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "splashScreen",
        data() {
            return {
                show: true
            }
        },
        methods: {
            hideSplash: function () {
                this.show = false;
            }
        }
    }
</script>

<style scoped>
  .splash-screen {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: absolute;
    background-color: #fcfcfc;
  }

  .dark-theme .splash-screen {
    background-color: #13171d;
  }

  .logo {
    margin-bottom: 30px;
    width: 6.5rem;
  }

  .splash-screen h1 {
    color: #3f0e81;
  }

  .dark-theme .splash-screen h1 {
    color: #5329a3;
  }

  .splash-screen h1 {
    letter-spacing: 3px;
    font-size: 3.5rem;
    margin-bottom: 10px;
  }

  .splash-screen span {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.6rem;
    color: #79606b;
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
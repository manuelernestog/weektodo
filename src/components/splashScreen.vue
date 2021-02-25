<template>
  <transition name="fade">
    <div v-if="show" class="splash-screen d-flex justify-content-center align-items-center" ref="splashScreen">
      <div class="d-flex flex-column align-items-center">
        <img class="logo" src="../../public/WeekToDo-Logo-Color.svg">
        <h1 style="color: #3f0e81">WeekToDo</h1>
        <span>Simple Weekly Planner</span>
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
    background-color: #ffe8f2;
  }

  .logo {
    margin-bottom: 30px;
    width: 7rem;
  }

  .splash-screen h1 {
    letter-spacing: 3px;
    font-size: 3.8rem;
    margin-bottom: 10px;
  }

  .splash-screen span {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.7rem;
    color: #79606b;
  }

  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style>
<template>
  <div class="side-bar">
    <i class="bi-app-indicator"></i>
    <i class="bi-house"></i>
    <i class="bi-calendar-event" @click="changeDate"></i>
    <i class="bi-clipboard-plus"></i>
    <i class="bi-sliders"></i>
    <span style="flex-grow: 1"></span>
    <i class="bi-info-square"></i>
    <i class="bi-gift"></i>
  </div>
</template>

<script>
    export default {
        name: "sideBar",
        methods: {
            changeDate: function () {
                // this.selected_date.setDate(this.selected_date.getDate() + 25);
            }
        }
    }
</script>

<style scoped>
  .side-bar {
    width: 4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    float: left;
    background-color: #fcfcfc
  }

  .side-bar i:first-child {
    margin-bottom: 14px;
    margin-top: 8px;
  }

  .side-bar i:first-child:hover {
    border-radius: unset;
    background-color: unset;
  }

  .side-bar i {
    font-size: 1.4rem;
    padding: 10px;
    margin-bottom: 10px;
    align-self: center;
  }

  .side-bar i:hover {
    border-radius: 6px;
    background-color: #eaecef;
  }

  .side-bar i:active {
    background-color: #dddfe2;
  }

</style>
`
<template>
  <div class="side-bar">
    <i class="bi-app-indicator" @click="changeDate"></i>
    <i class="bi-house" @click="changeDate"></i>
    <i class="bi-calendar-event"></i>
    <i class="bi-clipboard-plus"></i>
    <i class="bi-sliders"></i>
    <span style="flex-grow: 1"></span>
    <i class="bi-info-square"></i>
    <i class="bi-gift"></i>
  </div>

  <div class="weekly-todo-lists-container">
    <i class="bi-chevron-left slider-btn" @click="weekMoveLeft"></i>
    <div style="flex-grow: 1; display: flex; width: 85vw;  overflow-x: hidden; " ref="weekListContainer">
      <to-do-list :date="selected_date_plus(-1)" ref="list" :id="selected_date_plus(1)"></to-do-list>
      <to-do-list :date="selected_date" ref="list"></to-do-list>
      <to-do-list :date="selected_date_plus(1)" ref="list"></to-do-list>
      <to-do-list :date="selected_date_plus(2)" ref="list"></to-do-list>
      <to-do-list :date="selected_date_plus(3)" ref="list"></to-do-list>
      <to-do-list :date="selected_date_plus(4)" ref="list"></to-do-list>
    </div>
    <i class="bi-chevron-right slider-btn" @click="weekMoveRight"></i>
  </div>
  <div style="height: 50vh; display: flex; overflow: auto">
    <i class="bi-chevron-left" style="font-size: 2rem; align-self: center; "></i>
    <to-do-list :date="selected_date_plus(1)"></to-do-list>
    <!--    <to-do-list></to-do-list>-->
    <i class="bi-chevron-right" style="font-size: 2rem; align-self: center; "></i>
  </div>

</template>

<script>
    // import uniqueId from "lodash.uniqueid";
    import toDoList from "./components/toDoList";
    import moment from 'moment'

    export default {
        name: 'App',
        components: {
            toDoList
        },
        data() {
            return {
                ToDoItems: [],
                selected_date: new Date()
            }
        },
        methods: {
            addItem() {

            },
            moments: function (date) {
                return moment(date)
            },
            changeDate: function () {

                // this.selected_date.setDate(this.selected_date.getDate() + 25);
            },
            selected_date_plus: function (days) {
                var new_date = new Date(this.selected_date);
                return new_date.setDate(new_date.getDate() + days);
            },
            weekMoveLeft: function () {
                this.$refs.weekListContainer.scroll({
                    left: (this.$refs.weekListContainer.scrollLeft - 230),
                    top: 0,
                    behavior: 'smooth'
                });
            },
            weekMoveRight: function () {
                console.log(this.$refs.weekListContainer);
                console.log(this.$refs.weekListContainer.scrollLeft);
                this.$refs.weekListContainer.scroll({
                    left: (this.$refs.weekListContainer.scrollLeft + 230),
                    top: 0,
                    behavior: 'smooth'
                });
            },
        }

    }
</script>

<style>
  .side-bar {
    width: 4rem;
    padding: 1rem 1.3rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    float: left;
    background-color: #fcfcfc
  }

  .side-bar i {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }

  .weekly-todo-lists-container {
    height: 50vh;
    border-bottom: 1px solid #eaecef;
    display: flex;
  }

  .slider-btn{
    margin-left: 5px;
    margin-right: 5px;
    font-size: 2rem;
    align-self: center;
    flex-grow: 0
  }

</style>
`
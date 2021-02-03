`
<template>
  <div
    style="width: 4rem; padding: 1rem 1.3rem; height: 100vh; display: flex; flex-direction: column;  float: left; background-color: #fcfcfc ">
    <ul style="list-style: none; width: 50px; padding-inline-start: 0px;">
      <li style="    margin-bottom: 20px;"><i class="bi-house" style="font-size: 1.4rem; " @click="changeDate"></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-calendar-event" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-clipboard-plus" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-sliders" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-gift" style="font-size: 1.4rem; "></i></li>
      <li style="    margin-bottom: 20px;"><i class="bi-info-square" style="font-size: 1.4rem; "></i></li>
    </ul>
  </div>

  <div style="height: 50vh; border-bottom: 1px solid #eaecef; display: flex; overflow: auto">
    <i class="bi-chevron-left" style="font-size: 2rem; align-self: center; flex-grow: 0"></i>
    <div style="flex-grow: 1; display: flex;">
      <to-do-list :date="selected_date"></to-do-list>
<!--      <to-do-list :date="next_day(1)"></to-do-list>-->
<!--      <to-do-list :date="next_day(2)"></to-do-list>-->
<!--      <to-do-list :date="next_day(3)"></to-do-list>-->
<!--      <to-do-list :date="next_day(4)"></to-do-list>-->
    </div>
    <i class="bi-chevron-right" style="font-size: 2rem; align-self: center; flex-grow: 0"></i>
  </div>
  <div style="height: 50vh; display: flex; overflow: auto">
    <i class="bi-chevron-left" style="font-size: 2rem; align-self: center; "></i>
<!--    <to-do-list></to-do-list>-->
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
                this.selected_date.setDate(this.selected_date.getDate() + 25);
            }

        }

    }
</script>

<style>

</style>
`
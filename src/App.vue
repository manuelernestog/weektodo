`
<template>
  <side-bar></side-bar>
  <div class="weekly-todo-lists-container">
    <i class="bi-chevron-left slider-btn"  ref="weekLeft" @click="weekMoveLeft"></i>
    <div style="flex-grow: 1; display: flex; width: 85vw;  overflow-x: hidden; " ref="weekListContainer">
      <div v-for="date in dates_array" :key="date">
        <to-do-list :date="date" ></to-do-list>
      </div>
    </div>
    <i class="bi-chevron-right slider-btn" ref="weekRight" @click="weekMoveRight"></i>
  </div>
  <!--  <div style="height: 50vh; display: flex; overflow: auto">-->
  <!--    <i class="bi-chevron-left" style="font-size: 2rem; align-self: center; "></i>-->
  <!--    <to-do-list :date="selected_date_plus(1)"></to-do-list>-->
  <!--    &lt;!&ndash;    <to-do-list></to-do-list>&ndash;&gt;-->
  <!--    <i class="bi-chevron-right" style="font-size: 2rem; align-self: center; "></i>-->
  <!--  </div>-->

</template>

<script>
    import toDoList from "./components/toDoList";
    import moment from 'moment'
    import sideBar from "./components/layout/sideBar";

    export default {
        name: 'App',
        components: {
            toDoList,
            sideBar
        },
        data() {
            return {
                ToDoItems: [],
                selected_date: this.moments().format('YYYYMMDD')
            }
        },
        methods: {
            moments: function (date) {
                if (date) {
                    return moment(date);
                }
                return moment();
            },
            weekMoveLeft: function () {
                this.selected_date = moment(this.selected_date).subtract(1, 'd').format('YYYYMMDD');
            },
            weekMoveRight: function () {
                this.selected_date = moment(this.selected_date).add(1, 'd').format('YYYYMMDD');

            }
        },
        computed: {
            dates_array: function () {
                var dates_array = [moment(this.selected_date).subtract(1, 'd').format('YYYYMMDD'), this.selected_date];
                for (let i = 1; i < 4; i++) {
                    dates_array.push(moment(this.selected_date).add(i, 'd').format('YYYYMMDD'));
                }
                return dates_array;
            }
        }

    }
</script>

<style>

  body {
    line-height: unset !important;
  }

  .weekly-todo-lists-container {
    height: 50vh;
    border-bottom: 1px solid #eaecef;
    display: flex;
  }

  .slider-btn {
    padding: 3px;
    font-size: 2rem;
    align-self: center;
    flex-grow: 0;
    margin-left: 6px;
    margin-right: 6px;
    cursor: pointer;
  }

  .slider-btn:hover {
    border-radius: 6px;
    background-color: #eaecef;
  }

  .slider-btn:active {
    background-color: #dddfe2;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

</style>
`
`
<template>
  <side-bar></side-bar>

  <div class="weekly-todo-lists-container">
    <i class="bi-chevron-left slider-btn" @click="weekMoveLeft"></i>
    <div style="flex-grow: 1; display: flex; width: 85vw;  overflow-x: hidden; " ref="weekListContainer">
      <to-do-list :date="selected_date_plus(-1)" @update-lists="updateTodoLists"></to-do-list>
      <to-do-list :date="selected_date"></to-do-list>
      <to-do-list :date="selected_date_plus(1)" @update-lists="updateTodoLists"></to-do-list>
      <to-do-list :date="selected_date_plus(2)" @update-lists="updateTodoLists"></to-do-list>
      <to-do-list :date="selected_date_plus(3)" @update-lists="updateTodoLists"></to-do-list>
      <to-do-list :date="selected_date_plus(4)" @update-lists="updateTodoLists"></to-do-list>
    </div>
    <i class="bi-chevron-right slider-btn" @click="weekMoveRight"></i>
  </div>
  <!--  <div style="height: 50vh; display: flex; overflow: auto">-->
  <!--    <i class="bi-chevron-left" style="font-size: 2rem; align-self: center; "></i>-->
  <!--    <to-do-list :date="selected_date_plus(1)"></to-do-list>-->
  <!--    &lt;!&ndash;    <to-do-list></to-do-list>&ndash;&gt;-->
  <!--    <i class="bi-chevron-right" style="font-size: 2rem; align-self: center; "></i>-->
  <!--  </div>-->

</template>

<script>
    // import uniqueId from "lodash.uniqueid";
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
                selected_date: new Date()
            }
        },
        methods: {
            moments: function (date) {
                return moment(date)
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
                this.$refs.weekListContainer.scroll({
                    left: (this.$refs.weekListContainer.scrollLeft + 230),
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }

    }
</script>

<style>

  body{
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
  }

  .slider-btn:hover {
    border-radius: 6px;
    background-color: #eaecef;
  }

  .slider-btn:active {
    background-color: #dddfe2;
  }

</style>
`
`
<template>
  <side-bar @change-date="setSelectedDate"></side-bar>
  <div class="weekly-todo-lists-container">
    <i class="bi-chevron-left slider-btn" ref="weekLeft" @click="weekMoveLeft"></i>
    <div style="flex-grow: 1; display: flex;  overflow-x: hidden;  " ref="weekListContainer">
      <to-do-list v-for="date in dates_array" :key="date" :id="date"></to-do-list>
    </div>
    <i class="bi-chevron-right slider-btn" ref="weekRight" @click="weekMoveRight"></i>
  </div>
  <div class="custom-todo-lists-container">
    <i class="bi-chevron-left slider-btn" @click="customMoveLeft"
       :style="{visibility: (cTodoList.length > 5) ? 'visible' : 'hidden'}"></i>
    <div style="flex-grow: 1; display: flex;  overflow-x: hidden; " ref="customListContainer">
      <to-do-list v-for="(cTodoList,index) in cTodoList" :key="cTodoList.listId" :id="cTodoList.listId"
                  :customTodoList="true" :cTodoListIndex="index"></to-do-list>
    </div>
    <i class="bi-chevron-right slider-btn" @click="customMoveRight"
       :style="{visibility: (cTodoList.length > 5) ? 'visible' : 'hidden'}"></i>
  </div>

</template>

<script>
    import toDoList from "./components/toDoList";
    import moment from 'moment'
    import sideBar from "./components/layout/sideBar";
    import customToDoListIdsRepository from "./repositories/customToDoListIdsRepository";

    export default {
        name: 'App',
        components: {
            toDoList,
            sideBar
        },
        data() {
            return {
                selected_date: this.moments().format('YYYYMMDD'),
                cTodoList: this.$store.state.cTodoListIds
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
                this.$refs.weekListContainer.scrollLeft = this.todoListWidth() * 2;
                this.$refs.weekListContainer.scroll({
                    left: (this.$refs.weekListContainer.scrollLeft - this.todoListWidth()),
                    top: 0,
                    behavior: 'smooth'
                });
            },
            weekMoveRight: function () {
                this.selected_date = moment(this.selected_date).add(1, 'd').format('YYYYMMDD');
                this.$refs.weekListContainer.scrollLeft = 0;
                this.$refs.weekListContainer.scroll({
                    left: (this.$refs.weekListContainer.scrollLeft + this.todoListWidth()),
                    top: 0,
                    behavior: 'smooth'
                });

            },
            customMoveRight: function () {
                this.$refs.customListContainer.scroll({
                    left: (this.$refs.customListContainer.scrollLeft + this.todoListWidth()),
                    top: 0,
                    behavior: 'smooth'
                });
            },
            customMoveLeft: function () {
                this.$refs.customListContainer.scroll({
                    left: (this.$refs.customListContainer.scrollLeft - this.todoListWidth()),
                    top: 0,
                    behavior: 'smooth'
                });
            },
            todoListWidth: function () {
                return this.$refs.customListContainer.clientWidth / 5;
            },
            setSelectedDate: function (date) {
                this.selected_date = date;
            }
        },
        computed: {
            dates_array: function () {
                var dates_array = [
                    moment(this.selected_date).subtract(2, 'd').format('YYYYMMDD'),
                    moment(this.selected_date).subtract(1, 'd').format('YYYYMMDD'),
                    this.selected_date
                ];
                for (let i = 1; i < 5; i++) {
                    dates_array.push(moment(this.selected_date).add(i, 'd').format('YYYYMMDD'));
                }
                return dates_array;
            }
        },
        beforeCreate() {
            let list = customToDoListIdsRepository.load();
            this.$store.commit('loadCustomTodoListsIds', list);
        },
        mounted() {
            this.$refs.weekListContainer.scrollLeft = this.todoListWidth();
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

  .custom-todo-lists-container {
    height: 50vh;
    display: flex;
    overflow: auto;
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

  #side-bar-date-picker-input {
    /*hidind input but it need to be visible to get the focus*/
    position: fixed;
    top: -50px;
  }

  .side-bar .v3dp__popout {
    margin-left: 75px;
    margin-top: 0px;
  }


</style>
`
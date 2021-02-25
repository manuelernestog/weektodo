<template>
  <splash-screen ref="splash"></splash-screen>
  <remove-custom-list></remove-custom-list>
  <config-modal></config-modal>

  <side-bar @change-date="setSelectedDate"></side-bar>
  <div class="todo-lists-container">
    <i class="bi-chevron-left slider-btn" ref="weekLeft" @click="weekMoveLeft"></i>
    <div class="todo-slider" ref="weekListContainer">
      <to-do-list v-for="date in dates_array" :key="date" :id="date"></to-do-list>
    </div>
    <i class="bi-chevron-right slider-btn" ref="weekRight" @click="weekMoveRight"></i>
  </div>
  <div class="main-horizontal-divider"></div>
  <div class="todo-lists-container">
    <i class="bi-chevron-left slider-btn" @click="customMoveLeft"
       :style="{visibility: (cTodoList.length > 5) ? 'visible' : 'hidden'}"></i>
    <div class="todo-slider slides" ref="customListContainer">
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
    import removeCustomList from "./components/windows/removeCustomList";
    import configModal from "./components/windows/configModal";
    import splashScreen from "./components/splashScreen";

    export default {
        name: 'App',
        components: {
            configModal,
            toDoList,
            sideBar,
            removeCustomList,
            splashScreen
        },
        data() {
            return {
                selected_date: moment().format('YYYYMMDD'),
                cTodoList: this.$store.state.cTodoListIds
            }
        },
        beforeCreate() {
            this.$store.commit('loadCustomTodoListsIds', customToDoListIdsRepository.load());
        },
        mounted() {
            this.$refs.weekListContainer.scrollLeft = this.todoListWidth();
            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    setTimeout(this.hideSplash, 1000);
                }
            }
        },
        methods: {
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
                this.$refs.customListContainer.scrollLeft = this.$refs.customListContainer.scrollLeft + this.todoListWidth();
            },
            customMoveLeft: function () {
                this.$refs.customListContainer.scrollLeft = this.$refs.customListContainer.scrollLeft - this.todoListWidth();
            },
            todoListWidth: function () {
                return this.$refs.customListContainer.clientWidth / 5;
            },
            setSelectedDate: function (date) {
                this.selected_date = date;
                this.$nextTick(function () {
                    document.getElementById('list' + date).getElementsByClassName('new-todo-input')[0].focus();
                    document.getElementById('list' + date).getElementsByClassName('new-todo-input')[0].select();
                });
            },
            hideSplash: function () {
                this.$refs.splash.hideSplash();
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
        }
    }
</script>

<style>
  body {
    line-height: unset !important;
  }

  .todo-lists-container {
    height: calc(50vh - 1px);
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

  .side-bar .v3dp__popout {
    margin-left: 75px;
    margin-top: 0px;
  }

  .todo-slider {
    flex-grow: 1;
    display: flex;
    overflow-x: hidden;
  }

  .slides {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }

  .todo-slider::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .todo-slider::-webkit-scrollbar-thumb {
    background: #eaecef;
    border-radius: 5px;
  }

  .todo-slider::-webkit-scrollbar-thumb:hover {
    background: #dddfe2;
  }

  .todo-slider::-webkit-scrollbar-thumb:active {
    background: #d0d2d5;
  }

  .todo-slider::-webkit-scrollbar-track {
    background: transparent;
  }
</style>
`
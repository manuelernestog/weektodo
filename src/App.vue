<template>
  <div class="app-container" :class="{'dark-theme' : darkTheme}">
    <div class="hidden-mobile">
      <splash-screen ref="splash"></splash-screen>
      <side-bar @change-date="setSelectedDate"></side-bar>
      <div class="todo-lists-container" :class="{'full-screen' : !showCustomList }">
        <i class="bi-chevron-left slider-btn" ref="weekLeft" @click="weekMoveLeft"></i>
        <div class="todo-slider" ref="weekListContainer">
          <to-do-list v-for="date in dates_array" :key="date" :id="date" :showCustomList="showCustomList"></to-do-list>
        </div>
        <i class="bi-chevron-right slider-btn" ref="weekRight" @click="weekMoveRight"></i>
      </div>
      <div v-show="showCustomList" class="main-horizontal-divider"></div>
      <div v-show="showCustomList" class="todo-lists-container">
        <i class="bi-chevron-left slider-btn" @click="customMoveLeft"
           :style="{visibility: (cTodoList.length > 5) ? 'visible' : 'hidden'}"></i>
        <div class="todo-slider slides" ref="customListContainer">
          <to-do-list v-for="(cTodoList,index) in cTodoList" :key="cTodoList.listId" :id="cTodoList.listId"
                      :customTodoList="true" :cTodoListIndex="index" :showCustomList="showCustomList"></to-do-list>
        </div>
        <i class="bi-chevron-right slider-btn" @click="customMoveRight"
           :style="{visibility: (cTodoList.length > 5) ? 'visible' : 'hidden'}"></i>
      </div>
      <remove-custom-list></remove-custom-list>
      <config-modal></config-modal>
      <about-modal></about-modal>
      <donate-modal></donate-modal>
      <welcome-modal></welcome-modal>
      <tips-modal></tips-modal>
    </div>
    <div class="mobile d-flex flex-column justify-content-center align-items-center">
      <i class="bi-exclamation-diamond mb-4" style="font-size: 100px"></i>
      <h3 style="text-align: center">WeekToDo es una aplicacion diseñada para ejecutarse en Equipos de Escritorio y por ahora no esta lista para mostrarse en resoluciones tan pequeñas. ('一_一) </h3>
    </div>
  </div>
</template>

<script>
    import toDoList from "./components/toDoList";
    import moment from 'moment'
    import sideBar from "./components/layout/sideBar";
    import customToDoListIdsRepository from "./repositories/customToDoListIdsRepository";
    import removeCustomList from "./components/removeCustomList";
    import configModal from "./views/configModal";
    import splashScreen from "./components/splashScreen";
    import configRepository from "./repositories/configRepository";
    import aboutModal from "./views/aboutModal";
    import donateModal from "./views/donateModal";
    import welcomeModal from "./views/welcomeModal";
    import tipsModal from "./views/tipsModal";
    import {Modal} from 'bootstrap';

    export default {
        name: 'App',
        components: {
            donateModal,
            configModal,
            toDoList,
            sideBar,
            removeCustomList,
            splashScreen,
            aboutModal,
            welcomeModal,
            tipsModal
        },
        data() {
            return {
                selected_date: moment().format('YYYYMMDD'),
                cTodoList: this.$store.state.cTodoListIds
            }
        },
        beforeCreate() {
            this.$store.commit('loadCustomTodoListsIds', customToDoListIdsRepository.load());
            this.$store.commit('loadConfig', configRepository.load());
        },
        mounted() {
            this.$refs.weekListContainer.scrollLeft = this.todoListWidth();
            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    setTimeout(this.hideSplash, 1000);
                }
            }
            window.addEventListener("resize", this.weekResetScroll);
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
            weekResetScroll: function () {
                this.$refs.weekListContainer.scrollLeft = this.todoListWidth();
            },
            customMoveRight: function () {
                this.$refs.customListContainer.scrollLeft = this.$refs.customListContainer.scrollLeft + this.todoListWidth();
            },
            customMoveLeft: function () {
                this.$refs.customListContainer.scrollLeft = this.$refs.customListContainer.scrollLeft - this.todoListWidth();
            },
            todoListWidth: function () {
                return this.$refs.weekListContainer.clientWidth / 5;
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
                if (this.$store.state.config.firstTimeOpen) {
                    this.showWelcomeModal();
                }
            },
            showWelcomeModal: function () {
                let modal = new Modal(document.getElementById('welcomeModal'), {backdrop: 'static'});
                modal.show();
                this.$store.commit('updateConfigFirstTimeOpen');
                configRepository.update(this.$store.state.config);
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
            },
            showCustomList: function () {
                return this.$store.state.config.customList;
            },
            darkTheme: function () {
                return this.$store.state.config.darkTheme;
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

  .dark-theme .todo-slider::-webkit-scrollbar-thumb {
    background: #21262d;
    border-radius: 5px;
  }

  .dark-theme .todo-slider::-webkit-scrollbar-thumb:hover {
    background: #2e3a41;
  }

  .dark-theme .todo-slider::-webkit-scrollbar-thumb:active {
    background: #43535d;
  }

  .full-screen {
    height: 100vh;
  }

  .full-screen .todo-slider {
    margin-top: 20px;
  }

  /*----------------Dark Theme------------------*/
  .dark-theme {
    background-color: #13171d;
    color: #c9d1d9;
  }

  .dark-theme input {
    background-color: #13171d;
    color: #c9d1d9;
  }

  .dark-theme .slider-btn:hover {
    border-radius: 6px;
    background-color: #21262d;
  }

  .dark-theme .slider-btn:active {
    background-color: #2a2e36;
  }

  .mobile {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: absolute;
    padding: 20%;
  }

  .dark-theme .mobile {
    background-color: #13171d;
  }

</style>
`
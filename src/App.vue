<template>
  <input class="hidden-input-for-focus" type="text" />
  <div v-show="compatible" class="app-container" :class="{ 'dark-theme': darkTheme }">
    <div class="hidden-mobile app-body" :style="{ zoom: `${zoom}%` }">
      <splash-screen ref="splash"></splash-screen>
      <side-bar @change-date="setSelectedDate"></side-bar>

      <div class="h-100 d-flex flex-column">
        <div
          v-show="showCalendar"
          class="todo-lists-container"
          :style="resizableStyle"
          ref="calendarContainer"
          :class="{ 'full-screen': !showCustomList }"
        >
          <i class="bi-chevron-left slider-btn" ref="weekLeft" @click="weekMoveLeft"></i>
          <div class="todo-slider" ref="weekListContainer">
            <to-do-list v-for="date in dates_array" :key="date" :id="date" :showCustomList="showCustomList"></to-do-list>
          </div>
          <i class="bi-chevron-right slider-btn" ref="weekRight" @click="weekMoveRight"></i>
        </div>

        <div
          v-show="showCustomList && showCalendar"
          class="main-horizontal-divider"
          id="resizer"
          @mousedown="resizerMouseDownHandler"
          @dblclick="resizerDblClick"
        >
          <div class="inner-main-horizontal-divider"></div>
        </div>

        <div
          v-show="showCustomList"
          class="todo-lists-container"
          :class="{ 'full-screen': !showCalendar, 'flex-grow-1': showCalendar }"
        >
          <i
            class="bi-chevron-left slider-btn"
            @click="customMoveLeft"
            :style="{
              visibility: cTodoList.length > columns ? 'visible' : 'hidden',
            }"
          ></i>
          <div class="todo-slider slides" ref="customListContainer">
            <to-do-list
              v-for="(cTodoList, index) in cTodoList"
              :key="cTodoList.listId"
              :id="cTodoList.listId"
              :customTodoList="true"
              :cTodoListIndex="index"
              :showCustomList="showCustomList"
            ></to-do-list>
          </div>
          <i
            class="bi-chevron-right slider-btn"
            @click="customMoveRight"
            :style="{
              visibility: cTodoList.length > columns ? 'visible' : 'hidden',
            }"
          ></i>
        </div>
      </div>

      <remove-custom-list></remove-custom-list>
      <config-modal @change-columns="weekResetScroll"></config-modal>
      <clear-data-modal></clear-data-modal>
      <about-modal></about-modal>
      <redirect-domain-modal></redirect-domain-modal>
      <donate-modal></donate-modal>
      <welcome-modal></welcome-modal>
      <tips-modal></tips-modal>
      <to-do-modal :selectedTodo="selectedTodo"></to-do-modal>
      <update-checker></update-checker>
    </div>
    <div class="mobile d-flex flex-column justify-content-center align-items-center">
      <i class="bi-exclamation-diamond mb-4" style="font-size: 100px"></i>
      <h3 style="text-align: center">{{ $t("ui.mobileWarning") }}</h3>
    </div>
  </div>
  <div v-if="!compatible" class="compatible d-flex flex-column justify-content-center align-items-center p-5">
    <i class="bi-exclamation-diamond mb-4" style="font-size: 100px"></i>
    <h3 style="text-align: center">{{ $t("ui.compatible") }}</h3>
  </div>
</template>

<script>
import toDoList from "./components/toDoList";
import moment from "moment";
import sideBar from "./components/layout/sideBar";
import customToDoListIdsRepository from "./repositories/customToDoListIdsRepository";
import removeCustomList from "./components/removeCustomList";
import configModal from "./views/configModal";
import splashScreen from "./components/splashScreen";
import configRepository from "./repositories/configRepository";
import aboutModal from "./views/aboutModal";
import donateModal from "./views/donateModal";
import welcomeModal from "./views/welcomeModal";
import toDoModal from "./views/toDoModal/toDoModal";
import tipsModal from "./views/tipsModal";
import redirectDomainModal from "./views/redirectDomainModal";
import { Modal } from "bootstrap";
import updateChecker from "./components/updateChecker";
import migrations from "./migrations/migrations";
import version_json from "../public/version.json";
import isElectron from "is-electron";
import taskHelper from "./helpers/tasksHelper";
import notifications from "./helpers/notifications";
import clearDataModal from "./views/clearDataModal.vue";

export default {
  name: "App",
  components: {
    donateModal,
    configModal,
    toDoList,
    sideBar,
    removeCustomList,
    splashScreen,
    aboutModal,
    welcomeModal,
    tipsModal,
    updateChecker,
    toDoModal,
    redirectDomainModal,
    clearDataModal,
  },
  data() {
    return {
      selected_date: moment().format("YYYYMMDD"),
      cTodoList: this.$store.getters.cTodoListIds,
      calendarHeight: "50%",
      ipcRenderer: null,
    };
  },
  beforeCreate() {
    let config = configRepository.load();
    if (version_json.version != config.version) {
      migrations.migrate();
    }
    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    this.$store.commit("loadCustomTodoListsIds", customToDoListIdsRepository.load());
    this.$store.commit("loadConfig", configRepository.load());
    this.$i18n.locale = this.$store.getters.config.language;

    this.$store.dispatch("loadAllRepeatingEvent").then(
      function () {
        this.$store.commit("loadRepeatingEventDateCache", this.$store.getters.repeatingEventList);
      }.bind(this)
    );
  },
  mounted() {
    this.$refs.weekListContainer.scrollLeft = this.todoListWidth();
    this.calendarHeight = this.$store.getters.config.calendarHeight;
    window.addEventListener("resize", this.weekResetScroll);
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        setTimeout(this.hideSplash, 5000);
      }
    };

    if (isElectron()) {
      const { ipcRenderer } = require("electron");
      this.ipcRenderer = ipcRenderer;
      if (this.$store.getters.config.firstTimeOpen) {
        this.ipcRenderer.send("show-current-window");
      }
      if (this.$store.getters.config.notificationOnStartup && !this.$store.getters.config.firstTimeOpen) {
        setTimeout(this.showInitialNotification, 4000);
      }
      this.ipcRenderer.send("match-open-on-startup", this.$store.getters.config.openOnStartup);
    }

    this.resetAppOnDayChange();

    setTimeout(this.refreshTodayNotifications, 4000);
  },
  methods: {
    weekMoveLeft: function () {
      this.selected_date = moment(this.selected_date).subtract(1, "d").format("YYYYMMDD");
      this.$refs.weekListContainer.scrollLeft = this.todoListWidth() * 2;
      this.$refs.weekListContainer.scroll({
        left: this.$refs.weekListContainer.scrollLeft - this.todoListWidth(),
        top: 0,
        behavior: "smooth",
      });
    },
    weekMoveRight: function () {
      this.selected_date = moment(this.selected_date).add(1, "d").format("YYYYMMDD");
      this.$refs.weekListContainer.scrollLeft = 0;
      this.$refs.weekListContainer.scroll({
        left: this.$refs.weekListContainer.scrollLeft + this.todoListWidth(),
        top: 0,
        behavior: "smooth",
      });
    },
    weekResetScroll: function () {
      this.$refs.weekListContainer.scrollLeft = this.todoListWidth();
    },
    customMoveRight: function () {
      this.$refs.customListContainer.scrollLeft =
        this.$refs.customListContainer.scrollLeft + this.customTodoListWidth() - 13;
    },
    customMoveLeft: function () {
      this.$refs.customListContainer.scrollLeft = this.$refs.customListContainer.scrollLeft - this.customTodoListWidth();
    },
    todoListWidth: function () {
      return this.$refs.weekListContainer.clientWidth / this.columns;
    },
    customTodoListWidth: function () {
      return this.$refs.customListContainer.clientWidth / this.columns;
    },
    setSelectedDate: function (date) {
      this.selected_date = date;
      this.$nextTick(function () {
        document
          .getElementById("list" + date)
          .getElementsByClassName("new-todo-input")[0]
          .focus();
        document
          .getElementById("list" + date)
          .getElementsByClassName("new-todo-input")[0]
          .select();
      });
    },
    isElectron: function () {
      let isElectron = require("is-electron");
      return isElectron();
    },
    hideSplash: function () {
      if (this.isElectron()) {
        if (this.ipcRenderer.sendSync("is-windows-visible")) {
          this.$refs.splash.hideSplash();
        }
      } else {
        this.$refs.splash.hideSplash();
      }
      if (this.$store.getters.config.firstTimeOpen) {
        this.showWelcomeModal();
      } else {
        if (window.location.hostname.includes("netlify.app")) {
          this.showRedirectDomainModal();
        }
      }
    },
    showWelcomeModal: function () {
      let modal = new Modal(document.getElementById("welcomeModal"), {
        backdrop: "static",
      });
      modal.show();
      this.$store.commit("updateConfig", { val: false, key: "firstTimeOpen" });
      configRepository.update(this.$store.getters.config);
    },
    showRedirectDomainModal: function () {
      let modal = new Modal(document.getElementById("RedirectDomainModal"));
      modal.show();
    },
    compatible: function () {
      return window.IndexedDB;
    },
    resizerDblClick: function () {
      this.calendarHeight = "50%";
      this.$store.commit("updateConfig", {
        val: this.calendarHeight,
        key: "calendarHeight",
      });
      configRepository.update(this.$store.getters.config);
    },
    resizerMouseDownHandler: function (e) {
      this.resizerY = e.clientY;
      document.addEventListener("mousemove", this.resizerMouseMoveHandler);
      document.addEventListener("mouseup", this.resizerMouseUpHandler);
    },
    resizerMouseMoveHandler: function (e) {
      this.calendarHeight = `${(e.clientY * 100) / this.zoom}px`;
    },
    resizerMouseUpHandler: function () {
      document.removeEventListener("mousemove", this.resizerMouseMoveHandler);
      document.removeEventListener("mouseup", this.resizerMouseUpHandler);
      this.$store.commit("updateConfig", {
        val: this.calendarHeight,
        key: "calendarHeight",
      });
      configRepository.update(this.$store.getters.config);
    },
    refreshTodayNotifications: function () {
      notifications.refreshDayNotifications(this, moment().format("YYYYMMDD"));
    },
    showInitialNotification: function () {
      new Notification("WeekToDo", {
        body: this.initialNotificationText(),
        icon: "/favicon.ico",
        silent: true,
      }).onclick = () => {
        this.ipcRenderer.send("show-current-window");
        setTimeout(() => {
          if (document.getElementById("splashScreen")) {
            document.getElementById("splashScreen").classList.add("hiddenSplashScreen");
          }
        }, 3000);
      };
      notifications.playNotificationSound(this.$store.getters.config.notificationSound);
    },
    initialNotificationText: function () {
      let yesterdayTasks = this.$store.getters.todoLists[moment().subtract(1, "d").format("YYYYMMDD")];
      let todayTasks = this.$store.getters.todoLists[moment().format("YYYYMMDD")];

      let yesterayPendingTasksCount = taskHelper.pendingTasksCount(yesterdayTasks);
      let todayPendingTasksCount = taskHelper.pendingTasksCount(todayTasks);

      if (yesterayPendingTasksCount == 0 && todayPendingTasksCount == 0) {
        return this.$t("notifications.noPendingTasksToday");
      } else if (yesterayPendingTasksCount == 0) {
        return this.$t("notifications.pendingTasksToday", [todayPendingTasksCount]);
      } else if (todayPendingTasksCount == 0) {
        return this.$t("notifications.pendingTasksYesterday", [yesterayPendingTasksCount]);
      } else {
        return this.$t("notifications.pendingTasksYesterdayAndToday", [yesterayPendingTasksCount, todayPendingTasksCount]);
      }
    },
    resetAppOnDayChange: function () {
      var x = new moment();
      var y = new moment().add(1, "d").startOf("date");
      var duration = moment.duration(y.diff(x)).asMilliseconds();

      setTimeout(
        function () {
          if (isElectron() && !this.ipcRenderer.sendSync("is-windows-visible")) {
            window.location.reload();
          }
          this.refreshTodayNotifications();
          this.resetAppOnDayChange();
        }.bind(this),
        duration
      );
    },
  },
  computed: {
    dates_array: function () {
      var dates_array = [
        moment(this.selected_date).subtract(2, "d").format("YYYYMMDD"),
        moment(this.selected_date).subtract(1, "d").format("YYYYMMDD"),
        this.selected_date,
      ];
      for (let i = 1; i < this.columns; i++) {
        dates_array.push(moment(this.selected_date).add(i, "d").format("YYYYMMDD"));
      }
      return dates_array;
    },
    showCustomList: function () {
      return this.$store.getters.config.customList;
    },
    showCalendar: function () {
      return this.$store.getters.config.calendar;
    },
    columns: function () {
      return this.$store.getters.config.columns;
    },
    zoom: function () {
      return this.$store.getters.config.zoom;
    },
    darkTheme: function () {
      return this.$store.getters.config.darkTheme;
    },
    resizableStyle: function () {
      if (this.showCalendar && this.showCustomList) {
        return { height: this.calendarHeight };
      } else {
        return {};
      }
    },
    selectedTodo: function () {
      if (this.$store.getters.actions.selectedTodo) {
        return this.$store.getters.actions.selectedTodo;
      }
      return null;
    },
  },
};
</script>

<style>
body {
  line-height: unset !important;
}

.todo-lists-container {
  display: flex;
  overflow: auto;
  min-height: 5px;
  height: 5px;
  transition: height 0.15s ease-out 0s;
}

.slider-btn {
  padding: 3px;
  font-size: 2rem;
  align-self: center;
  flex-grow: 0;
  margin-left: 6px;
  margin-right: 6px;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.2, 1, 0.1, 1);
}

.slider-btn:hover {
  border-radius: 6px;
  background-color: #eaecef;
}

.slider-btn:active {
  background-color: #dddfe2;
}

.v3dp__popout {
  border-radius: 7px !important;
}

.side-bar .v3dp__popout {
  margin-left: 75px;
  margin-top: 0px;
}

.todo-slider {
  flex-grow: 1;
  display: flex;
  overflow-x: hidden;
  height: max-content;
  min-height: -webkit-fill-available;
}

.slides {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.dark-theme *::-webkit-scrollbar-thumb {
  background: #333940;
  border-radius: 5px;
}

.dark-theme *::-webkit-scrollbar-thumb:hover {
  background: #39484f;
}

.dark-theme *::-webkit-scrollbar-thumb:active {
  background: #51656f;
}

.full-screen {
  height: 100%;
  resize: unset;
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

.dark-theme input.form-range {
  background-color: unset;
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

.compatible {
  width: 100%;
  height: 100%;
  z-index: 999;
  /*position: absolute;*/
}

.hidden-input-for-focus {
  position: absolute;
  top: -100px;
}
</style>

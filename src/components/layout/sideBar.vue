<template>
  <div class="side-bar">
    <img class="logo" src="WeekToDo-Logo-Color.svg" width="31" height="31" alt="WeekTodo Logo" data-bs-toggle="modal"
      data-bs-target="#aboutModal" :title="$t('about.about')" />
    <i v-if="showCalendar" class="bi-house" @click="setTodayDate" :title="$t('ui.today')"></i>
    <datepicker v-if="datepickerEnabled" id="side-bar-date-picker-input" v-model="pickedDate" :locale="language"
      :weekStartsOn="weekStartOnMonday" />
    <i v-if="showCalendar" class="bi-calendar-event" @click="changeDate" :title="$t('ui.calendar')"> </i>
    <i v-if="showCalendar" class="bi-arrow-repeat" :title="$t('ui.recurringTasks')" data-bs-toggle="modal"
      data-bs-target="#RecurrentEventsModal">
    </i>
    <i v-if="showCustomList" class="bi bi-clipboard-plus" @click="newCustomTodoList" :title="$t('ui.newCustomList')"></i>
    <i v-if="showCustomList" class="bi bi-arrow-left-right" data-bs-target="#ReorderCustomListsModal"
      data-bs-toggle="modal" :title="$t('ui.reorderCustomLists')"></i>

    <span style="flex-grow: 1"></span>
    <i class="bi-gift" :title="$t('donate.supportUs')" @click="openDonateModal"></i>
    <i class="bi-info-square" data-bs-toggle="modal" data-bs-target="#tipsModal" :title="$t('tips.tips')"></i>
    <i class="bi-gear" data-bs-toggle="modal" data-bs-target="#configModal" :title="$t('settings.settings')"
      @click="openConfigModal"></i>
  </div>
</template>

<script>
import moment from "moment";
import customToDoListIdsRepository from "../../repositories/customToDoListIdsRepository";
import toDoListRepository from "../../repositories/toDoListRepository";
import Datepicker from "vue3-datepicker";
import languageHelper from "../../helpers/languageHelper.js"

export default {
  name: "sideBar",
  emits: ["changeDate"],
  components: {
    Datepicker,
  },
  data() {
    return {
      pickedDate: new Date(),
      datepickerEnabled: false,
    };
  },
  methods: {
    changeDate: function () {
      this.datepickerEnabled = true;
      this.$nextTick(function () {
        document.getElementById("side-bar-date-picker-input").click();
        document.getElementById("side-bar-date-picker-input").focus();
        document.getElementById("side-bar-date-picker-input").addEventListener("focusout", this.resetDatePicker);
        document.getElementById("side-bar-date-picker-input").onkeydown = function (evt) {
          evt.keyCode == 27 && document.getElementById("side-bar-date-picker-input").blur();
        };
      });
    },
    setTodayDate: function () {
      this.$emit("changeDate", moment().format("YYYYMMDD"));
    },
    newCustomTodoList: function () {
      const customTodoListId = { listId: moment().format("YYYYMMDDTHHmmssS"), listName: "" };
      this.$store.commit("actionsCListCreatedUpdate", true);
      this.$store.commit("newCustomTodoList", customTodoListId);
      customToDoListIdsRepository.update(this.$store.getters.cTodoListIds);
      toDoListRepository.update(customTodoListId.listId, this.$store.getters.todoLists[customTodoListId.listId]);
    },
    resetDatePicker: function () {
      document.getElementById("side-bar-date-picker-input").removeEventListener("focusout", this.resetDatePicker);
      this.datepickerEnabled = false;
    },
    openConfigModal: function () {
      document.getElementById("config-general-tab").click();
    },
    openDonateModal: function () {
      window.open("https://weektodo.me/support-us", "_blank");
    },
  },
  watch: {
    pickedDate: function (val) {
      if (this.datepickerEnabled) {
        document.getElementById("side-bar-date-picker-input").removeEventListener("focusout", this.resetDatePicker);
        this.datepickerEnabled = false;
        this.$emit("changeDate", moment(val).format("YYYYMMDD"));
        this.pickedDate = new Date();
      }
    },
  },
  computed: {
    showCustomList: function () {
      return this.$store.getters.config.customList;
    },
    showCalendar: function () {
      return this.$store.getters.config.calendar;
    },
    weekStartOnMonday: function () {
      return this.$store.getters.config.weekStartOnMonday ? 1 : 0;
    },
    language: function () {
      let lang = this.$store.getters.config.language;
      return languageHelper.getLanguagePack(lang);
    },
  },
};
</script>

<style scoped>
.side-bar {
  width: 3.6rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: left;
  background-color: #fcfcfc;
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
  font-size: 1.25rem;
  padding: 10px;
  margin-bottom: 9px;
  align-self: center;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.2, 1, 0.1, 1);
}

.side-bar i:hover {
  border-radius: 6px;
  background-color: #eaecef;
  color: black;
}

.side-bar i:active {
  background-color: #dddfe2;
}

.side-bar .logo {
  margin-bottom: 18px;
  margin-top: 18px;
  align-self: center;
  cursor: pointer;
}

/*------------------------Dark Theme*------------------*/

.dark-theme .side-bar {
  background-color: #161b22;
  color: #ababab;
}

.dark-theme .side-bar i:hover {
  border-radius: 6px;
  background-color: #21262d;
  color: #dedede;
}

.dark-theme .side-bar i:active {
  background-color: #2e353d;
}
</style>

<template>
  <div
    id="reDropDown"
    class="header-menu-icons"
    type="button"
    data-bs-toggle="dropdown"
    data-bs-auto-close="outside"
    :title="$t('ui.recurringTasks')"
  >
    <i id="btnRepeatingEvent" :class="{ 'bi-arrow-clockwise': !repeatingEvent, 'bi-arrow-repeat': repeatingEvent }"></i>
  </div>

  <ul class="dropdown-menu repeating-event-dropdown" aria-labelledby="btnRepeatingEvent">
    <div class="mx-3 d-flex flex-column drop-container">
      <select
        class="form-select re-input"
        aria-label="Default select example"
        v-model="repeatingType"
        :disabled="repeatingEvent"
      >
        <option value="">{{ $t("todoDetails.noRepeat") }}</option>
        <option value="3">{{ $t("todoDetails.daily") }}</option>
        <option value="2">{{ $t("todoDetails.weekly") }}</option>
        <option value="4">{{ $t("todoDetails.weekdays") }}</option>
        <option value="5">{{ $t("todoDetails.customWeekdays") }}</option>
        <option value="1">{{ $t("todoDetails.monthly") }}</option>
        <option value="6">{{ $t("todoDetails.daysOfMonth") }}</option>
        <option value="0">{{ $t("todoDetails.yearly") }}</option>
      </select>

      <div v-if="repeatingType" class="d-flex flex-column">
        <div v-show="repeatingType == '5' || (repeatingEvent && repeatingType == '2')" class="weekDays-selector mt-3 mb-1">
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-mon" class="weekday" v-model="weekdays.mon" />
          <label for="weekday-mon">{{ moments().isoWeekday(1).locale(language).format("dd")[0] }}</label>
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-tue" class="weekday" v-model="weekdays.tue" />
          <label for="weekday-tue">{{ moments().isoWeekday(2).locale(language).format("dd")[0] }}</label>
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-wed" class="weekday" v-model="weekdays.wed" />
          <label for="weekday-wed">{{ moments().isoWeekday(3).locale(language).format("dd")[0] }}</label>
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-thu" class="weekday" v-model="weekdays.thu" />
          <label for="weekday-thu">{{ moments().isoWeekday(4).locale(language).format("dd")[0] }}</label>
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-fri" class="weekday" v-model="weekdays.fri" />
          <label for="weekday-fri">{{ moments().isoWeekday(5).locale(language).format("dd")[0] }}</label>
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-sat" class="weekday" v-model="weekdays.sat" />
          <label for="weekday-sat">{{ moments().isoWeekday(6).locale(language).format("dd")[0] }}</label>
          <input type="checkbox" :disabled="repeatingEvent" id="weekday-sun" class="weekday" v-model="weekdays.sun" />
          <label for="weekday-sun">{{ moments().isoWeekday(7).locale(language).format("dd")[0] }}</label>
        </div>

        <div v-show="repeatingType == '6'" class="mt-3 mb-1">
          <input
            v-model="daysOfMonth"
            type="text"
            class="form-control day-of-month"
            :disabled="repeatingEvent"
            placeholder="1,2,15"
          />
        </div>

        <div class="d-flex align-items-center justify-content-between re-input">
          <label class="opacity-50">{{ $t("todoDetails.interval") }}</label>
          <input type="number" class="form-control lex-shrink-1 counter" v-model="interval" :disabled="repeatingEvent" />
        </div>

        <select
          class="form-select re-input"
          aria-label="Default select example"
          v-model="ocurrencesType"
          :disabled="repeatingEvent"
        >
          <option value="">{{ $t("todoDetails.indefinitely") }}</option>
          <option value="ocurrences">
            {{ $t("todoDetails.occurrences") }}
          </option>
          <option value="untilDate">{{ $t("todoDetails.untilDate") }}</option>
        </select>

        <input
          v-if="ocurrencesType == 'ocurrences'"
          type="number"
          class="form-control re-input last-input"
          v-model="ocurrences"
          :disabled="repeatingEvent"
        />
        <input
          v-if="ocurrencesType == 'untilDate'"
          type="date"
          class="form-control re-input last-input"
          v-model="untilDate"
          :disabled="repeatingEvent"
        />
      </div>

      <div class="d-flex flex-row re-form-row re-input">
        <button v-if="!repeatingEvent" type="button" class="btn flex-fill" @click="done">
          {{ $t("todoDetails.done") }}
        </button>
        <button v-if="repeatingEvent" type="button" class="btn flex-fill" @click="split">
          {{ $t("todoDetails.split") }}
        </button>
      </div>
    </div>
  </ul>
</template>

<script>
import { RRule, rrulestr } from "rrule";
import repeatingEventRepository from "../../repositories/repeatingEventRepository";
import moment from "moment";
import { Dropdown } from "bootstrap";
import repeatingEventHelper from "../../helpers/repeatingEvents.js";
import repeatingEventByDateRepository from "../../repositories/repeatingEventByDateRepository";

export default {
  name: "RepatingEvent",
  emits: ["repeatingEventSelected"],
  data() {
    return {
      repeatingType: "",
      interval: 1,
      ocurrencesType: "",
      ocurrences: 1,
      untilDate: null,
      daysOfMonth: "",
      weekdays: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
    };
  },
  props: {
    repeatingEvent: { required: true, type: [String, null] },
    todo: { required: true, type: [Object, null] },
  },
  methods: {
    done() {
      const rule = this.repeatingEventRule();
      var repeatingEventId = this.repeatingEvent ? this.repeatingEvent : moment().format("x");
      if (rule) {
        let date = this.todo.listId;
        var re_by_date = this.$store.getters.repeatingEventByDate[date];
        if (!re_by_date) re_by_date = {};
        re_by_date[repeatingEventId] = true;
        repeatingEventByDateRepository.update(date, re_by_date);
        const re_event = this.generateRepeatingEvent(rule, repeatingEventId);
        repeatingEventRepository.update(repeatingEventId, re_event);
        this.$store.commit("updateRepeatingEvent", { key: repeatingEventId, val: re_event });
        this.$store.commit("addRepeatingEventToDateCache", re_event);
        this.$store.getters.selectedDates.forEach((date) => {
          repeatingEventHelper.generateRepeatingEventsIntances(date, this);
        });
      } else {
        repeatingEventRepository.remove(repeatingEventId);
        repeatingEventId = null;
      }

      let reDropDown = document.getElementById("reDropDown");
      let dropdown = new Dropdown(reDropDown);
      dropdown.hide();

      this.$emit("repeatingEventSelected", repeatingEventId);
    },
    split() {
      repeatingEventRepository.remove(this.repeatingEvent);
      let reDropDown = document.getElementById("reDropDown");
      let dropdown = new Dropdown(reDropDown);
      dropdown.hide();
      this.$emit("repeatingEventSelected", null);
    },
    repeatingEventRule() {
      if (!this.repeatingType) return null;

      var ruleOptions = {
        freq: this.repeatingType,
        interval: this.interval,
        dtstart: moment.utc(this.todo.listId, "YYYYMMDD").toDate(),
      };

      if (this.repeatingType == 4) {
        ruleOptions.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
        ruleOptions.freq = 2;
      }

      if (this.repeatingType == 5) {
        ruleOptions.byweekday = [];
        this.weekdays.mon && ruleOptions.byweekday.push(RRule.MO);
        this.weekdays.tue && ruleOptions.byweekday.push(RRule.TU);
        this.weekdays.wed && ruleOptions.byweekday.push(RRule.WE);
        this.weekdays.thu && ruleOptions.byweekday.push(RRule.TH);
        this.weekdays.fri && ruleOptions.byweekday.push(RRule.FR);
        this.weekdays.sat && ruleOptions.byweekday.push(RRule.SA);
        this.weekdays.sun && ruleOptions.byweekday.push(RRule.SU);
        ruleOptions.freq = 2;
      }

      if (this.repeatingType == 6) {
        const daysOfMonthArray = this.daysOfMonth.split(",").map((num) => parseInt(num));
        ruleOptions.bymonthday = daysOfMonthArray;
        ruleOptions.freq = 1;
      }

      if (this.ocurrencesType == "ocurrences") {
        ruleOptions.count = this.ocurrences;
      } else if (this.ocurrencesType == "untilDate") {
        ruleOptions.until = moment(this.untilDate);
      }
      return new RRule(ruleOptions);
    },
    generateRepeatingEvent(rule, repeatingEventId) {
      var todo_data = JSON.parse(JSON.stringify(this.todo));
      todo_data.repeatingEvent = repeatingEventId;
      const rule2 = rrulestr(rule.toString()); //Cloning the rule for some error in the library don't works with original rule
      var re_event = {
        start_date: rule.options.dtstart,
        repeating_rule: rule.toString(),
        type: this.repeatingType,
        ocurrencesType: this.ocurrencesType,
        data: todo_data,
        id: repeatingEventId,
      };

      if (this.ocurrencesType == "ocurrences") {
        re_event.end_date = moment(rule2.all().slice(-1)[0]);
      } else if (this.ocurrencesType == "untilDate") {
        re_event.end_date = moment(rule.options.until).toDate();
      } else {
        var date = new Date();
        date.setFullYear(date.getFullYear() + 15);
        re_event.end_date = date;
      }

      return re_event;
    },
    moments: function (date) {
      return moment(date);
    },
  },
  watch: {
    repeatingEvent: function (newVal) {
      let re = this.$store.getters.repeatingEventList[newVal];
      this.weekdays = { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false };
      if (re) {
        const rule = rrulestr(re.repeating_rule);
        this.repeatingType = rule.options.freq;
        this.interval = rule.options.interval;
        this.ocurrences = rule.options.count;
        this.ocurrencesType = re.ocurrencesType;
        this.untilDate = rule.options.until
          ? rule.options.until.toLocaleDateString("en-GB").split("/").reverse().join("-")
          : null;
        if (rule.options.byweekday) {
          rule.options.byweekday.includes(0) && (this.weekdays.mon = true);
          rule.options.byweekday.includes(1) && (this.weekdays.tue = true);
          rule.options.byweekday.includes(2) && (this.weekdays.wed = true);
          rule.options.byweekday.includes(3) && (this.weekdays.thu = true);
          rule.options.byweekday.includes(4) && (this.weekdays.fri = true);
          rule.options.byweekday.includes(5) && (this.weekdays.sat = true);
          rule.options.byweekday.includes(6) && (this.weekdays.sun = true);
          this.repeatingType = 5;
        }
        if (rule.options.bymonthday.length > 0) {
          this.repeatingType = 6;
          this.daysOfMonth = rule.options.bymonthday.join(",");
        }
      } else {
        this.repeatingType = "";
        this.ocurrencesType = "";
        this.daysOfMonth = "";
        this.interval = 1;
        this.untilDate = "";
        this.ocurrences = null;
        this.untilDate = null;
      }
    },
  },
  computed: {
    language: function () {
      return this.$store.getters.config.language;
    },
  },
};
</script>

<style scoped lang="scss">
@import "/src/assets/style/globalVars.scss";

.header-menu-icons {
  margin-left: 6px;
  @include btn-icon;
}

.repeating-event-dropdown {
  margin-left: -80px !important;
  width: 200px;
}

.re-input {
  margin-top: 10px;
  font-size: 15px;
}

.counter {
  width: 60px;
  border: none;
  border-bottom: 1px solid #ced4da;
  border-radius: unset;
  padding: unset;
}

.last-input {
  border: none;
  border-bottom: 1px solid #ced4da;
  border-radius: unset;
  padding: 5ps;
}

.form-control:focus,
.form-select:focus {
  box-shadow: unset;
}

[type="date"]::-webkit-inner-spin-button {
  display: none;
}

[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}

.dark-theme input {
  background-color: #21262d;
  color: #c9d1d9;
  border-bottom: 1px solid #464647;
}

.dark-theme .day-of-month {
  background-color: #15161e;
  border: 1px solid #464647;
}

.day-of-month::placeholder {
  color: #9b9b9b;
}

.dark-theme .day-of-month::placeholder {
  color: #838383;
}

.weekDays-selector {
  display: flex;
  justify-content: center;
}

.weekDays-selector input {
  display: none !important;
}

.weekDays-selector input[type="checkbox"] + label {
  display: inline-block;
  border-radius: 3px;
  background: #eaecef;
  height: 20px;
  width: 20px;
  margin-right: 3px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
}

.dark-theme .weekDays-selector input[type="checkbox"] + label {
  background: #15161e;
  color: #ffffff;
}

.weekDays-selector input[type="checkbox"]:disabled + label {
  cursor: unset;
  opacity: 0.6;
}

.weekDays-selector input[type="checkbox"]:checked + label {
  background: #5c5c5c;
  color: #ffffff;
}
</style>

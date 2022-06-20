<template>
  <div id="reDropDown" class="header-menu-icons" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
    <i id="btnRepeatingEvent" :class="{ 'bi-arrow-clockwise': !repeatingEvent, 'bi-arrow-repeat': repeatingEvent }"></i>
  </div>

  <ul class="dropdown-menu repeating-event-dropdown" aria-labelledby="btnRepeatingEvent">
    <div class="mx-3 d-flex flex-column drop-container">
      <select class="form-select re-input" aria-label="Default select example" v-model="repeatingType"
        :disabled="repeatingEvent">
        <option value="">{{ $t("todoDetails.noRepeat") }}</option>
        <option value="3">{{ $t("todoDetails.daily") }}</option>
        <option value="2">{{ $t("todoDetails.weekly") }} </option>
        <option value="1">{{ $t("todoDetails.monthly") }}</option>
        <option value="0">{{ $t("todoDetails.yearly") }}</option>
      </select>

      <div v-if="repeatingType" class="d-flex flex-column">
        <div class="d-flex align-items-center justify-content-between re-input">
          <label class="opacity-50">{{ $t("todoDetails.interval") }}</label>
          <input type="number" class="form-control lex-shrink-1 counter" v-model="interval"
            :disabled="repeatingEvent" />
        </div>

        <select class="form-select re-input" aria-label="Default select example" v-model="ocurrencesType"
          :disabled="repeatingEvent">
          <option value="">{{ $t("todoDetails.indefinitely") }}</option>
          <option value="ocurrences">
            {{ $t("todoDetails.occurrences") }}
          </option>
          <option value="untilDate">{{ $t("todoDetails.untilDate") }}</option>
        </select>

        <input v-if="ocurrencesType == 'ocurrences'" type="number" class="form-control re-input last-input"
          v-model="ocurrences" :disabled="repeatingEvent" />
        <input v-if="ocurrencesType == 'untilDate'" type="date" class="form-control re-input last-input"
          v-model="untilDate" :disabled="repeatingEvent" />
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
        dtstart: moment(this.todo.listId, "YYYYMMDD").toDate(),
      };

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
  },
  watch: {
    repeatingEvent: function (newVal) {
      let re = this.$store.getters.repeatingEventList[newVal];
      if (re) {
        const rule = rrulestr(re.repeating_rule);
        this.repeatingType = rule.options.freq;
        this.interval = rule.options.interval;
        this.ocurrences = rule.options.count;
        this.ocurrencesType = re.ocurrencesType;
        this.untilDate = rule.options.until ? rule.options.until.toLocaleDateString("en-GB").split("/").reverse().join("-") : null;
      } else {
        this.repeatingType = "";
        this.ocurrencesType = "";
        this.interval = 1;
        this.untilDate = "";
        this.ocurrences = null;
        this.untilDate = null;
      }
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
</style>

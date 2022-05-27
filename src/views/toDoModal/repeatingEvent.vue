<template>
  <div id="reDropDown" class="header-menu-icons" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
    <i id="btnRepeatingEvent" :class="{ 'bi-arrow-clockwise': !repeatingEvent, 'bi-arrow-repeat': repeatingEvent }"></i>
  </div>

  <ul class="dropdown-menu repeating-event-dropdown" aria-labelledby="btnRepeatingEvent">
    <div class="mx-3 d-flex flex-column drop-container">
      <select class="form-select re-input" aria-label="Default select example" v-model="repeatingType">
        <option value="">{{ $t("todoDetails.noRepeat") }}</option>
        <option value="daily">{{ $t("todoDetails.daily") }}</option>
        <option value="weekly">{{ $t("todoDetails.weekly") }}</option>
        <option value="monthly">{{ $t("todoDetails.monthly") }}</option>
        <option value="yearly">{{ $t("todoDetails.yearly") }}</option>
      </select>

      <div v-if="repeatingType" class="d-flex flex-column">
        <div class="d-flex align-items-center justify-content-between re-input">
          <label class="opacity-50">{{ $t("todoDetails.interval") }}</label>
          <input type="number" class="form-control lex-shrink-1 counter" v-model="interval" />
        </div>

        <select class="form-select re-input" aria-label="Default select example" v-model="ocurrencesType">
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
        />
        <input
          v-if="ocurrencesType == 'untilDate'"
          type="date"
          class="form-control re-input last-input"
          v-model="untilDate"
        />
      </div>

      <div class="d-flex flex-row re-form-row re-input">
        <button type="button" class="btn flex-fill" @click="cancel">
          {{ $t("todoDetails.cancel") }}
        </button>
        <button type="button" class="btn flex-fill" @click="done">
          {{ $t("todoDetails.done") }}
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
        const re_event = this.generateRepeatingEvent(rule, repeatingEventId);
        repeatingEventRepository.update(repeatingEventId, re_event);
        this.$store.commit("updateRepeatingEvent", { key: repeatingEventId, val: re_event });
      } else {
        repeatingEventRepository.remove(repeatingEventId);
        repeatingEventId = null;
      }

      let reDropDown = document.getElementById("reDropDown");
      let dropdown = new Dropdown(reDropDown);
      dropdown.hide();

      this.$emit("repeatingEventSelected", repeatingEventId);
    },
    cancel() {
      let reDropDown = document.getElementById("reDropDown");
      let dropdown = new Dropdown(reDropDown);
      dropdown.hide();
    },
    repeatingEventRule() {
      if (!this.repeatingType) return null;
      var ruleOptions = {};
      var freq = null;
      switch (this.repeatingType) {
        case "daily":
          freq = RRule.DAILY;
          break;
        case "weekly":
          freq = RRule.WEEKLY;
          break;
        case "monthly":
          freq = RRule.MONTHLY;
          break;
        case "yearly":
          freq = RRule.YEARLY;
          break;
        default:
          freq = RRule.DAILY;
      }

      ruleOptions = { freq: freq, interval: this.interval };

      if (this.ocurrencesType == "ocurrences") {
        ruleOptions.count = this.ocurrences;
      } else if (this.ocurrencesType == "untilDate") {
        ruleOptions.until = this.untilDate;
      }
      return new RRule(ruleOptions);
    },
    generateRepeatingEvent(rule, repeatingEventId) {
      var re_event = {
        start_date: rule.options.dtstart,
        end_date: rule.options.until,
        repeating_rule: rule.toString(),
        type: this.repeatingType,
        data: this.todo,
        id: repeatingEventId,
        generated_dates: [],
      };

      if (rule.options.count) {
        re_event.end_date = rule.all().slice(-1)[0];
      }
      if (!rule.options.until) {
        var date = new Date();
        date.setFullYear(date.getFullYear() + 100);
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
        this.repeatingType = re.type;
        this.interval = rule.options.interval;
        this.ocurrences = rule.options.count;
        if (rule.options.until) {
          this.untilDate = rule.options.until.toLocaleDateString("en-GB").split("/").reverse().join("-");
        } else {
          this.untilDate = null;
        }
        this.ocurrencesType == "";
        if (this.ocurrences) this.ocurrencesType == "ocurrences";
        if (this.untilDate) this.ocurrencesType == "untilDate";
      } else {
        this.repeatingType = "";
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

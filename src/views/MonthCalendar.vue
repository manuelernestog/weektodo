<template>
  <div class="modal fade" id="monthCalendarModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header align-items-center">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <i class="bi-chevron-double-left nav-btn" @click="prevYear" :title="$t('todoDetails.yearly')"></i>
            <i class="bi-chevron-left nav-btn" @click="prevMonth" :title="$t('todoDetails.monthly')"></i>

            <select class="form-select form-select-sm w-auto" v-model.number="selectedMonthIndex" @change="applyMonthYear">
              <option v-for="(m, i) in monthNames" :key="i" :value="i">{{ m }}</option>
            </select>

            <input
              class="form-control form-control-sm year-input w-auto"
              type="number"
              :min="minYear"
              :max="maxYear"
              v-model.number="selectedYear"
              @change="applyMonthYear"
            />

            <i class="bi-chevron-right nav-btn" @click="nextMonth" :title="$t('todoDetails.monthly')"></i>
            <i class="bi-chevron-double-right nav-btn" @click="nextYear" :title="$t('todoDetails.yearly')"></i>

            <button class="btn btn-sm btn-outline-secondary ms-1" @click="goToToday">{{ $t('ui.today') }}</button>
          </div>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="calendar-grid">
            <div class="weekday" v-for="(d, i) in weekdays" :key="i">{{ d }}</div>

            <div
              v-for="(day, i) in monthDays"
              :key="day.id"
              class="day-cell"
              :class="{
                'out-month': !day.inCurrentMonth,
                today: day.isToday,
                'expand-left': (i % 7) >= 5,
              }"
              @click="goTo(day.id)"
            >
              <div class="day-inner">
                <div class="day-header">
                  <span class="day-number">{{ day.number }}</span>
                  <span class="count" v-if="pendingCount(day.id) > 0">{{ pendingCount(day.id) }}</span>
                </div>
                <ul class="tasks">
                  <li v-for="(t, idx) in previewTasks(day.id)" :key="idx">{{ t.text }}</li>
                  <li v-if="moreCount(day.id) > 0" class="more">+{{ moreCount(day.id) }} {{ $t('ui.showAll') }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import repeatingEventHelper from "../helpers/repeatingEvents.js";
import { Modal } from 'bootstrap';

export default {
  name: 'MonthCalendar',
  data() {
    return {
      currentMonth: moment().startOf('month'),
      loading: false,
      selectedMonthIndex: moment().month(),
      selectedYear: moment().year(),
      minYear: 1970,
      maxYear: 2099,
    };
  },
  mounted() {
    // Ensure data for the initial month is prepared when opened
    const el = document.getElementById('monthCalendarModal');
    el.addEventListener('shown.bs.modal', () => {
      this.syncSelectorsFromCurrent();
      this.ensureMonthData();
    });
  },
  methods: {
    weekStartMonday() {
      return this.$store.getters.config.weekStartOnMonday;
    },
    prevMonth() {
      this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
      this.syncSelectorsFromCurrent();
      this.ensureMonthData();
    },
    nextMonth() {
      this.currentMonth = this.currentMonth.clone().add(1, 'month');
      this.syncSelectorsFromCurrent();
      this.ensureMonthData();
    },
    prevYear() {
      this.currentMonth = this.currentMonth.clone().subtract(1, 'year');
      this.syncSelectorsFromCurrent();
      this.ensureMonthData();
    },
    nextYear() {
      this.currentMonth = this.currentMonth.clone().add(1, 'year');
      this.syncSelectorsFromCurrent();
      this.ensureMonthData();
    },
    goToToday() {
      this.currentMonth = moment().startOf('month');
      this.syncSelectorsFromCurrent();
      this.ensureMonthData();
    },
    async ensureMonthData() {
      this.loading = true;
      const ids = this.monthDateIds();
      // Load lists and repeating events for all days in the rendered grid
      for (const id of ids) {
        // Load base list
        // eslint-disable-next-line no-await-in-loop
        await this.$store.dispatch('loadTodoLists', id);
        // Load repeating events by date, then instantiate
        // eslint-disable-next-line no-await-in-loop
        await this.$store.dispatch('loadRepeatingEventGeneratedByDate', id);
        repeatingEventHelper.generateRepeatingEventsIntances(id, this);
      }
      this.loading = false;
    },
    applyMonthYear() {
      // Clamp year within bounds
      if (this.selectedYear < this.minYear) this.selectedYear = this.minYear;
      if (this.selectedYear > this.maxYear) this.selectedYear = this.maxYear;

      this.currentMonth = this.currentMonth
        .clone()
        .year(this.selectedYear)
        .month(this.selectedMonthIndex)
        .startOf('month');
      this.ensureMonthData();
    },
    syncSelectorsFromCurrent() {
      this.selectedMonthIndex = this.currentMonth.month();
      this.selectedYear = this.currentMonth.year();
    },
    monthDateIds() {
      const start = this.gridStart();
      const days = [];
      for (let i = 0; i < 42; i++) {
        days.push(start.clone().add(i, 'day').format('YYYYMMDD'));
      }
      return days;
    },
    gridStart() {
      const first = this.currentMonth.clone().startOf('month');
      return this.weekStartMonday() ? first.clone().startOf('isoWeek') : first.clone().startOf('week');
    },
    gridEnd() {
      const last = this.currentMonth.clone().endOf('month');
      return this.weekStartMonday() ? last.clone().endOf('isoWeek') : last.clone().endOf('week');
    },
    goTo(id) {
      // Emit to parent to jump to week/day, then close
      this.$emit('goToDate', id);
      const modal = Modal.getInstance(document.getElementById('monthCalendarModal')) ||
        new Modal(document.getElementById('monthCalendarModal'));
      modal.hide();
    },
    previewTasks(id) {
      const list = (this.$store.getters.todoLists[id] || []).filter(t => !t.checked);
      return list.slice(0, 3);
    },
    moreCount(id) {
      const list = (this.$store.getters.todoLists[id] || []).filter(t => !t.checked);
      return Math.max(0, list.length - 3);
    },
    pendingCount(id) {
      const list = (this.$store.getters.todoLists[id] || []).filter(t => !t.checked);
      return list.length;
    },
  },
  computed: {
    monthTitle() {
      return this.currentMonth.clone().locale(this.$store.getters.config.language).format('MMMM YYYY');
    },
    monthNames() {
      const lang = this.$store.getters.config.language;
      return moment().locale(lang).localeData().months();
    },
    weekdays() {
      const lang = this.$store.getters.config.language;
      const ld = moment().locale(lang).localeData();
      const list = ld.weekdaysShort();
      if (this.weekStartMonday()) {
        // Move Sunday to end to start week on Monday
        return [...list.slice(1), list[0]];
      }
      return list;
    },
    monthDays() {
      const start = this.gridStart();
      const end = this.gridEnd();
      const todayId = moment().format('YYYYMMDD');
      const days = [];
      let cursor = start.clone();
      while (cursor.isSameOrBefore(end, 'day')) {
        const id = cursor.format('YYYYMMDD');
        days.push({
          id,
          inCurrentMonth: cursor.isSame(this.currentMonth, 'month'),
          number: cursor.date(),
          isToday: id === todayId,
        });
        cursor = cursor.add(1, 'day');
      }
      return days;
    },
  },
};
</script>

<style scoped lang="scss">
.modal-dialog {
  max-width: 1100px;
}

.modal-body {
  height: 540px;
  overflow: auto;
}

/* Allow pop-outs to overflow the grid area */
.calendar-grid {
  overflow: visible;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.weekday {
  font-weight: 600;
  padding: 4px 6px;
}

.day-cell {
  position: relative;
  aspect-ratio: 1 / 1; /* ensures square cells */
  cursor: pointer;
}

.day-inner {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 6px;
  background: var(--wc-day-bg, #fff);
  box-sizing: border-box;
  overflow: hidden; /* default: clip content */
  transition: box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.day-cell:hover .day-inner {
  z-index: 10;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.08);
  background: #fff;
  /* Pop out to fit content up to these max limits */
  left: 0;
  top: 0;
  right: auto;
  bottom: auto;
  width: max-content;
  max-width: 400px;
  min-width: 100%;
  height: auto;
  min-height: 100%;
  max-height: 600px;
  overflow: auto;
}

/* Rightmost columns: pop to the left to stay inside modal */
.day-cell.expand-left:hover .day-inner {
  left: auto;
  right: 0;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.day-number {
  font-weight: 600;
  font-size: 0.95rem;
}

.count {
  font-size: 0.75rem;
  color: #6c757d;
}

.tasks {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.tasks li {
  font-size: 0.8rem;
  line-height: 1.1rem;
  white-space: nowrap; /* truncate by default */
  overflow: hidden;
  text-overflow: ellipsis;
}

.tasks .more {
  color: #6c757d;
}

/* On hover, allow wrapping so full text shows */
.day-cell:hover .tasks li {
  white-space: normal;
  text-overflow: clip;
}

.out-month {
  opacity: 0.5;
}

.today {
  /* highlight border on inner panel */
}

.today .day-inner {
  border-color: #0d6efd;
}

.nav-btn {
  cursor: pointer;
  font-size: 1.2rem;
}

.year-input {
  width: 92px;
}

/* Dark theme tweaks */
.dark-theme .day-cell {
  border-color: #2a2e36;
}

.dark-theme .day-cell:hover .day-inner {
  background-color: #1b2027;
}

.dark-theme .day-inner {
  border-color: #2a2e36;
  background: #12161c;
}

</style>

<template>
  <div
    class="header-menu-icons"
    type="button"
    data-bs-toggle="dropdown"
    data-bs-auto-close="outside"
    :title="$t('todoDetails.time')"
  >
    <i
      id="btnTaskTimePicker"
      :class="{ 'bi-alarm': !selectedTime, 'bi-alarm-fill': selectedTime }"
    ></i>
  </div>

  <ul
    class="dropdown-menu color-picker-dropdown"
    aria-labelledby="btnTaskTimePicker"
  >
    <div class="d-flex align-items-center mx-3">
      <input
        type="time"
        v-model="selectedTime"
        @blur="selectTime(selectedTime)"
      />
      <i
        class="header-menu-icons bi-trash"
        type="button"
        @click="clearTime"
      ></i>
    </div>
  </ul>
</template>

<script>
export default {
  name: "timePicker",
  emits: ["timeSelected"],
  data() {
    return {
      selectedTime: "",
    };
  },
  props: {
    time: { required: true, type: [String, null] },
  },
  methods: {
    selectTime(time) {
      this.$emit("timeSelected", time);
    },
    clearTime() {
      this.selectedTime = null;
      this.selectTime(this.selectedTime);
    },
  },
  watch: {
    time: function (newVal) {
      this.selectedTime = newVal;
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

.bi-trash {
  margin: 0px;
}

input[type="time"] {
  background-color: transparent;
  border: none;
  font-size: 16px;
  width: 130px;
  outline: unset;
  height: 40px;
}

input[type="time"]::-webkit-datetime-edit-text {
  padding: 19px 2px;
}

input[type="time"]::-webkit-datetime-edit-fields-wrapper {
  /*display: block;*/
  padding: 8px 2px 8px 2px;
  border: none;
}

input[type="time"]::-webkit-datetime-edit-hour-field,
input[type="time"]::-webkit-datetime-edit-minute-field,
input[type="time"]::-webkit-datetime-edit-ampm-field {
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 5px;
  min-width: 80px;
  width: 80px;
  color: #494949;

  .dark-theme & {
    color: #bfbfbf;
  }
}

input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}

input[type="time"]::-webkit-datetime-edit-hour-field:hover,
input[type="time"]::-webkit-datetime-edit-minute-field:hover,
input[type="time"]::-webkit-datetime-edit-ampm-field:hover {
  color: black;
  background-color: #f4f4f4;

  .dark-theme & {
    color: white;
    background-color: #303940;
  }
}

input[type="time"]::-webkit-datetime-edit-hour-field:focus,
input[type="time"]::-webkit-datetime-edit-minute-field:focus,
input[type="time"]::-webkit-datetime-edit-ampm-field:focus {
  border: 2px solid black;
  color: black;
  background-color: transparent;

  .dark-theme & {
    border: 2px solid white;
    color: white;
  }
}
</style>
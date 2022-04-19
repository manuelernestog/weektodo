<template>
  <div
    class="header-menu-icons"
    type="button"
    data-bs-toggle="dropdown"
    data-bs-auto-close="outside"
  >
    <i
      id="btnRepeatingEvent"
      :class="{ 'bi-arrow-clockwise': !selectedTime, 'bi-arrow-repeat': selectedTime }"
    ></i>
  </div>

  <ul
    class="dropdown-menu repeating-event-dropdown"
    aria-labelledby="btnRepeatingEvent"
  >
    <div class="mx-3 d-flex flex-column drop-container">

  <select  class="form-select"  aria-label="Default select example" >
      <option value="en">No repetir</option>
      <option value="es">Diario</option>
      <option value="fr">Semanal</option>
      <option value="de">Mensual</option>
      <option value="it">Anual</option>
  </select>

  <div class="d-flex align-items-center justify-content-between">
  <label class="opacity-50">{{ $t("todoDetails.interval") }}</label>
  <input type="number" class="form-control lex-shrink-1 counter" value="1">
  </div>

<select  class="form-select"  aria-label="Default select example" >
      <option value="">{{ $t("todoDetails.indefinitely") }}</option>
      <option value="ocurrence">{{ $t("todoDetails.occurrences") }}</option>
      <option value="date">{{ $t("todoDetails.untilDate") }} </option>
  </select>
   
  <input type="date" class="form-control last-input" >

<div class="d-flex flex-row re-form-row">
<button type="button" class="btn flex-fill">{{ $t("todoDetails.cancel") }}</button>
<button type="button" class="btn flex-fill">{{ $t("todoDetails.done") }}</button>
</div>

    </div>
  </ul>
</template>

<script>
export default {
  name: "RepatingEvent",
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

.repeating-event-dropdown {
margin-left: -80px !important;
width: 200px;
}

.drop-container > *{
 margin-top: 10px;
 font-size: 15px
}

.counter{
  width: 60px;
    border: none;
    border-bottom: 1px solid #ced4da;
    border-radius: unset;
    padding: unset;
}

.last-input{
    border: none;
    border-bottom: 1px solid #ced4da;
    border-radius: unset;
    padding: 5ps;

}

.form-control:focus, .form-select:focus{
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
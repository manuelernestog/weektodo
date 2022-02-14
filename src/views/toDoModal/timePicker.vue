<template>
  <i id="btnTaskTimePicker"
     class="header-menu-icons bi-clock " type="button"
     data-bs-toggle="dropdown"
     data-bs-auto-close="outside"
  ></i>

  <ul class="dropdown-menu color-picker-dropdown" aria-labelledby="btnTaskTimePicker">
    <div class="d-flex align-items-center mx-3">
      <input type="time" v-model="selectedTime" @blur="selectTime(selectedTime)">
      <i class="header-menu-icons bi-trash" type="button" @click="clearTime"></i>
    </div>
  </ul>
</template>

<script>

    export default {
        name: "timePicker",
        emits: ['timeSelected'],
        data() {
            return {
                colorPicker: "",
                selectedTime: "",
            }
        },
        props: {
            time: {required: true, type: String},
        },
        methods: {
            selectTime(time) {
                this.$emit('timeSelected', time);
            },
            updateBtnShape(time) {
                if (time == null) {
                    document.getElementById('btnTaskTimePicker').classList.remove("bi-clock-fill");
                    document.getElementById('btnTaskTimePicker').classList.add("bi-clock");
                } else {
                    document.getElementById('btnTaskTimePicker').classList.add("bi-clock-fill");
                    document.getElementById('btnTaskTimePicker').classList.remove("bi-clock");
                }
            },
            clearTime() {
                this.selectedTime = null;
                this.selectTime(this.selectedTime);
            }
        },
        watch: {
            time: function (newVal) {
                this.selectedTime = newVal;
                this.updateBtnShape(newVal);
            }
        }
    }
</script>

<style scoped lang="scss">

  @import "/src/assets/style/globalVars.scss";

  .header-menu-icons {
    margin-left: 1px;
    @include btn-icon;
  }

  .color-picker-dropdown {
    min-width: 7rem;
    margin-left: -36px !important;

    i {
      margin-right: 0px;

    }
  }

</style>
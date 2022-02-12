<template>
  <i id="btnTaskTimePicker"
     class="header-menu-icons bi-alarm " type="button"
     data-bs-toggle="dropdown"
     data-bs-auto-close="outside"
  ></i>

  <ul class="dropdown-menu color-picker-dropdown" aria-labelledby="btnTaskTimePicker">
<!--    <div class="d-flex align-items-center">-->
<!--      <i class="bi-circle header-menu-icons" type="button" @click="selectColor('none')"></i>-->
<!--      <i class="bi-circle-fill header-menu-icons" type="button" @click="selectColor('#77e785')"-->
<!--         style="color: #77e785"></i>-->
<!--      <i class="bi-circle-fill header-menu-icons" type="button" @click="selectColor('#ed544b')"-->
<!--         style="color: #ed544b"></i>-->
<!--    </div>-->
<!--    <div>-->
<!--      <i class="bi-circle-fill header-menu-icons" type="button" @click="selectColor('#5e6ef2')"-->
<!--         style="color: #5e6ef2"></i>-->
<!--      <i class="bi-circle-fill header-menu-icons" type="button" @click="selectColor('#f9d54a')"-->
<!--         style="color: #f9d54a"></i>-->
<!--      <i class="bi-circle-fill header-menu-icons" type="button" @click="selectColor('#ed56a1')"-->
<!--         style="color: #ed56a1"></i>-->
<!--    </div>-->
  </ul>
</template>

<script>

    export default {
        name: "timePicker",
        emits: ['ColorSelected'],
        data() {
            return {
                colorPicker: "",
                // todo: {text: "", checked: false, desc: "", subTaskList: []},
            }
        },
        props: {
            color: {required: true, type: String},
        },
        methods: {
            selectColor(color) {
                this.$emit('ColorSelected', color);
            },
            updateBtnShape(color) {
                if (color == "none") {
                    document.getElementById('btnTaskTimePicker').classList.remove("bi-circle-fill");
                    document.getElementById('btnTaskTimePicker').classList.add("bi-circle");
                } else {
                    document.getElementById('btnTaskTimePicker').classList.add("bi-circle-fill");
                    document.getElementById('btnTaskTimePicker').classList.remove("bi-circle");
                }
            }
        },
        watch: {
            color: function (newVal) {
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
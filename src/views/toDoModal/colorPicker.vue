<template>
  <div class="dropdown-center">
    <i id="btnTaskColorPicker" class="header-menu-icons bi-circle-fill" type="button" data-bs-toggle="dropdown"
      :style="'color: ' + color" :title="$t('todoDetails.color')"></i>

    <ul class="dropdown-menu color-picker-dropdown px-2" aria-labelledby="btnTaskTimePicker">
      <div class="d-flex align-items-center">
        <i class="bi-circle colors-menu-icons" type="button" @click="selectColor('none')"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#77e785')"
          style="color: #77e785"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#06b6d4')"
          style="color: #06b6d4"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#5e6ef2')"
          style="color: #5e6ef2"></i>
      </div>
      <div>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#8b5cf6')"
          style="color: #8b5cf6"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#ed56a1')"
          style="color: #ed56a1"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#ed544b')"
          style="color: #ed544b"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#f97316')"
          style="color: #f97316"></i>
      </div>
      <div>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#f9d54a')"
          style="color: #f9d54a"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#ba7956')"
          style="color: #ba7956"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#6b7280')"
          style="color: #6b7280"></i>
        <i class="bi-circle-fill colors-menu-icons" type="button" @click="selectColor('#030712')"
          style="color: #030712"></i>
      </div>

    </ul>
  </div>
</template>

<script>

export default {
  name: "colorPicker",
  emits: ['ColorSelected'],
  data() {
    return {
      colorPicker: "",
      // todo: {text: "", checked: false, desc: "", subTaskList: []},
    }
  },
  props: {
    color: { required: true, type: [String, null] },
  },
  methods: {
    selectColor(color) {
      this.$emit('ColorSelected', color);
    },
    updateBtnShape(color) {
      if (color == "none") {
        document.getElementById('btnTaskColorPicker').classList.remove("bi-circle-fill");
        document.getElementById('btnTaskColorPicker').classList.add("bi-circle");
      } else {
        document.getElementById('btnTaskColorPicker').classList.add("bi-circle-fill");
        document.getElementById('btnTaskColorPicker').classList.remove("bi-circle");
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
  margin-left: 6px;
  @include btn-icon;
}

.colors-menu-icons {
  margin-left: 1px;
  @include btn-icon;
}

.color-picker-dropdown {
  min-width: 7rem;

  i {
    margin-right: 0px;
  }
}
</style>
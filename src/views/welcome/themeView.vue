<template>
  <div class="row" >
    <div class="col-md-4">
      <div class="icon-container">
        <i class="bi-circle-half"></i>
      </div>
    </div>
    <div class="col-md-8">
      <div>
        <h4> {{ $t('welcome.theme') }}</h4>
        <text> {{ $t('welcome.themeText') }}
        </text>
        <div style="padding-left: 50px;" class="pt-4">
          <label class="form-check-label"><i class="bi-sun"></i></label>
          <div class="form-check form-switch form-check-inline">
            <input class="form-check-input" type="checkbox" v-model="darkTheme"
              @change="changeDarkTheme">
          </div>
          <label class="form-check-label"><i class="bi-moon-stars"></i></label>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex btn-footer mt-3">
    <button type="button" class="btn flex-fill" @click="back"><i class="bi-chevron-double-left"></i>
      {{ $t('welcome.back') }}
    </button>
    <button type="button" class="btn flex-fill" @click="next">{{ $t('welcome.next') }} <i
        class="bi-chevron-double-right"></i></button>
  </div>

</template>

<script>
import configRepository from "../../repositories/configRepository";
import isElectron from "is-electron";

export default {
  name: "languageView",
  data() {
    return {
      darkTheme: this.$store.getters.config.darkTheme
    }
  },
  methods: {
    changeDarkTheme: function () {
      this.$nextTick(function () {
        this.$store.commit('updateConfig', { val: this.darkTheme, key: "darkTheme" });
        configRepository.update(this.$store.getters.config);
      });
    },
    next: function () {
      if (isElectron()) {
        document.getElementById('welcome-2-1-tab').click();
      } else {
        document.getElementById('welcome-3-tab').click();
      }
    },
    back: function () {
      document.getElementById('welcome-1-tab').click();
    }
  }
}
</script>

<style scoped>
.form-check-input {
  width: 2.8em !important;
  height: 1.4em !important;
}

.bi-sun {
  margin-right: 40px;
  color: #383a3b;
}


.bi-moon-stars {
  margin-left: 20px;
  color: #d3d5d8;
}

.form-check-label i {
  font-size: 2rem;
  /*margin: 5px;*/
}

.icon-container i {
  font-size: 6rem;
  background: -webkit-linear-gradient(180deg, rgba(89, 66, 141, 1) 0%, rgba(114, 78, 156, 1) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .icon-container i {
  color: #f3f3f3;
  background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icon-container {
  margin-top: 20px;
  margin-left: 20px;
}

.btn-footer {
  border-top: 1px solid #dee2e6;
  padding-top: 6px
}

.dark-theme .btn-footer {
  border-top: 1px solid #999da1;
}
</style>
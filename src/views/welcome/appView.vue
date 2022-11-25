<template>
  <div class="row">
    <div class="col-md-4">
      <div class="icon-container">
        <i class="bi-app-indicator"></i>
      </div>
    </div>
    <div class="col-md-8">
      <div>
        <h4> {{ $t('settings.settings') }}</h4>

        <div class="p-2">
          <div class="form-check form-switch d-flex px-1 mb-3 justify-content-between align-items-center">
            <label class="form-check-label" for="welcomeOpenOnStartup">{{
                $t("settings.openOnStartup")
            }}</label>
            <input class="form-check-input mx-3" type="checkbox" id="welcomeOpenOnStartup" v-model="openOnStartup"
              @change="setOpenOnStart()" />
          </div>
          <div class="form-check form-switch d-flex px-1 mb-3 justify-content-between align-items-center">
            <label class="form-check-label" for="wlcomeRunInBackground">
              <span>
                {{ $t("settings.runInBackground") }}
                <sup>
                  <i class="bi-info-circle" style="cursor: help" :title="$t('settings.runInBackgroundInfo')"> </i>
                </sup>
              </span>
            </label>
            <input class="form-check-input mx-3" type="checkbox" id="wlcomeRunInBackground" v-model="runInBackground"
              @change="setRunInBackground()" />
          </div>
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

export default {
  name: "languageView",
  data() {
    return {
      openOnStartup: this.$store.getters.config.openOnStartup,
      runInBackground: this.$store.getters.config.openOnStartup
    }
  },
  methods: {
    setOpenOnStart: function () {
      this.$nextTick(function () {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('set-open-on-startup', this.openOnStartup);
        this.$store.commit('updateConfig', { val: this.openOnStartup, key: "openOnStartup" });
        configRepository.update(this.$store.getters.config);
      });
    },
    setRunInBackground: function () {
      this.$nextTick(function () {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('set-run-in-background', this.runInBackground);
        this.$store.commit('updateConfig', { val: this.runInBackground, key: "runInBackground" });
        configRepository.update(this.$store.getters.config);
      });
    },
    next: function () {
      document.getElementById('welcome-3-tab').click();
    },
    back: function () {
      document.getElementById('welcome-2-tab').click();
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
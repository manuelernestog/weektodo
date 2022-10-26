<template>
  <div class="row">
    <div class="col-md-4">
      <div class="icon-container">
        <i class="bi-exclamation-triangle"></i>
      </div>
    </div>
    <div class="col-md-8">
      <div>
        <h4> {{ $t('welcome.privacy') }}</h4>
        <div class="mb-1">{{ $t('welcome.privacyText') }}</div>
        <span class="sub-header">{{ $t('welcome.privacySub') }} </span>
      </div>
      <div class="form-check form-switch d-flex px-1 mt-3 mb-0 align-items-center justify-content-center">
        <label class="form-check-label" for="sendReportErrors">{{ $t("settings.reportErrors")
        }}</label>
        <input class="form-check-input mx-3" type="checkbox" id="sendReportErrors" v-model="reportErrors" @change="changeSendErrors()" />
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
  name: "backupView",
  data() {
    return {
      reportErrors: this.$store.getters.config.reportErrors
    }
  },
  methods: {
    changeSendErrors: function () {
      this.$nextTick(function () {
        this.$store.commit('updateConfig', { val: this.reportErrors, key: "reportErrors" });
        configRepository.update(this.$store.getters.config);
      });
    },
    next: function () {
      document.getElementById('welcome-4-tab').click();
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
  margin-right: 15px;
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

.sub-header {
  font-size: 0.9rem;
  font-style: italic;
}

.sub-header i {
  margin-left: 5px;
}
</style>
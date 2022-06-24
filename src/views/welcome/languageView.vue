<template>
  <div class="row" style="height: 170px">
    <div class="col-md-4">
      <img class="logo info-image" src="WeekToDo-Logo-Color.svg" alt="WeekToDo" title="WeekToDo Logo" width="110">
    </div>
    <div class="col-md-8">
      <div>
        <h4> {{ $t('welcome.welcome') }}</h4>
        <text> {{ $t('welcome.welcomeText') }}</text>
        <div>
          <label for="language" class="form-label"></label>
          <select id="language" class="col-sm-9 form-select" aria-label="Default select example" v-model="language"
            @change="changeLanguage">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsche</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="ru">русский</option>
            <option value="ja">日本</option>
            <option value="pl">Polski</option>
            <option value="ar">عرب</option>
            <option value="zh_cn">简体中文</option>
            <option value="zh_tw">繁體中文</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex btn-footer">
    <button type="button" class="btn flex-fill invisible"><i class="bi-chevron-double-left"></i>
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
      language: this.$store.getters.config.language
    }
  },
  methods: {
    changeLanguage: function () {
      this.$nextTick(function () {
        this.$store.commit('updateConfig', { val: this.language, key: "language" });
        configRepository.update(this.$store.getters.config);
        this.$i18n.locale = this.language;
      });
    },
    next: function () {
      document.getElementById('welcome-2-tab').click();
    }
  }
}
</script>

<style scoped>
.info-image {
  margin-top: 20px;
  margin-left: 10px;
}

.btn-footer {
  border-top: 1px solid #dee2e6;
  padding-top: 6px
}

.dark-theme .btn-footer {
  border-top: 1px solid #999da1;
}

.form-select:focus {
  box-shadow: none;
}
</style>
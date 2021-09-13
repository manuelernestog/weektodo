<template>
  <div class="modal  fade" id="configModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t("settings.settings") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="mb-4">
            <label for="language" class="form-label">{{ $t("settings.language") }}:</label>
            <select id="language" class="col-sm-9 form-select" aria-label="Default select example" v-model="language"
                    @change="changeConfig('language',language)">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsche</option>
              <option value="pt">Português</option>
              <option value="ru">русский</option>
              <option value="zh_cn">中國人</option>
            </select>
          </div>
          <div class="mb-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="calendarSetting" v-model="calendar"
                     @change="changeConfig('calendar',calendar)">
              <label class="form-check-label" for="calendarSetting">{{ $t("settings.calendar") }}</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="customListsSetting" v-model="customList"
                     @change="changeConfig('customList',customList)">
              <label class="form-check-label" for="customListsSetting">{{ $t("settings.customLists") }}</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="darkThemeSetting" v-model="darkTheme"
                     @change="changeConfig('darkTheme',darkTheme)">
              <label class="form-check-label" for="darkThemeSetting">{{ $t("settings.darkTheme") }}</label>
            </div>
          </div>
          <div v-if="isElectron()" class="mb-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="updatesCheckSetting" v-model="checkUpdates"
                     @change="changeConfig('checkUpdates',checkUpdates)">
              <label class="form-check-label" for="updatesCheckSetting">{{ $t("settings.checkUpdates") }}</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="">
              <label for="columnsConfig" class="form-label">{{ $t("settings.columns") }}: {{columns}}</label>
              <input type="range" class="form-range" min="1" max="12" id="columnsConfig" v-model="columns"
                     @change="changeConfig('columns',columns)">
            </div>
          </div>
          <div class="mb-3">
            <div class="">
              <label for="zoomConfig" class="form-label">{{ $t("settings.zoom") }}: {{zoom}}%</label>
              <input type="range" class="form-range" min="50" max="200" id="zoomConfig" step="5" v-model="zoom" @change="changeConfig('zoom',zoom)">
            </div>
          </div>
          <div class="horizontal-divider mb-4 mt-4"></div>
          <div>
            <label for="language" class="form-label">{{ $t("settings.backup") }}</label>
            <div class="modal-footer d-flex">
              <button type="button" class="btn flex-fill" @click="exportData"><i
                class="icons bi-cloud-arrow-down-fill"></i> {{ $t("settings.export") }}
              </button>
              <button type="button" class="btn flex-fill" @click="$refs.loadData.click"><i
                class="icons bi-cloud-arrow-up-fill"></i> {{ $t("settings.import") }}
              </button>
            </div>
            <input type="file" id="file-selector" class="d-none" accept=".wtdb" ref="loadData"
                   @change="importData($event)">
          </div>
        </div>
      </div>
    </div>

    <toast-message ref="invalidFile" id="invalidFile" text="$t('settings.invalidFile')"></toast-message>
  </div>
</template>

<script>
    import configRepository from "../repositories/configRepository";
    import toastMessage from "../components/toastMessage";
    import exportTool from "../helpers/exportTool";

    export default {
        name: "configModal",
        components: {toastMessage},
        data() {
            return {
                customList: this.$store.getters.config.customList,
                darkTheme: this.$store.getters.config.darkTheme,
                language: this.$store.getters.config.language,
                checkUpdates: this.$store.getters.config.checkUpdates,
                calendar: this.$store.getters.config.calendar,
                columns: this.$store.getters.config.columns,
                zoom: this.$store.getters.config.zoom,
            }
        },
        methods: {
            changeConfig: function (key, val) {
                this.$nextTick(function () {
                    this.$store.commit('updateConfig', {val: val, key: key});
                    configRepository.update(this.$store.getters.config);
                    if (key === "language") this.$i18n.locale = this.language;
                    if (key === "columns") {
                        setTimeout(function () {
                            this.$emit('changeColumns')
                        }.bind(this), 50);
                    }
                });
            },
            exportData: function () {
                exportTool.export();
            },
            importData: function (event) {
                exportTool.import(event);
            },
            isElectron: function () {
                let isElectron = require("is-electron");
                return isElectron();
            },

        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/style/globalVars";

  .form-check-input {
    width: 2.8em !important;
    height: 1.4em !important;
  }

  .form-check-label {
    width: 220px;
  }

  .icons {
    font-size: 20px;
    margin-right: 5px;
  }

  .form-check-label {
    margin-left: 10px;
    padding-top: 5px;
  }

  .dark-theme .form-select {
    background-color: #15161e;
    border: 1px solid #30363d;
    color: #c9d1d9;
  }

  .form-select:focus {
    box-shadow: none;
  }

  .modal-dialog {
    max-width: 350px;
  }


  .form-range::-webkit-slider-thumb {
    background: $check-color;
  }

  .form-range::-webkit-slider-thumb {
    background: $check-color;
  }

  .form-range::-ms-thumb {
    background: $check-color;
  }


</style>
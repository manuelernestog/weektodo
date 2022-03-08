<template>
  <div
    class="modal fade"
    id="configModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("settings.settings") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <ul
            class="nav nav-tabs"
            id="confTab"
            role="tablist"
            style="display: none"
          >
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="config-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#config-home"
                role="tab"
              >
                Home
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="config-general-tab"
                data-bs-toggle="tab"
                data-bs-target="#config-general"
                role="tab"
              >
                General
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="config-display-tab"
                data-bs-toggle="tab"
                data-bs-target="#config-display"
                role="tab"
              >
                Display
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="config-notifications-tab"
                data-bs-toggle="tab"
                data-bs-target="#config-notifications"
                role="tab"
              >
                Notifications
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="config-data-tab"
                data-bs-toggle="tab"
                data-bs-target="#config-data"
                role="tab"
              >
                Data
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="config-language-tab"
                data-bs-toggle="tab"
                data-bs-target="#config-language"
                role="tab"
              >
                Language
              </button>
            </li>
          </ul>

          <div class="tab-content" id="confTab-content">
            <div class="tab-pane fade show active" id="config-home">
              <link-list :linkList="configLinks"></link-list>
            </div>
            <div class="tab-pane fade" id="config-general">
              <div class="d-flex flex-column mt-2 h-100">
                <div
                  class="
                    form-check form-switch
                    d-flex
                    px-1
                    mb-3
                    justify-content-between
                  "
                >
                  <label
                    class="form-check-label flex-fill"
                    for="calendarSetting"
                    >{{ $t("settings.calendar") }}</label
                  >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="calendarSetting"
                    v-model="calendar"
                    @change="changeConfig('calendar', calendar)"
                  />
                </div>

                <div
                  class="
                    form-check form-switch
                    d-flex
                    px-1
                    mb-3
                    justify-content-between
                  "
                >
                  <label
                    class="form-check-label flex-fill"
                    for="customListsSetting"
                    >{{ $t("settings.customLists") }}</label
                  >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="customListsSetting"
                    v-model="customList"
                    @change="changeConfig('customList', customList)"
                  />
                </div>

                <div
                  v-if="isElectron()"
                  class="
                    form-check form-switch
                    d-flex
                    px-1
                    mb-3
                    justify-content-between
                  "
                >
                  <label class="form-check-label" for="updatesCheckSetting">{{
                    $t("settings.checkUpdates")
                  }}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="updatesCheckSetting"
                    v-model="checkUpdates"
                    @change="changeConfig('checkUpdates', checkUpdates)"
                  />
                </div>

                <div
                  v-if="isElectron()"
                  class="
                    form-check form-switch
                    d-flex
                    px-1
                    mb-3
                    justify-content-between
                  "
                >
                  <label class="form-check-label" for="openOnStart">{{
                    $t("settings.openOnStartup")
                  }}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="openOnStart"
                    v-model="openOnStart"
                    @change="setOpenOnStart()"
                  />
                </div>
                <button class="btn mt-3" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="config-display">
              <div class="d-flex flex-column mt-2 h-100">
                <div class="px-1 mb-3">
                  <label for="columnsConfig" class="form-check-label"
                    >{{ $t("settings.columns") }}: {{ columns }}</label
                  >
                  <input
                    type="range"
                    class="form-range mt-2 px-2"
                    min="1"
                    max="12"
                    id="columnsConfig"
                    v-model="columns"
                    @change="changeConfig('columns', columns)"
                  />
                </div>

                <div class="px-1 mb-3">
                  <label for="zoomConfig" class="form-check-label"
                    >{{ $t("settings.zoom") }}: {{ zoom }}%</label
                  >
                  <input
                    type="range"
                    class="form-range mt-2 px-2"
                    min="50"
                    max="200"
                    id="zoomConfig"
                    step="5"
                    v-model="zoom"
                    @change="changeConfig('zoom', zoom)"
                  />
                </div>

                <div class="horizontal-divider mb-3"></div>

                <div
                  class="
                    form-check form-switch
                    d-flex
                    px-1
                    mb-3
                    justify-content-between
                  "
                >
                  <label class="form-check-label" for="darkThemeSetting">{{
                    $t("settings.darkTheme")
                  }}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="darkThemeSetting"
                    v-model="darkTheme"
                    @change="changeConfig('darkTheme', darkTheme)"
                  />
                </div>
                <button class="btn mt-3" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="config-notifications">
              <div class="d-flex flex-column mt-3 h-100">
                - Mostrar recordatorio al iniciar (solo para electron) - Sonido
                de notificaciones
                <button class="btn mt-3" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="config-data">
              <div class="d-flex flex-column mt-2 h-100">
                <div>
                  <div>
                    <button
                      type="button"
                      class="btn w-100 py-2"
                      @click="exportData"
                    >
                      <i class="icons bi-cloud-arrow-down"></i>
                      {{ $t("settings.exportBackup") }}
                    </button>
                    <button
                      type="button"
                      class="btn w-100 py-2"
                      @click="$refs.loadData.click"
                    >
                      <i class="icons bi-cloud-arrow-up"></i>
                      {{ $t("settings.importBackup") }}
                    </button>
                    <div class="horizontal-divider mt-2 mb-2"></div>
                    <button
                      type="button"
                      class="btn w-100 py-2"
                      @click="clearData"
                    >
                      <i class="icons bi-x-octagon-fill" style="color: #ed544b"></i>
                      {{ $t("settings.clearData") }}
                    </button>
                     <div class="horizontal-divider mt-2 mb-2"></div>
                  </div>
                  <input
                    type="file"
                    id="file-selector"
                    class="d-none"
                    accept=".wtdb"
                    ref="loadData"
                    @change="importData($event)"
                  />
                </div>

                <button class="btn mt-3" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="config-language">
              <div class="d-flex flex-column mt-2 h-100">
                <label for="language" class="form-label"
                  >{{ $t("settings.language") }}:</label
                >
                <select
                  id="language"
                  class="col-sm-9 form-select"
                  aria-label="Default select example"
                  v-model="language"
                  @change="changeConfig('language', language)"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsche</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                  <option value="ru">русский</option>
                  <option value="pl">Polski</option>
                  <option value="ar">عرب</option>
                  <option value="zh_cn">中國人</option>
                </select>

                <button class="btn mt-3" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <toast-message
      ref="invalidFile"
      id="invalidFile"
      text="$t('settings.invalidFile')"
    ></toast-message>
  </div>
</template>

<script>
import configRepository from "../repositories/configRepository";
import toastMessage from "../components/toastMessage";
import exportTool from "../helpers/exportTool";
import linkList from "../components/linkList";
import configList from "./configList";

export default {
  name: "configModal",
  components: { toastMessage, linkList },
  data() {
    return {
      customList: this.$store.getters.config.customList,
      darkTheme: this.$store.getters.config.darkTheme,
      language: this.$store.getters.config.language,
      checkUpdates: this.$store.getters.config.checkUpdates,
      calendar: this.$store.getters.config.calendar,
      columns: this.$store.getters.config.columns,
      zoom: this.$store.getters.config.zoom,
      openOnStart: true,
    };
  },
  mounted() {
    if (this.isElectron()) {
      this.isOpenOnStart();
    }
  },
  methods: {
    changeConfig: function (key, val) {
      this.$nextTick(function () {
        this.$store.commit("updateConfig", { val: val, key: key });
        configRepository.update(this.$store.getters.config);
        if (key === "language") this.$i18n.locale = this.language;
        if (key === "columns") {
          setTimeout(
            function () {
              this.$emit("changeColumns");
            }.bind(this),
            50
          );
        }
      });
    },
    exportData: function () {
      exportTool.export();
    },
    importData: function (event) {
      exportTool.import(event);
    },
    clearData: function () {
      exportTool.clear();
    },
    isElectron: function () {
      let isElectron = require("is-electron");
      return isElectron();
    },
    goHome: function () {
      document.getElementById("config-home-tab").click();
    },
    setOpenOnStart: function () {
      let AutoLaunch = require("auto-launch");
      let autoLauncher = new AutoLaunch({
        name: "WeekToDo Planner",
      });
      if (this.openOnStart) {
        autoLauncher.enable();
      } else {
        autoLauncher.disable();
      }
    },
    isOpenOnStart: function () {
      let AutoLaunch = require("auto-launch");
      let autoLauncher = new AutoLaunch({
        name: "WeekToDo Planner",
      });

      autoLauncher
        .isEnabled()
        .then(
          function (isEnabled) {
            this.openOnStart = isEnabled;
          }.bind(this)
        )
        .catch(function (err) {
          throw err;
        });
    },
  },
  computed: {
    configLinks: function () {
      return configList.configList(this);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style/globalVars";

.form-check-input {
  width: 2.8em !important;
  height: 1.4em !important;
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
  max-width: 320px;
  height: 200px;
}

.form-range::-webkit-slider-thumb {
  background: $check-color;
  .dark-theme & {
    background: $dt-check-color;
  }
}

.form-range::-webkit-slider-thumb {
  background: $check-color;
  .dark-theme & {
    background: $dt-check-color;
  }
}

.form-range::-ms-thumb {
  background: $check-color;
  .dark-theme & {
    background: $dt-check-color;
  }
}

.form-switch label {
  max-width: 170px;
}
</style>
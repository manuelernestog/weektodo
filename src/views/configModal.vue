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
                    @change="changeLanguage">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div class="mb-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="customListsSetting" v-model="customList"
                     @change="changeCustomList">
              <label class="form-check-label" for="customListsSetting">{{ $t("settings.customLists") }}</label>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="darkThemeSetting" v-model="darkTheme"
                     @change="changeDarkTheme">
              <label class="form-check-label" for="darkThemeSetting">{{ $t("settings.darkTheme") }}</label>
            </div>
          </div>
          <div class="horizontal-divider mb-4"></div>
          <div>
            <label for="language" class="form-label">Copia de Seguridad:</label>
            <div class="modal-footer d-flex">
              <button type="button" class="btn flex-fill" @click="exportData"><i
                class="icons bi-cloud-arrow-down-fill"></i> Exportar
              </button>
              <button type="button" class="btn flex-fill" @click="$refs.loadData.click"><i
                class="icons bi-cloud-arrow-up-fill"></i> Importar
              </button>
            </div>
            <input type="file" id="file-selector" class="d-none" accept=".wtdb" ref="loadData"
                   @change="importData($event)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import configRepository from "../repositories/configRepository";
    import storageRepository from "../repositories/storageRepository";

    export default {
        name: "configModal",
        data() {
            return {
                customList: this.$store.state.config.customList,
                darkTheme: this.$store.state.config.darkTheme,
                language: this.$store.state.config.language
            }
        },
        methods: {
            changeCustomList: function () {
                this.$nextTick(function () {
                    this.$store.commit('updateConfigCustomList', this.customList);
                    configRepository.update(this.$store.state.config);
                });
            },
            changeDarkTheme: function () {
                this.$nextTick(function () {
                    this.$store.commit('updateConfigDarkTheme', this.darkTheme);
                    configRepository.update(this.$store.state.config);
                });
            },
            changeLanguage: function () {
                this.$nextTick(function () {
                    this.$store.commit('updateConfigLanguage', this.language);
                    configRepository.update(this.$store.state.config);
                    this.$i18n.locale = this.language;
                });
            },
            exportData: function () {
                var filename = "WeekToDoBackup.wtdb";
                var fileBody = storageRepository.as_json();

                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileBody));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            },
            importData: function (event) {
                const fileList = event.target.files;
                if (fileList[0]) {
                    var fr = new FileReader();
                    fr.readAsText(fileList[0]);
                    fr.onload = function () {
                        var data = JSON.parse(fr.result);
                        storageRepository.clean();
                        storageRepository.load_json(data);
                        location.reload();
                    }
                }
            }
        }
    }
</script>

<style scoped>
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
    max-width: 350px;
  }


</style>
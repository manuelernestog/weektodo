<template>
  <div class="modal  fade" id="configModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t("message.settings") }}</h5>
          <!--          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="mb-5">
            <label for="language" class="form-label">Language</label>
            <select id="language" class="col-sm-9 form-select" aria-label="Default select example" v-model="language"
                    @change="changeLanguage">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div class="d-flex">
            <div class="form-check form-switch flex-fill">
              <input class="form-check-input" type="checkbox" id="customListsSetting" v-model="customList"
                     @change="changeCustomList">
              <label class="form-check-label" for="customListsSetting">Custom Lists</label>
            </div>
            <div class="form-check form-switch flex-fill">
              <input class="form-check-input" type="checkbox" id="darkThemeSetting" v-model="darkTheme"
                     @change="changeDarkTheme">
              <label class="form-check-label" for="darkThemeSetting">Dark Theme</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import configRepository from "../../repositories/configRepository";

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
            }
        }
    }
</script>

<style scoped>
  .form-check-input {
    width: 2.8em !important;
    height: 1.4em !important;
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

</style>
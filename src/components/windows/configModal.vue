<template>
  <div class="modal  fade" id="configModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Settings</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-5">
            <label for="exampleFormControlInput1" class="form-label">Language</label>
            <select id="exampleFormControlInput1" class="col-sm-9 form-select" aria-label="Default select example">
              <option value="En">English</option>
              <option value="Es">Español</option>
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
                darkTheme: this.$store.state.config.darkTheme
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
                    console.log(this.$store.state.config);
                    configRepository.update(this.$store.state.config);
                });
            }
        }
    }
</script>

<style scoped>
  .modal-content {
    border: none;
    border-radius: 0.5rem;
    padding: 0px 20px 10px 20px;
  }

  .modal-header {
    /*border-bottom: none;*/
  }

  .btn-close:hover {
    color: black;
  }

  .dark-theme .btn-close {
    color: #c9d1d9;
  }

  .dark-theme .btn-close:hover {
    color: white;
  }


  .btn-close:focus {
    box-shadow: none;
  }

  .form-check-input {
    width: 2.8em !important;
    height: 1.4em !important;
  }

  .form-check-label {
    margin-left: 10px;
    padding-top: 5px;
  }

  .dark-theme .modal-content {
    background-color: #21262d;
    border: 1px solid #30363d;
  }
</style>
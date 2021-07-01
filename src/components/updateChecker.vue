<template>
  <div class="modal  fade" id="changeLogModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t("ui.changeLog") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">

          <div v-for="(changes,version) in changes" :key="version">
            <h6 class="mb-2"><b>v{{version.split('-')[0]}} </b>
              <span style="font-size: 0.85rem; opacity: .4; margin-left: 5px;" >
                {{moments(version.split('-')[1]).locale(language).format('LL')}}
              </span>
            </h6>
            <ul class="">
              <li v-for="change in changes" :key="change">
                {{change}}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>

  <toast-message id="versionChanges" :text="$t('ui.softwareUpdated')" :sub-text="$t('ui.seeChanges')"
                 @subTextClick="seeChangeLog"></toast-message>

  <toast-message id="newVersionAvailable" :text="$t('ui.newVersionAvailable')" :sub-text="$t('ui.download')"
                 @subTextClick="downloadNewVersion"></toast-message>
</template>

<script>
    import version_json from '../../public/version.json'
    import configRepository from "../repositories/configRepository";
    import toastMessage from "./toastMessage";
    import {Toast, Modal} from 'bootstrap';
    import moment from 'moment'

    export default {
        name: "updateCheck",
        components: {
            toastMessage
        },
        data() {
            return {
                changes: this.getChangeLogs()
            }
        },
        mounted() {
            setTimeout(function () {
                if (version_json.version != this.$store.state.config.version) {
                    this.$store.commit('updateConfigVersion', version_json.version);
                    configRepository.update(this.$store.state.config);
                    var toast = new Toast(document.getElementById('versionChanges'));
                    toast.show();
                }
                if (this.isElectron() && this.$store.state.config.checkUpdates ) {
                    const axios = require('axios').default;
                    axios
                        .get('https://weektodo-app.netlify.app/version.json')
                        .then(response => (this.showNewVersionToast(response)))
                }
            }.bind(this), 5000);
        },
        methods: {
            seeChangeLog: function () {
                let modal = new Modal(document.getElementById('changeLogModal'));
                modal.show();
            },
            getChangeLogs: function () {
                if (version_json.changes[this.$store.state.config.language]) {
                    return version_json.changes[this.$store.state.config.language]
                } else {
                    return version_json.changes['en']
                }

            },
            moments: function (date) {
                return moment(date);
            },

            isElectron: function () {
                let isElectron = require("is-electron");
                return isElectron();
            },
            showNewVersionToast: function (response) {
                if (response.data.version != version_json.version){
                    var toast = new Toast(document.getElementById('newVersionAvailable'));
                    toast.show();
                }
            },
            downloadNewVersion: function () {
                let isElectron = require("is-electron");
                if (isElectron()) {
                    require('electron').shell.openExternal('https://weektodo.netlify.app', '_blank');
                } else {
                    window.open('https://weektodo.netlify.app', '_blank');
                }
            }
        },
        computed: {
            language: function () {
                return this.$store.state.config.language;
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 400px;
  }
</style>
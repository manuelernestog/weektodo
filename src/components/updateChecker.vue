<template>
  <div class="modal  fade" id="changeLogModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t("ui.changeLog") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">

          <div v-for="(changes, version) in changes" :key="version">
            <h6 class="mb-2"><b>v{{ version.split('-')[0] }} </b>
              <span style="font-size: 0.85rem; opacity: .4; margin-left: 5px;">
                {{ moments(version.split('-')[1]).locale(language).format('LL') }}
              </span>
            </h6>
            <ul class="">
              <li v-for="change in changes" :key="change">
                {{ change }}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import version_json from '../../public/version.json'
import moment from 'moment'

export default {
  name: "updateCheck",
  data() {
    return {
      changes: this.getChangeLogs()
    }
  },
  mounted() {

  },
  methods: {
    getChangeLogs: function () {
      if (version_json.changes[this.$store.getters.config.language]) {
        return version_json.changes[this.$store.getters.config.language]
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
    }
  },
  computed: {
    language: function () {
      return this.$store.getters.config.language;
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  max-width: 400px;
}
</style>
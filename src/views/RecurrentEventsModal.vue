<template>
  <div class="modal fade" id="RecurrentEventsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("ui.recurringTasks") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <table class="table table-hover ">
            <thead>
              <tr>
                <th scope="col">{{ $t("ui.task") }}</th>
                <th scope="col">{{ $t("ui.Frecuency") }}</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in recurringTasks" :key="task.id">
                <td>{{ task.data.text }}</td>
                <td>{{ frecuency(task) }}</td>
                <td><i class="bi-trash mx-2" :title="$t('ui.remove')" @click="removeRecurringTask(task.id)"
                    data-bs-dismiss="modal"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <comfirm-modal :id="'removeReModal'" :title="$t('ui.removeRepeatingTask')" :text="$t('ui.repeatingTaskRemoveConfirm')"
    :ico="'bi-x-circle'" :okText="$t('ui.remove')" @on-ok="removeRepeatingTaskComfirmed"
    @on-cancel="removeRepeatingTaskCanceled"></comfirm-modal>
</template>

<script>
import { Toast, Modal } from "bootstrap";
import repeatingEventHelper from "../helpers/repeatingEvents.js";
import repeatingEventRepository from "../repositories/repeatingEventRepository";
import comfirmModal from "../components/comfirmModal.vue";
import moment from "moment";



export default {
  name: "RecurrentEventsModal",
  components: {
    comfirmModal
  },
  data() {
    return {
      index: 0,
      idToRemove: null
    };
  },
  methods: {
    frecuency: function (task) {
      switch (task.type) {
        case "0":
          return this.$t("todoDetails.yearly") + ' / ' + moment(task.start_date).locale(this.language).format("MMM Do");
        case "1":
          return this.$t("todoDetails.monthly") + ' / ' + moment(task.start_date).locale(this.language).format("Do");
        case "2":
          return this.$t("todoDetails.weekly") + ' / ' + moment(task.start_date).locale(this.language).format("dddd");
        case "3":
          return this.$t("todoDetails.daily");
        case "4":
          return this.$t("todoDetails.weekdays");
        case "5":
          return this.$t("todoDetails.customWeekdays");
      }
    },
    removeRecurringTask: function (id) {
      this.idToRemove = id;
      let modal = new Modal(document.getElementById("removeReModal"), { backdrop: "static", });
      modal.show();
    },
    removeRepeatingTaskComfirmed: function () {
      repeatingEventRepository.remove(this.idToRemove);
      this.$store.commit("removeRepeatingEvent", this.idToRemove);
      this.$store.getters.selectedDates.forEach((date) => {
        repeatingEventHelper.removeGeneratedRepeatingEvents(date, this);
      });
      this.$store.commit("resetRepeatingEventDateCache");
      this.$store.commit("loadRepeatingEventDateCache", this.$store.getters.repeatingEventList);
      let modal = new Modal(document.getElementById("RecurrentEventsModal"));
      modal.show();
      let toast = new Toast(document.getElementById("recurrentTaskRemoved"));
      toast.show();
    },
    removeRepeatingTaskCanceled: function () {
      let modal = new Modal(document.getElementById("RecurrentEventsModal"));
      modal.show();
    },
  },
  computed: {
    recurringTasks: function () {
      return this.$store.getters.repeatingEventList;
    },
    language: function () {
      return this.$store.getters.config.language;
    },
  },
};
</script>

<style scoped lang="scss">
.modal-dialog {
  max-width: 800px;
}

.modal-body {
  height: 400px;
  overflow: auto;
  margin-bottom: 20px;
}

.table {
  --bs-table-hover-bg: #f4f4f4;
  color: #212529;
}

.dark-theme .table {
  --bs-table-bg: #21262d;
  --bs-table-striped-bg: #2c3034;
  --bs-table-striped-color: #fff;
  --bs-table-active-bg: #373b3e;
  --bs-table-active-color: #fff;
  --bs-table-hover-bg: #323539;
  --bs-table-hover-color: #fff;
  color: #fff;
  border-color: #373b3e;
}

.bi-trash {
  cursor: pointer;

  &:hover {
    color: black;
  }

  .dark-theme & {
    color: #babbbe;

    &:hover {
      color: white;
    }
  }
}
</style>

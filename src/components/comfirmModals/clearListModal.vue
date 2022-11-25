<template>
  <comfirm-modal :id="'clearListModal'" :title="$t('ui.clearList')" :text="$t('ui.clearListConfirm')" :ico="'bi-trash'"
    :okText="$t('ui.clear')" @on-ok="clearList">
  </comfirm-modal>
</template>

<script>
import toDoListRepository from "../../repositories/toDoListRepository";
import comfirmModal from "../../components/comfirmModal.vue";
import notifications from "../../helpers/notifications";

export default {
  name: "clearListModal",
  components: {
    comfirmModal
  },
  methods: {
    clearList: function () {
      let listId = this.$store.getters.listToClearId;
      this.$store.commit('clearTodoList', listId);
      toDoListRepository.update(listId, []);
      notifications.refreshDayNotifications(this, listId);
    }
  }
}
</script>
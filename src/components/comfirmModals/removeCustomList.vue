<template>
  <comfirm-modal :id="'customListRemoveModal'" :title="$t('ui.rmList')" :text="$t('ui.rmListConfirm') +' '+ listId+ '?'"
    :ico="'bi-x-circle'" :okText="$t('ui.remove')" @on-ok="removeCustomList">
  </comfirm-modal>
</template>

<script>
import { Modal } from 'bootstrap'
import customToDoListIdsRepository from "../../repositories/customToDoListIdsRepository";
import toDoListRepository from "../../repositories/toDoListRepository";
import comfirmModal from "../../components/comfirmModal.vue";

export default {
  name: "removeCustomList",
  components: {
    comfirmModal
  },
  computed: {
    listId: function () {
      if (this.$store.getters.actions.cListToRmv) {
        return this.$store.getters.actions.cListToRmv.name;
      }
      return null;
    }
  },
  methods: {
    removeCustomList: function () {
      this.$store.commit('removeCustomTodoList', this.$store.getters.actions.cListToRmv);
      var modalEl = document.getElementById('customListRemoveModal');
      var modal = Modal.getInstance(modalEl);
      customToDoListIdsRepository.update(this.$store.getters.cTodoListIds);
      toDoListRepository.remove(this.$store.getters.actions.cListToRmv.id);
      modal.hide();
    }
  }
}
</script>
<template>
  <div class="modal fade" id="customListRemoveModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" style="margin-bottom: 20px">
          <div class="d-flex flex-row">
            <i class="bi-x-circle-fill" style="font-size: 40px; margin-right: 30px;"></i>
            <div style="margin-top: 5px">
              <h6 class="modal-title"> Remove To-do List</h6>
              <text class="modal-title" style="font-size: 0.9rem"> Estas seguro que deseas eliminar la lista
                {{listId}}?
              </text>
            </div>
          </div>
        </div>
        <div class="horizontal-divider"></div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn flex-fill" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn flex-fill" @click="removeCustomList">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {Modal} from 'bootstrap'
    import customToDoListIdsRepository from "../../repositories/customToDoListIdsRepository";
    import toDoListRepository from "../../repositories/toDoListRepository";

    export default {
        name: "removeCustomList",
        computed: {
            listId: function () {
                if (this.$store.state.actions.cListToRmv) {
                    return this.$store.state.actions.cListToRmv.name;
                }
                return null;
            }
        },
        methods: {
            removeCustomList: function () {
                this.$store.commit('removeCustomTodoList', this.$store.state.actions.cListToRmv);
                var modalEl = document.getElementById('customListRemoveModal');
                var modal = Modal.getInstance(modalEl);
                customToDoListIdsRepository.update(this.$store.state.cTodoListIds);
                toDoListRepository.remove(this.$store.state.actions.cListToRmv.id);
                modal.hide();
            }
        }
    }
</script>

<style scoped>

  .modal-content {
    border: none;
    border-radius: 1rem;
    padding: 10px 20px;
  }

</style>
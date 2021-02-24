<template>
  <div class="modal fade" id="customListRemoveModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" style="margin-bottom: 20px">
          <div class="d-flex flex-row">
            <i class="bi-x-circle-fill" style="font-size: 38px; margin-right: 30px; color: #ef5350"></i>
            <div style="margin-top: 2px">
              <h6 class="modal-title"> Remove List</h6>
              <text class="modal-title" style="font-size: 0.9rem"> Are you sure do you want to remove the list
                {{listId}}?
              </text>
            </div>
          </div>
        </div>
        <div class="horizontal-divider"></div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn flex-fill" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn flex-fill" @click="removeCustomList">Remove</button>
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

  .btn:hover{
    background-color: #eaecef;
  }

  .btn:active {
    background-color: #d0d2d5;
  }

  .btn:focus {
    box-shadow: none;
  }

</style>
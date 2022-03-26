<template>
  <div class="modal fade" id="customListRemoveModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex flex-row">
            <i class="bi-x-circle" style="font-size: 38px; margin-right: 30px; "></i>
            <div style="margin-top: 2px">
              <h6 class="modal-title"> {{$t('ui.rmList')}}</h6>
              <text class="modal-title" style="font-size: 0.9rem"> {{$t('ui.rmListConfirm')}}
                {{listId}}?
              </text>
            </div>
          </div>
        </div>
        <div class="horizontal-divider"></div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn flex-fill" data-bs-dismiss="modal">{{$t('ui.cancel')}}</button>
          <button type="button" class="btn flex-fill" @click="removeCustomList">{{$t('ui.remove')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {Modal} from 'bootstrap'
    import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";
    import toDoListRepository from "../repositories/toDoListRepository";

    export default {
        name: "removeCustomList",
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

<style scoped>

  .modal-content {
    border: none;
    border-radius: .4rem;
    padding: 10px 20px;
  }

  .dark-theme .modal-content {
    background-color: #21262d;
    border: 1px solid #30363d;
  }

  .bi-x-circle {
    margin-top: 5px;
    background: -webkit-linear-gradient(180deg, rgba(89, 66, 141, 1) 0%, rgba(114, 78, 156, 1) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark-theme .bi-x-circle {
    background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


</style>
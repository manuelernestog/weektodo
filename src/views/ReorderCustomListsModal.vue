<template>
  <div class="modal fade" id="ReorderCustomListsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('ui.reorderCustomLists') }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <ul class="custom-lists">
            <li v-for="(list, index) in customTodoLists" :key="index" class="custom-list">
              <div draggable="true" @dragstart="startDrag($event, index)" @dragover.prevent>
                <div class="d-flex flex-row align-items-center">
                  <label class="form-check-label mx-3" @dragenter.self="onDragenter($event)"
                    @dragleave.self="onDragleave($event)" @drop="onDrop($event, index)" @dragover.prevent>{{
                        list.listName
                    }}</label>
                     <i class="bi-grip-horizontal mx-3" :title="$t('ui.remove')"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";

export default {
  name: "RecurrentEventsModal",
  data() {
    return {
      index: 0,

    };
  },
  methods: {
    startDrag: function (event, index) {
      event.dataTransfer.setData("index", index);
    },
    onDragenter: function (event) {
      event.target.parentElement.classList.add("drag-hover");
    },
    onDragleave: function (event) {
      event.target.parentElement.classList.remove("drag-hover");
    },
    onDrop: function (event, to_index) {
      let from_index = event.dataTransfer.getData("index");
      let customLists = this.$store.getters.cTodoListIds;
      let list = customLists.splice(parseInt(from_index), 1)[0];
      customLists.splice(to_index, 0, list);
      event.target.parentElement.classList.remove("drag-hover");
      customToDoListIdsRepository.update(customLists);
      this.$emit('resetCustomList');
    },

  },
  computed: {
    customTodoLists: function () {
      return this.$store.getters.cTodoListIds;
    }
  },
};
</script>

<style scoped lang="scss">
@import "/src/assets/style/globalVars.scss";

.modal-dialog {
  max-width: 370px;
}

.modal-body {
  height: 380px;
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

.grip-horizontal {
  cursor: grabbing;

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

.custom-lists {
  list-style: none;
  padding: 0px 10px 10px 10px;
  margin-top: 10px;
  max-height: 320px;
  overflow-y: auto;

  li>div {
    -webkit-user-drag: element;
  }

  .custom-list {
    border-bottom: 1px solid #eaecef;

    .dark-theme & {
      border-bottom: 1px solid #464647;
    }

    label {
      width: 100%;
      padding: 10px 5px 10px 0px;
      min-height: 38px;
      height: auto;

      * {
        pointer-events: none;
      }
    }

    .form-check-input {
      width: 16px !important;
      height: 16px !important;
      min-width: 16px;
      min-height: 16px;
    }

    i {
      color: #87888a;
      display: none;
      cursor: pointer;

      &:hover {
        color: black;
      }

      .checked & {
        opacity: 1 !important;
      }

      .dark-theme & {
        color: #babbbe;

        &:hover {
          color: white;
        }
      }
    }

    .drag-hover {
      color: rgba(157, 157, 157, 0.43);
      background-color: rgb(250, 249, 249);

      .dark-theme & {
        color: rgb(87, 87, 87);
        background-color: #1f1e20;
      }
    }

    &:hover {
      background-color: $btn-hover-bg-color;

      .dark-theme & {
        background-color: $dt-btn-hover-bg-color;
      }

      i {
        display: block;
      }
    }
  }

}
</style>

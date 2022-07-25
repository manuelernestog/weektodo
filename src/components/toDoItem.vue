<template>
  <div class="item-drop-zone" @dragenter.self="onDragenter" @dragleave.self="onDragleave" @drop="onDragleave"
    :class="[{ 'drag-hover': todoDragHover }]">
    <div class="todo-item-container" ref="itemContainer">
      <div v-if="!editing" class="inline-todo-item d-flex flex-column" @mouseenter="showToDoItem">
        <div class="d-flex">
          <span class="noselect item-text" :class="{ 'checked-todo': toDo.checked }" style="flex-grow: 1">
            <span v-if="toDo.color != 'none'" class="cicle-icon" :style="'color: ' + toDo.color" :class="{
              'bi-check-circle-fill': toDo.checked,
              'bi-circle-fill': !toDo.checked,
            }"></span>
            <span v-else class="cicle-icon"
              :class="{ 'bi-check-circle': toDo.checked, 'bi-circle': !toDo.checked, }"></span>
            <span v-html="todoText"></span>
          </span>
          <span class="item-time" :class="{ 'checked-todo': toDo.checked }"> {{ timeFormat(toDo.time) }} </span>
        </div>
      </div>
      <input v-show="editing" class="edit todo-input" type="text" v-model="text" ref="toDoEditInput" @blur="doneEdit()"
        @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" />
    </div>
  </div>

  <div v-if="!editing" class="todo-item" ref="currentTodo" draggable="true" @dragstart="startDrag($event, toDo, index)"
    @dragend="endDrag()" @wheel="movingWheel" :class="{ 'dragging': todoDragging }" @mouseleave="hideToDoItem">
    <div class="d-flex">
      <span class="noselect item-text" :class="{ 'checked-todo': toDo.checked }" style="flex-grow: 1"
        @dblclick="editToDo" @click="checkTodoClickhandler" @click.middle="showToDoDetails">
        <span v-if="toDo.color != 'none'" class="cicle-icon" :style="'color: ' + toDo.color" :class="{
          'bi-check-circle-fill': toDo.checked,
          'bi-circle-fill': !toDo.checked,
        }"></span>
        <span v-else class="cicle-icon"
          :class="{ 'bi-check-circle': toDo.checked, 'bi-circle': !toDo.checked, }"></span>
        <span v-html="todoText"></span>
        <span class="time-details"> {{ timeFormat(toDo.time) }}</span>
      </span>
      <i class="bi-three-dots todo-item-menu" type="button" @click="showToDoDetails"></i>
      <i class="bi-x todo-item-remove" @click="removeTodo"></i>
    </div>

    <div class="todo-item-sub-tasks">
      <ul class="sub-tasks">
        <li v-for="(subTask, index) in toDo.subTaskList" :key="index" class="sub-task">
          <div class="d-flex flex-row mt-1" :class="{ 'checked-sub-task': subTask.checked }">
            <input class="form-check-input" type="checkbox" v-model="subTask.checked"
              @change="checkSubTask(subTask, index, $event)" />
            <label class="form-check-label" @click="checkSubTask(subTask, index, $event)">
              <span v-html="linkifyText(subTask.text)"></span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import toDoListRepository from "../repositories/toDoListRepository";
import { Modal, Toast } from "bootstrap";
import moment from "moment";
import notifications from "../helpers/notifications";
import linkifyStr from 'linkify-string';
import ClickHandler from "@manuelernestog/click-handler";

export default {
  components: {},
  props: {
    toDo: { required: true, type: Object },
    index: { required: true, type: Number },
    toDoListId: { required: true, type: String },
  },
  data() {
    return {
      editing: false,
      text: this.toDo.text,
      todoDragHover: false,
      todoDragging: false,
      options: { target: '_blank', defaultProtocol: 'https' },
      clickhandler: new ClickHandler(),
      scrollingTimeOut: null
    };
  },
  methods: {
    editToDo: function () {
      this.text = this.toDo.text;
      this.editing = true;
      this.$nextTick(function () {
        this.$refs.toDoEditInput.focus();
        this.$refs.toDoEditInput.select();
      });
    },
    doneEdit: function () {
      this.editing = false;
      this.$store.commit("updateTodo", {
        toDoListId: this.toDoListId,
        index: this.index,
        text: this.text,
      });
      toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
    },
    cancelEdit: function () {
      this.text = this.toDo.text;
      this.editing = false;
    },
    removeTodo: function () {
      this.$store.commit("setUndoElement", { type: 'task', todo: this.toDo, index: this.index });
      this.$store.commit("removeTodo", { toDoListId: this.toDoListId, index: this.index, });
      notifications.refreshDayNotifications(this, this.toDoListId);
      toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
      let toast = new Toast(document.getElementById("taskRemoved"));
      toast.show(); // The undo remove acction it's called in todoModal.vue:undoRemoveTask
    },
    showToDoDetails: function () {
      this.$store.commit("actionsSelectedTodoIdUpdate", {
        toDo: this.toDo,
        index: this.index,
      });

      let modalEl = document.getElementById("toDoModal");
      let modal = new Modal(modalEl, { keyboard: false });
      modal.show();
    },
    checkTodoClickhandler: function (e) {
      if (e.target.href) return;

      this.$store.commit("checkTodo", { toDoListId: this.toDoListId, index: this.index, });
      this.clickhandler.handle(this.checkToDo, this.editToDo);
    },
    checkToDo: function () {
      if (this.$store.getters.todoLists[this.toDoListId][this.index].checked) {
        this.$store.commit("moveTodoToEnd", { toDoListId: this.toDoListId, index: this.index, });
      }
      toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
    },
    startDrag: function (event, item, index) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("item", JSON.stringify(item));
      event.dataTransfer.setData("index", index);
      event.dataTransfer.setDragImage(this.$refs.itemContainer, 0, 0);
      setTimeout(() => {
        this.$refs.currentTodo.style.display = `none`;
        this.todoDragging = true;
      }, 40);
      document.getElementById("app-container").classList.add("dragging-item");

    },
    endDrag: function () {
      this.todoDragging = false;
      document.getElementById("app-container").classList.remove("dragging-item");
    },
    onDragenter: function () {
      this.todoDragHover = true;
    },
    onDragleave: function () {
      this.todoDragHover = false;
    },
    checkSubTask: function (subTask, index, e) {
      if (e.target.href) return;

      if (!e.target.value) subTask.checked = !subTask.checked;

      var todoList = this.toDo.subTaskList;
      if (subTask.checked) { todoList.push(todoList.splice(index, 1)[0]); }
      toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
    },
    timeFormat: function (date) {
      if (date) {
        return moment(date, "HH:mm").format("hh:mm a");
      }
    },
    linkifyText: function (text) {
      return linkifyStr(text, this.options);
    },
    showToDoItem: function () {
      const bounding = this.$refs.itemContainer.getBoundingClientRect()
      this.$refs.currentTodo.style.width = `${bounding.width}px`;
      this.$refs.currentTodo.style.top = `${bounding.y}px`;
      this.$refs.currentTodo.style.left = `${bounding.x}px`;
      this.$refs.currentTodo.style.display = `block`;
      const margin_bottom = 10;
      var offset = parseInt(window.innerHeight) - (parseInt(bounding.y) + parseInt(this.$refs.currentTodo.offsetHeight)) - margin_bottom;
      if (offset < 0) this.$refs.currentTodo.style.top = `${bounding.y + offset}px`;
    },
    hideToDoItem: function () {
      this.$refs.currentTodo.style.display = `none`;
    },
    movingWheel() {
      this.$refs.currentTodo.style.display = `none`;
      this.$refs.currentTodo.classList.add("scrolling");
      document.getElementById("app-container").classList.add("scrolling");

      if (this.scrollingTimeOut != null) return;

      this.scrollingTimeOut = setTimeout(() => {
        this.scrollingTimeOut = null;
        this.$refs.currentTodo.style.display = `none`;
        const bounding = this.$refs.itemContainer.getBoundingClientRect()
        this.$refs.currentTodo.style.width = `${bounding.width}px`;
        this.$refs.currentTodo.style.top = `${bounding.y}px`;
        this.$refs.currentTodo.style.left = `${bounding.x}px`;
        this.$refs.currentTodo.classList.remove("scrolling");
        document.getElementById("app-container").classList.remove("scrolling");
      },500);
    }
  },
  computed: {
    todoText: function () {
      return linkifyStr(this.toDo.text, this.options);
    }
  }
};
</script>

<style scoped lang="scss">
.todo-item-container {
  border-bottom: 1px solid #eaecef;
  height: 26px;
  z-index: 1;

  .dark-theme & {
    border-bottom: 1px solid #30363d;
  }
}

.dragging-item .item-drop-zone * {
  pointer-events: none;
}

.todo-item {
  background-color: #ffffff;
  color: #1e1e1e;
  border-radius: 7px;
  position: relative;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.15);
  z-index: 6;
  position: absolute;
  display: none;

  &:hover {
    display: block;
  }

  * {
    transition: all 0.4s cubic-bezier(0.2, 1, 0.1, 1) 0s;
    pointer-events: all;
  }

  .dark-theme & {
    box-shadow: 0 0px 0 1px #4c4c4c;
    background-color: #21262d;
    color: #f7f7f7;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .item-text {
    white-space: unset;
    word-break: normal;
    height: unset;
    overflow-wrap: break-word;
    word-wrap: break-word;
    z-index: 1;
  }
}

.todo-item.scrolling {
  display: none !important;
}

.todo-input {
  line-height: 1.3rem;
  width: 100%;
  border: none;
  font-size: 0.865rem;

  &:focus {
    outline: none;
  }
}

.item-text {
  transition: width 2s, height 2s, transform 2s;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.3rem;
  font-size: 0.865rem;
  margin: 2px 0px 2px 0px;
  padding: 0 3px 0 7px;
}

.item-time {
  transition: width 2s, height 2s, transform 2s;
  height: 1.2rem;
  line-height: 1.3rem;
  font-size: 0.865rem;
  margin: 2px 0px 2px 0px;
  padding: 0 7px 0 0px;
  opacity: 0.6;
}

.item-time.checked-todo {
  opacity: unset;
}

.time-details {
  opacity: 0.6;
  display: inline;
  margin-left: 5px;
}

.todo-item.checked-todo .time-details {
  opacity: unset;
}

.todo-item:hover .item-time {
  display: none;
}

.checked-todo {
  color: #c4c4c4;
  text-decoration: line-through;

  .dark-theme & {
    color: #3a3a40;
  }
}

.checked-sub-task {
  color: #c4c4c4;
  text-decoration: line-through;

  .dark-theme & {
    color: #3a3a40;
  }

  input {
    opacity: 0.5;
  }
}

.old-date .todo-item {
  color: lightgray;
}

.old-date .todo-item:hover {
  color: black;
}

.dark-theme .old-date .todo-item {
  color: #3a3a40;
}

.dark-theme .old-date .todo-item:hover {
  color: white;
}

.todo-item-remove {
  font-size: 1.3rem;
  cursor: pointer;
  margin-top: 1px;
  margin-left: 5px;
  margin-right: 5px;
  color: grey;
  height: 1.3rem;
  flex-grow: 0;
}

.todo-item-menu {
  font-size: 1rem;
  cursor: pointer;
  margin-top: 3px;
  margin-left: 5px;
  margin-right: 0px;
  color: grey;
  height: 1.1rem;
  flex-grow: 0;
}

.todo-item:hover .todo-item-remove,
.todo-item:hover .todo-item-menu {
  display: block;
}

.todo-item-remove:hover,
.todo-item-menu:hover {
  color: black;
}

.dark-theme .todo-item-remove,
.dark-theme .todo-item-menu {
  color: #c9d1d9;
}

.dark-theme .todo-item-remove:hover,
.dark-theme .todo-item-menu:hover {
  color: white;
}



.drag-hover {
  color: rgba(157, 157, 157, 0.43);
  box-shadow: rgb(244, 243, 243) 0px 0px 4px 1px inset;
  background-color: rgb(250, 249, 249);
}

.dark-theme .drag-hover {
  color: rgb(69, 69, 69);
  box-shadow: #0b0d12 0px 0px 4px 1px inset;
  background-color: #0c0d14;
}

.dragging.todo-item {
  display: none;
}

.sub-tasks {
  list-style: none;
  padding: 0px;
  font-size: 0.865rem;

  li {
    margin: 0px 10px 0px 10px;
  }

  li:last-child {
    margin: 0px 10px 10px 10px;
  }

  input {
    min-width: 14px;
    width: 14px;
    min-height: 14px;
    height: 14px;
    margin-right: 8px;
  }

  label {
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.cicle-icon {
  font-size: 10px;
  margin-right: 5px;
}

.bi-check-circle-fill,
.bi-check-circle {
  opacity: 0.7;
}
</style>

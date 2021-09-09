<template>
  <div class="item-drop-zone"
       @dragenter.self="onDragenter"
       @dragleave.self="onDragleave"
       @drop="onDragleave"
       :class="[{'drag-hover': todoDragHover},{'dragging': todoDragging}]"
  >
    <div class="todo-item-container">
      <div v-if="!editing" class="todo-item d-flex flex-column" ref="currentTodo"
           draggable="true" @dragstart='startDrag($event, toDo,index)' @dragend="endDrag()">
        <div class="d-flex">
          <span class="noselect item-text" :class="{ 'checked-todo': toDo.checked }" style=" flex-grow:1; "
                @dblclick="editToDo"
                @click="checkToDo"> {{ toDo.text }} </span>
          <i class="bi-three-dots todo-item-menu" type="button" @click="showToDoDetails"></i>
          <i class="bi-x todo-item-remove" @click="removeTodo"></i>
        </div>

        <!--        <div class="tags">-->
        <!--                    <div class="tag-item">-->
        <!--                      <i class="bi-chevron-double-up"></i>-->
        <!--                    </div>-->
        <!--                    <div class="tag-item">-->
        <!--                      <i class="bi-arrow-repeat"></i>-->
        <!--                    </div>-->
        <!--          <div class="tag-item">-->
        <!--            <i class="bi-list-task"></i>-->
        <!--            <span>5/10</span>-->
        <!--          </div>-->
        <!--                    <div class="tag-item">-->
        <!--                      <i class="bi-clock"></i>-->
        <!--                      <span>5:15</span>-->
        <!--                    </div>-->
        <!--                    <div class="tag-item">-->
        <!--                      <i class="bi-tag"></i>-->
        <!--                    </div>-->
        <!--        </div>-->

        <div class="todo-item-sub-tasks">
          <ul class="sub-tasks">
            <li v-for="(subTask,index) in toDo.subTaskList" :key="index"
                class="sub-task">
              <div class="d-flex flex-row mt-1" :class="{'checked-todo' : subTask.checked }">
                <input class="form-check-input" type="checkbox" v-model="subTask.checked">
                <label class="form-check-label flex-grow-1"
                       @click="subTask.checked = !subTask.checked">{{subTask.text}}</label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <input v-show="editing" class="edit todo-input" type="text" v-model="text" ref="toDoEditInput" @blur="doneEdit()"
             @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()"/>
    </div>
  </div>
</template>

<script>
    import toDoListRepository from "../repositories/toDoListRepository";
    import {Modal} from "bootstrap";

    export default {
        components: {},
        props: {
            toDo: {required: true, type: Object},
            index: {required: true, type: Number},
            toDoListId: {required: true, type: String}
        },
        data() {
            return {
                editing: false,
                text: this.toDo.text,
                todoDragHover: false,
                todoDragging: false
            }
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
                this.$store.commit('updateTodo', {toDoListId: this.toDoListId, index: this.index, text: this.text});
                toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
            },
            cancelEdit: function () {
                this.text = this.toDo.text;
                this.editing = false;
            },
            removeTodo: function () {
                this.$store.commit('removeTodo', {toDoListId: this.toDoListId, index: this.index});
                toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
            },
            showToDoDetails: function () {
                this.$store.commit('actionsSelectedTodoIdUpdate', {
                    toDo: this.toDo,
                    index: this.index,
                });

                let modalEl = document.getElementById('toDoModal');
                let modal = new Modal(modalEl, {keyboard: false});
                modal.show();
            },
            checkToDo: function () {
                this.$store.commit('checkTodo', {toDoListId: this.toDoListId, index: this.index})
                toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
            },
            startDrag: function (event, item, index) {
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('item', JSON.stringify(item))
                event.dataTransfer.setData('index', index);
                this.todoDragging = true;
            },
            endDrag: function () {
                this.todoDragging = false;
            },
            onDragenter: function () {
                this.todoDragHover = true;
            },
            onDragleave: function () {
                this.todoDragHover = false;
            }
        },
    }

</script>

<style scoped lang="scss">
  .todo-item-container {
    border-bottom: 1px solid #eaecef;
    height: 1.6rem;
    z-index: 1
  }

  .dark-theme .todo-item-container {
    border-bottom: 1px solid #30363d;
  }

  .todo-item {
    transition: 0.4s cubic-bezier(0.2, 1, 0.1, 1);
  }

  .todo-item:hover {
    background-color: #fdfdfd;
    color: #1e1e1e;
    border-radius: 5px;
    position: relative;
    transition: box-shadow 135ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08), 0 1px 3px 1px rgba(66, 66, 66, 0.16);
    border-radius: 3px;
  }

  .todo-item-sub-tasks {
    display: none
  }

  .todo-item:hover .todo-item-sub-tasks {
    display: flex !important;
  }

  .tags {
    display: none;
  }

  .todo-item:hover .tags {
    display: flex;
    flex-wrap: wrap;
  }

  .dark-theme .todo-item:hover {
    box-shadow: 0 0px 0 1px #4c4c4c;
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
    padding: 0 6px 0 6px;
  }

  .todo-item:hover .item-text {
    white-space: unset;
    word-break: normal;
    height: unset;
    overflow-wrap: break-word;
    word-wrap: break-word;
    z-index: 1;
    /*padding-bottom: 5px;*/
  }

  .dark-theme .todo-item:hover {
    background-color: #161b22;
    color: #f7f7f7;
  }

  .checked-todo {
    color: lightgray;
    text-decoration: line-through;
  }

  .dark-theme .checked-todo {
    color: #343b42;
  }

  .old-date .todo-item {
    color: lightgray;
  }

  .old-date .todo-item:hover {
    color: black;
  }

  .dark-theme .old-date .todo-item {
    color: #343b42;
  }

  .dark-theme .old-date .todo-item:hover {
    color: white;
  }

  .todo-item-remove {
    display: none;
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
    display: none;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 3px;
    margin-left: 5px;
    margin-right: 0px;
    color: grey;
    height: 1.1rem;
    flex-grow: 0;
  }

  .todo-item:hover .todo-item-remove, .todo-item:hover .todo-item-menu {
    display: block;
  }

  .todo-item-remove:hover, .todo-item-menu:hover {
    color: black;
  }

  .dark-theme .todo-item-remove, .dark-theme .todo-item-menu {
    color: #c9d1d9;
  }

  .dark-theme .todo-item-remove:hover, .dark-theme .todo-item-menu:hover {
    color: white;
  }

  .item-drop-zone * {
    pointer-events: none;
  }

  .item-drop-zone:hover * {
    pointer-events: unset;
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

  .dragging .todo-item .item-text {
    height: 1.2rem;
  }

  .sub-tasks {
    list-style: none;
    margin: 0px 10px 10px 10px;
    padding: 0px;
    font-size: 13px;

    input {
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }

    label {
      margin-top: 2px;
    }
  }

  .tags {
    margin: 2px 10px 2px 10px;
  }

  .tag-item {
    background-color: #e1ecf4;
    color: #39739d;
    border-radius: 3px;
    font-size: 13px;
    padding: 4px 6px 4px 6px;
    margin-right: 5px;
    margin: 2px 5px 2px 0px;

    span {
      margin-left: 4px;
    }

  }

</style>
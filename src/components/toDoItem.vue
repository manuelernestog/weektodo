<template>
  <div class="todo-item-container" @mouseover="hover = true" @mouseleave="hover = false">
    <div v-if="!editing" class="todo-item" draggable="true" :class="{ 'checked-todo': toDo.checked }">
      <span class="noselect" style=" flex-grow:1; " @dblclick="editToDo" @click="checkToDo"> {{ toDo.text }} </span>
      <i class="bi-x todo-item-remove" v-if="hover" @click="removeTodo()" style="flex-grow:0; color: black"></i>
    </div>
    <input v-show="editing" class="edit todo-input" type="text" v-model="text" ref="toDoEditInput" @blur="doneEdit()"
           @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()"/>
  </div>
</template>

<script>
    import ToDoItemRepository from "../repositories/ToDoItemRepository";
import {store} from "../store/store";

    export default {
        components: {},
        props: {
            toDo: {required: true, type: Object},
            index: {required: true, type: Number},
            toDoListId: {required: true, type: String}
        },
        data() {
            return {
                hover: false,
                editing: false,
                text: this.toDo.text
            }
        },
        methods: {
            doneEdit: function () {
                this.editing = false;
                ToDoItemRepository.edit(this.toDoListId, this.index, this.text);
            },
            cancelEdit: function () {
                this.editing = false;
            },
            removeTodo: function () {
                ToDoItemRepository.remove(this.toDoListId, this.index);
                store.removeTodo(this.toDoListId, this.index);
            },
            checkToDo: function () {
                ToDoItemRepository.check(this.toDoListId, this.index);
                store.checkTodo(this.toDoListId, this.index);
            },
            editToDo: function () {
                this.text = this.toDo.text;
                this.editing = true;
                this.$nextTick(function () {
                    this.$refs.toDoEditInput.focus();
                    this.$refs.toDoEditInput.select();
                });
            }
        },
    }

</script>

<style>
  .todo-item-container {
    border-bottom: 1px solid #eaecef;
  }

  .todo-item {
    font-size: 0.9rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    flex-direction: row;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 1.5rem;
    height: 1.5rem;
    line-height: 1.4rem;
  }

  .todo-item:hover {
    background-color: #fbfbfb;
    height: unset;
    color: #1e1e1e;
  }

  .todo-input {
    line-height: 1.4rem;
    width: 100%;
    border: none;
    font-size: 0.9rem;
  }

  .todo-input:focus {
    outline: none;
  }

  .checked-todo {
    color: lightgray;
    text-decoration: line-through;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  .todo-item-remove {
    cursor: pointer;
    margin: 1px;
    margin-left: 5px;
    margin-right: 5px;
  }

</style>
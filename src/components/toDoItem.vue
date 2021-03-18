<template>
  <div class="todo-item-container" @mouseover="hover = true" @mouseleave="hover = false">
    <div v-if="!editing" class="todo-item" draggable="true" :class="{ 'checked-todo': toDo.checked }">
      <span class="noselect item-text" style=" flex-grow:1; " @dblclick="editToDo" @click="checkToDo"> {{ toDo.text }} </span>
      <i class="bi-x todo-item-remove" v-show="hover" @click="removeTodo()"></i>
    </div>
    <input v-show="editing" class="edit todo-input" type="text" v-model="text" ref="toDoEditInput" @blur="doneEdit()"
           @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()"/>
  </div>
</template>

<script>
    // import {store} from "../store/store";
    import toDoListRepository from "../repositories/toDoListRepository";

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
                toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
            },
            cancelEdit: function () {
                this.editing = false;
            },
            removeTodo: function () {
                this.$store.commit('removeTodo', {toDoListId: this.toDoListId, index: this.index});
                toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
            },
            checkToDo: function () {
                this.$store.commit('checkTodo', {toDoListId: this.toDoListId, index: this.index})
                toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
            }
        },
    }

</script>

<style>
  .todo-item-container {
    border-bottom: 1px solid #eaecef;
  }

  .dark-theme .todo-item-container{
    border-bottom: 1px solid #30363d;
  }

  .todo-item {
    flex-direction: row;
    display: flex;
  }

  .todo-item:hover {
    background-color: #fbfbfb;
    color: #1e1e1e;
  }

  .item-text {
    font-size: 0.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 1.5rem;
    height: 1.5rem;
    line-height: 1.4rem;
    width: 1rem;
  }

  .item-text:hover {
    white-space: unset;
    width: unset;
    word-break: unset;
    height: unset;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .dark-theme .todo-item:hover {
    background-color: #161b22;
    color: #f7f7f7;
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

   .dark-theme .checked-todo {
    color: #343b42;
  }

  .todo-item-remove {
    font-size: 1.3rem;
    cursor: pointer;
    margin: 1px;
    margin-left: 5px;
    margin-right: 5px;
    color: grey;
    flex-grow: 0;
  }

  .todo-item-remove:hover {
    color: black;
  }

  .dark-theme .todo-item-remove {
    color: #c9d1d9;
  }

  .dark-theme .todo-item-remove:hover {
    color: white;
  }

</style>
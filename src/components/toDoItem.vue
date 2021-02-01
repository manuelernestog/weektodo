<template>
  <div class="todo-item-container" @dblclick="editToDo" @click="toggleTodo" @mouseover="hover = true"
       @mouseleave="hover = false">

    <div v-if="!editing" class="todo-item" draggable="true" :class="{ 'checked-todo': checked }">
      <span class="noselect" style=" flex-grow:1; ">
        {{ text }}
      </span>
      <i class="bi-x todo-item-remove" v-if="hover" @click="removeTodo()" style="flex-grow:0; color: black"></i>
    </div>
    <input v-show="editing" class="edit todo-input" type="text"
           v-model="text"
           ref="toDoEditInput"
           @blur="doneEdit()"
           @keyup.enter="doneEdit()"
           @keyup.esc="cancelEdit()"
    />

  </div>

</template>

<script>

    export default {
        components: {},
        props: {
            label: {required: true, type: String},
            done: {default: false, type: Boolean},
            id: {required: true, type: String},
            index: {required: true, type: Number}
        },
        data() {
            return {
                text: this.label,
                checked: this.done,
                hover: false,
                editing: false,
                position: this.index
            }
        },
        methods: {
            doneEdit: function () {
                this.editing = false;
            },
            cancelEdit: function () {
                this.editing = false;
            },
            removeTodo: function () {
                this.$emit("remove-todo", this.position);
            },
            toggleTodo: function () {
                this.checked = !this.checked;
            },
            editToDo: function () {
                this.editing = true;
                this.$nextTick(function () {
                    this.$refs.toDoEditInput.focus();
                    this.$refs.toDoEditInput.select();
                });
            }
        }
    }

</script>

<style>
  .todo-item-container {
    width: 300px;
    border-bottom: 1px solid #eaecef;
  }

  .todo-item {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    flex-direction: row;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 1.5rem;
  }

  .todo-item:hover {
    background-color: #fbfbfb;
    height: unset;
  }

  .todo-input {
    width: 100%;
    border: none;
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
    /* Non-prefixed version, currently
                                     supported by Chrome, Edge, Opera and Firefox */
  }

  .todo-item-remove {
    cursor: pointer;
    margin: 1px;
  }

</style>
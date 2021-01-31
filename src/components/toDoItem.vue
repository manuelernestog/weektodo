<template>
  <div class="todo-item-container" @dblclick="editing = true" @click="toggleTodo" >
<!--    @mouseover="hover = true"-->
<!--    @mouseleave="hover = false"-->
    <div v-if="!editing" class="todo-item" draggable="true" >
      <label :class="{ 'checked-todo': checked }" class="noselect">
        {{ text }}
      </label>
    </div>
    <input v-if="editing" class="edit todo-input" type="text"
           v-model="text"
           @blur="doneEdit()"
           @keyup.enter="doneEdit()"
           @keyup.esc="cancelEdit()">
    <a href="#" v-if="hover" style="float: right; display: block"><i class="bi-x" @click="removeTodo()"></i></a>
  </div>

</template>

<script>
    export default {
        components: {},
        props: {
            label: {required: true, type: String},
            done: {default: false, type: Boolean},
            id: {required: true, type: String}
        },
        data() {
            return {
                text: this.label,
                checked: this.done,
                hover: true,
                editing: false,
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
                console.log("eliminar");
            },
            toggleTodo: function () {
                this.checked = !this.checked;
            }
        }
    }

</script>

<style>
  .todo-item-container {
    width: 300px;
    display: flex;
    border-bottom: 1px solid #eaecef;
  }

  .todo-item {
    overflow-wrap: break-word;
    word-wrap: break-word;
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

</style>
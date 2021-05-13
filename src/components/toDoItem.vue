<template>
  <div class="item-drop-zone"
       @dragenter.self="onDragenter"
       @dragleave.self="onDragleave"
       @drop="onDragleave"
       :class="[{'drag-hover': todoDragHover},{'dragging': todoDragging}]"
  >
    <div class="todo-item-container" draggable="true" @dragstart='startDrag($event, toDo,index)' @dragend="endDrag()">
      <div v-if="!editing" class="todo-item" :class="{ 'checked-todo': toDo.checked }" ref="currentTodo">
      <span class="noselect item-text" style=" flex-grow:1; " @dblclick="editToDo"
            @click="checkToDo"> {{ toDo.text }} </span>
        <i class="bi-x todo-item-remove" @click="removeTodo()"></i>
      </div>
      <input v-show="editing" class="edit todo-input" type="text" v-model="text" ref="toDoEditInput" @blur="doneEdit()"
             @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()"/>
    </div>
  </div>
</template>

<script>
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
                toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
            },
            cancelEdit: function () {
                this.text = this.toDo.text;
                this.editing = false;
            },
            removeTodo: function () {
                this.$store.commit('removeTodo', {toDoListId: this.toDoListId, index: this.index});
                toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
            },
            checkToDo: function () {
                this.$store.commit('checkTodo', {toDoListId: this.toDoListId, index: this.index})
                toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
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

<style>
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
    flex-direction: row;
    display: flex;
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

  .todo-input {
    line-height: 1.4rem;
    width: 100%;
    border: none;
    font-size: 13px;
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

  .todo-item:hover .todo-item-remove {
    display: block;
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

  .item-drop-zone * {
    pointer-events: none;
  }

  .item-drop-zone:hover * {
    pointer-events: unset;
  }

  .drag-hover {
    color: rgba(157, 157, 157, 0.43);
    box-shadow: rgb(233, 232, 232) 0px 0px 4px 1px inset;
    background-color: rgba(223, 223, 223, 0.14);
  }

  .dark-theme .drag-hover {
    color: rgb(69, 69, 69);
    box-shadow: #0d0f14 0px 0px 4px 1px inset;
    background-color: #0f1016;
  }

  .dragging .todo-item .item-text {
    height: 1.2rem;
  }


</style>
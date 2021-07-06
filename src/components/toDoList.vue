<template>
  <div :id="'list'+id" class="to-do-list-container d-flex flex-column" ref='listContainer'
       :class="{ 'old-date': !customTodoList && moments(id).isBefore(Date(),'day') }"
  >
    <list-header :id="id" :customTodoList="customTodoList" :cTodoListIndex="cTodoListIndex"
                 :toDoList="toDoListState"></list-header>
    <ul class="to-do-list ">
      <li v-for="(toDo,index) in toDoListState" :key="index">
        <div class="drop-zone" @drop='onDrop($event, id,index)' @dragover.prevent @dragenter.prevent>
          <to-do-item :to-do="toDo" :index="index" :to-do-list-id="id"></to-do-item>
        </div>
      </li>
    </ul>
    <div class="fake-drop-zone flex-grow-1"
         @drop='onDropAtEnd($event, id)'
         @dragenter.self="onDragenter"
         @dragleave.self="onDragleave"
         @dragover.prevent
         :class="{'fake-drag-hover': fakeItemsDragHover}"
    >
      <div class="todo-item-container border-bottom-0">
        <input class="todo-input new-todo-input" type="text" ref="newToDoInput" v-model="newToDo.text"
               @blur="addToDo()" @keyup.enter="addToDo()" @keyup.esc="cancelAdd()">
      </div>
      <div class="fake-lines" :class="{ 'custom-list': customTodoList}" @click="$refs.newToDoInput.focus()"></div>
    </div>
  </div>
</template>

<script>
    import toDoItem from "./toDoItem";
    import moment from 'moment'
    import toDoListRepository from "../repositories/toDoListRepository";
    import listHeader from "./listHeader";

    export default {
        components: {
            listHeader,
            toDoItem
        },
        props: {
            id: {required: false, type: String},
            customTodoList: {required: false, default: false, type: Boolean},
            cTodoListIndex: {required: false, type: Number},
            showCustomList: {required: false, type: Boolean}
        },
        data() {
            return {
                newToDo: {text: "", checked: false},
                fakeItemCounts: 6,
                fakeItemsDragHover: false,
            }
        },
        mounted() {
            this.setTodoListHeight();
            window.addEventListener("resize", this.setTodoListHeight);
        },
        unmounted() {
            window.removeEventListener("resize", this.setTodoListHeight);
        },
        beforeCreate() {
            let listId = this.id;
            this.$store.commit('loadTodoLists', {todoListId: this.id, todoList: []});
            this.$store.dispatch('loadTodoLists', listId);
        },
        methods: {
            addToDo: function () {
                if (this.newToDo.text != "") {
                    var newTodo = {text: this.newToDo.text, checked: false, listId: this.id};
                    this.$store.commit('addTodo', newTodo);
                    toDoListRepository.update(this.id, this.$store.getters.todoLists[this.id]);
                    this.newToDo.text = "";
                }
            },
            cancelAdd: function () {
                this.newToDo.text = ""
            },
            moments: function (date) {
                return moment(date);
            },
            onDrop: function (event, list, new_index) {
                let toDo = JSON.parse(event.dataTransfer.getData('item'));
                let index = event.dataTransfer.getData('index');
                this.$store.commit('removeTodo', {toDoListId: toDo.listId, index: index});
                toDoListRepository.update(toDo.listId, this.$store.getters.todoLists[toDo.listId]);
                toDo.listId = list;
                this.$store.commit('insertTodo', {toDoListId: list, index: new_index, toDo: toDo});
                toDoListRepository.update(list, this.$store.getters.todoLists[list]);
            },
            onDropAtEnd: function (event, list) {
                let toDo = JSON.parse(event.dataTransfer.getData('item'));
                let index = event.dataTransfer.getData('index');
                this.$store.commit('removeTodo', {toDoListId: toDo.listId, index: index});
                toDoListRepository.update(toDo.listId, this.$store.getters.todoLists[toDo.listId]);
                toDo.listId = list;
                this.$store.commit('addTodo', toDo);
                toDoListRepository.update(list, this.$store.getters.todoLists[list]);
                this.fakeItemsDragHover = false;
            },
            setTodoListHeight: function () {
                if (this.showCustomList) {
                    this.fakeItemCounts = Math.floor(this.$refs.listContainer.clientHeight / 40);
                } else {
                    this.fakeItemCounts = Math.floor(this.$refs.listContainer.clientHeight / 34);
                }
            },
            onDragenter: function () {
                this.fakeItemsDragHover = true;
            },
            onDragleave: function () {
                this.fakeItemsDragHover = false;
            }
        },
        watch: {
            showCustomList: function () {
                this.$nextTick(function () {
                    this.setTodoListHeight();
                });
            }
        },
        computed: {
            toDoListState: function () {
                return this.$store.getters.todoLists[this.id];
            }
        }
    }

</script>

<style>
  .to-do-list {
    list-style: none;
    padding-inline-start: 0px;
    margin-bottom: 0px;
  }

  .to-do-list li {
    -webkit-transition: all .4s ease-out;
    transition: all .4s ease-out;
  }

  .todo-input {
    height: 1.2rem;
    line-height: 1.3rem;
    font-size: 0.865rem;
    margin: 2px 0px 2px 0px;
    padding: 0 6px 0 6px;
  }

  .to-do-list-container {
    margin: 1.6rem 13px 13px;
    flex: 0 0 calc(20% - 26px);
    scroll-snap-align: start;
  }

  .to-do-fake-item {
    height: 1.2rem;
    width: 100%;
  }

  .weekly-to-do-header h4 {
    margin-bottom: 4px;
  }

  .weekly-to-do-header span {
    margin-top: 0px;
  }

  .weekly-to-do-header i {
    color: grey;
  }

  .weekly-to-do-header i:hover {
    color: black;
  }

  .old-date {
    color: lightgray;
  }

  .dark-theme .old-date {
    color: #343b42;
  }

  .weekly-to-do-header i {
    font-size: 1.4rem;
    flex-grow: 0;
    align-self: start;
    cursor: pointer;
  }

  .fake-item-container {
    border-bottom: 1px solid #eaecef;
    height: 1.6rem;
  }

  .dark-theme .fake-item-container {
    border-bottom: 1px solid #30363d;
  }

  .fake-drop-zone * {
    pointer-events: none;
  }

  .fake-drop-zone:hover * {
    pointer-events: unset;
  }

  .fake-drag-hover .todo-item-container {
    box-shadow: rgb(244, 243, 243) 0px 0px 4px 1px inset;
    background-color: rgb(250, 249, 249);
  }

  .dark-theme .fake-drag-hover .todo-item-container {
    box-shadow: #0b0d12 0px 0px 4px 1px inset;
    background-color: #0c0d14;
  }

  .fake-drag-hover input, .dark-theme .fake-drag-hover input {
    background-color: unset;
  }

  .fake-lines {
    background-image: linear-gradient(0deg, #ffffff 48.08%, #eaecef 48.08%, #eaecef 50%, #ffffff 50%, #ffffff 98.08%, #eaecef 98.08%, #eaecef 100%);
    background-size: 52.00px 52.00px;
    height: calc(100% - 25px);
  }

  .dark-theme .fake-lines {
    background-image: linear-gradient(0deg, #13171d 48.08%, #30363d 48.08%, #30363d 50%, #13171d 50%, #13171d 98.08%, #30363d 98.08%, #30363d 100%);
    background-size: 52.00px 52.00px;
  }

  .fake-lines.custom-list {
    height: calc(100% - 35px);
  }

</style>
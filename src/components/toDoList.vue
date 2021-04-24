<template>
  <div :id="'list'+id" class="to-do-list-container" ref='listContainer'
       :class="{ 'old-date': !customTodoList && moments(id).isBefore(Date(),'day') }">
    <list-header :id="id" :customTodoList="customTodoList" :cTodoListIndex="cTodoListIndex"
                 :toDoList="toDoListState"></list-header>
    <ul class="to-do-list ">
      <li v-for="(toDo,index) in toDoListState" :key="index" class='drag-el' draggable
          @dragstart='startDrag($event, toDo,index)'>
        <div class="drop-zone" @drop='onDrop($event, id,index)' @dragover.prevent @dragenter.prevent>
          <to-do-item :to-do="toDo" :index="index" :to-do-list-id="id"></to-do-item>
        </div>
      </li>
    </ul>
    <div class="todo-item-container">
      <input class="todo-input drop-zone new-todo-input" type="text" ref="newToDoInput" v-model="newToDo.text"
             @blur="addToDo()" @keyup.enter="addToDo()" @keyup.esc="cancelAdd()" @drop='onDropAtEnd($event, id)' @dragover.prevent
             @dragenter.prevent>
    </div>
    <div @click="$refs.newToDoInput.focus()" class="drop-zone"
         @drop='onDropAtEnd($event, id)' @dragover.prevent @dragenter.prevent>
      <div v-if="fakeItemCounts > 0 && toDoListState.length < fakeItemCounts">
        <div v-for="index in fakeItemCounts - toDoListState.length" :key="index">
          <div class="fake-item-container">
            <div class="to-do-fake-item"></div>
          </div>
        </div>
      </div>
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
                fakeItemCounts: 6
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
                    toDoListRepository.update(this.id, this.$store.state.todoLists[this.id]);
                    this.newToDo.text = "";
                }
            },
            cancelAdd: function(){
                this.newToDo.text = ""
            },
            moments: function (date) {
                return moment(date);
            },
            startDrag: function (event, item, index) {
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('item', JSON.stringify(item))
                event.dataTransfer.setData('index', index);
            },
            onDrop: function (event, list, new_index) {
                let toDo = JSON.parse(event.dataTransfer.getData('item'));
                let index = event.dataTransfer.getData('index');
                this.$store.commit('removeTodo', {toDoListId: toDo.listId, index: index});
                toDoListRepository.update(toDo.listId, this.$store.state.todoLists[toDo.listId]);
                toDo.listId = list;
                this.$store.commit('insertTodo', {toDoListId: list, index: new_index, toDo: toDo});
                toDoListRepository.update(list, this.$store.state.todoLists[list]);
            },
            onDropAtEnd: function (event, list) {
                let toDo = JSON.parse(event.dataTransfer.getData('item'));
                let index = event.dataTransfer.getData('index');
                this.$store.commit('removeTodo', {toDoListId: toDo.listId, index: index});
                toDoListRepository.update(toDo.listId, this.$store.state.todoLists[toDo.listId]);
                toDo.listId = list;
                this.$store.commit('addTodo', toDo);
                toDoListRepository.update(list, this.$store.state.todoLists[list]);
            },
            setTodoListHeight: function () {
                if (this.showCustomList) {
                    this.fakeItemCounts = Math.floor(this.$refs.listContainer.clientHeight / 47);
                } else {
                    this.fakeItemCounts = Math.floor(this.$refs.listContainer.clientHeight / 40);
                }
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
            toDoListState: function(){
                return this.$store.state.todoLists[this.id];
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
  height: 1.5rem;
  padding: 0 8px 0 8px;
  font-size: 0.865rem;
}

.to-do-list-container {
  margin: 1.6rem 13px 13px;
  flex: 0 0 calc(20% - 26px);
  scroll-snap-align: start;
}

.to-do-fake-item {
  height: 1.85rem;
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
}

.dark-theme .fake-item-container {
  border-bottom: 1px solid #30363d;
}
</style>
<template>
  <div class="to-do-list-container" :class="{ 'old-date': moments(id).isBefore(Date(),'day') }">
    <div class="weekly-to-do-header" @mouseover="header_hover = true" @mouseleave="header_hover = false">
      <i class="bi-check2-all" v-show="header_hover && !allTodoChecked() && !editing" @click="check_all_items"></i>
      <div style="flex-grow:1;" class="noselect">
        <div v-if="!customTodoList">
          <h4 :class="{ 'today-date': is_today }"> {{moments(id).format('dddd')}} </h4>
          <span class="weekly-to-do-header"> {{moments(id).format('LL')}} </span>
        </div>
        <div v-else>
          <h5 v-show="!editing" @dblclick="editToDoListName"> {{ todo_list_name }} </h5>
          <input class="custom-todo-input" v-show="editing" type="text" v-model="name" ref="cTodoInput"
                 @blur="doneEdit()"
                 @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()"/>
        </div>
      </div>
      <i v-if="!customTodoList" class="bi-reply-all" v-show="header_hover && !allTodoChecked()"
         @click="moveUndoneItems"></i>
      <i v-if="customTodoList && !editing" class="bi-x" v-show="header_hover && !allTodoChecked()"></i>
    </div>
    <ul class="to-do-list ">
      <li v-for="(toDo,index) in toDoList" :key="index" class='drag-el' draggable
          @dragstart='startDrag($event, toDo,index)'>
        <div class="drop-zone" @drop='onDrop($event, id,index)' @dragover.prevent @dragenter.prevent>
          <to-do-item :to-do="toDo" :index="index" :to-do-list-id="id"></to-do-item>
        </div>
      </li>
    </ul>
    <div class="todo-item-container">
      <input class="todo-input drop-zone" type="text" ref="newToDoInput" v-model="newToDo.text" @blur="addToDo()"
             @keyup.enter="addToDo()" @drop='onDropAtEnd($event, id)' @dragover.prevent @dragenter.prevent>
    </div>
    <div v-if="toDoList.length < 7" @click="$refs.newToDoInput.focus()" class="drop-zone"
         @drop='onDropAtEnd($event, id)' @dragover.prevent @dragenter.prevent>
      <div v-for="index in 6 - toDoList.length" :key="index">
        <div style="border-bottom: 1px solid #eaecef;">
          <div class="to-do-fake-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import toDoItem from "./toDoItem";
    import moment from 'moment'
    import toDoListRepository from "../repositories/toDoListRepository";
    import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";

    export default {
        components: {
            toDoItem,
        },
        props: {
            id: {required: false, type: String},
            customTodoList: {required: false, default: false, type: Boolean},
            cTodoListIndex: {required: false, type: Number}
        },
        data() {
            return {
                toDoList: this.$store.state.todoLists[this.id],
                newToDo: {text: "", checked: false},
                header_hover: false,
                editing: false,
                name: ""
            }
        },
        beforeCreate() {
            let listId = this.id;
            this.$store.dispatch('loadTodoLists', listId);
        },
        mounted() {
            if (this.customTodoList) {
                this.name = this.$store.state.cTodoListIds[this.cTodoListIndex].listName;
                if (this.name == "") {
                    this.editing = true;
                    this.$nextTick(function () {
                        this.$refs.cTodoInput.focus();
                        this.$refs.cTodoInput.select();
                    });
                }
            }
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
            check_all_items: function () {
                this.$store.commit('checkAllItems', this.id);
                toDoListRepository.update(this.id, this.$store.state.todoLists[this.id]);
            },
            moveUndoneItems: function () {
                let towmorrow_id = this.moments(this.id).add(1, 'd').format('YYYYMMDD');
                this.$store.commit('moveUndoneItems', {origenId: this.id, destinyId: towmorrow_id});
                toDoListRepository.update(this.id, this.$store.state.todoLists[this.id]);
                toDoListRepository.update(towmorrow_id, this.$store.state.todoLists[towmorrow_id]);
            },
            moments: function (date) {
                return moment(date);
            },
            allTodoChecked: function () {
                var allChecked = true
                this.toDoList.forEach(function (todo) {
                    if (!todo.checked) {
                        allChecked = false;
                        return;
                    }
                });
                return allChecked;
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
            editToDoListName: function () {
                this.name = this.$store.state.cTodoListIds[this.cTodoListIndex].listName;
                this.editing = true;
                this.$nextTick(function () {
                    this.$refs.cTodoInput.focus();
                    this.$refs.cTodoInput.select();
                });
            },
            doneEdit: function () {
                this.editing = false;
                this.$store.commit('updateCustomTodoList', {index: this.cTodoListIndex, name: this.name});
                customToDoListIdsRepository.update(this.$store.state.cTodoListIds);
            },
            cancelEdit: function () {
                // this.editing = false;
                // this.$store.commit('updateTodo', {toDoListId: this.toDoListId, index: this.index, text: this.text});
                // toDoListRepository.update(this.toDoListId, this.$store.state.todoLists[this.toDoListId]);
            },
        },
        computed: {
            is_today: function () {
                return moment().format('YYYYMMDD') == this.id;
            },
            todo_list_name: function () {
                return this.$store.state.cTodoListIds[this.cTodoListIndex].listName
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

  .todo-input {
    height: 1.5rem;
  }

  .to-do-list-container {
    margin: 1.6rem 13px 13px;
    flex: 0 0 calc(20% - 26px);
  }

  .to-do-fake-item {
    height: 1.5rem;
    width: 100%;
  }

  .weekly-to-do-header {
    text-align: center;
    margin-bottom: 15px;
    margin-top: 10px;
    display: flex;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .today-date {
    text-decoration: underline;
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

  .drop-zone {

  }

  .weekly-to-do-header i {
    font-size: 1.4rem;
    flex-grow: 0;
    align-self: start;
    cursor: pointer;
  }

  .bi-reply-all {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }

  .custom-todo-input {
    font-size: 1.25rem;
    width: 100%;
  }
</style>
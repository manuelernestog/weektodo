<template>
  <div class="to-do-list-container" :class="{ 'old-date': moments(date).isBefore(Date(),'day') }">
    <div class="weekly-to-do-header" @mouseover="header_hover = true" @mouseleave="header_hover = false">
      <i class="bi-check2-all" v-show="header_hover && !allTodoChecked()" @click="check_all_items"
         style="font-size: 1.4rem; flex-grow:0; align-self: start "></i>
      <div style="flex-grow:1;">
        <h4> {{moments(date).format('dddd')}} </h4>
        <span class="weekly-to-do-header"> {{moments(date).format('LL')}} </span>
      </div>
      <i class="bi-reply-all " v-show="header_hover && !allTodoChecked()" @click="moveUndoneItems"
         style="font-size: 1.4rem; -webkit-transform: scaleX(-1); transform: scaleX(-1); flex-grow:0; align-self: start"></i>
    </div>
    <ul class="to-do-list">
      <li v-for="(toDo,n) in toDoList" :key="n">
        <to-do-item :to-do="toDo" :index="n" :to-do-list-id="id()" @todo-updated="updateData"></to-do-item>
      </li>
    </ul>
    <div class="todo-item-container">
      <input class="todo-input" type="text" ref="newToDoInput" v-model="newToDo.text" @blur="addToDo()"
             @keyup.enter="addToDo()">
    </div>
    <div v-if="toDoList.length < 7" @click="$refs.newToDoInput.focus()">
      <div v-for="index in 6 - toDoList.length" :key="index">
        <div class="to-do-fake-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import toDoItem from "./toDoItem";
    import moment from 'moment'
    import ToDoItemRepository from "../repositories/ToDoItemRepository";
    import WeeklyToDoListRepository from "../repositories/WeeklyToDoListRepository";

    export default {
        components: {
            toDoItem,
        },
        props: {
            date: {required: false, type: Date}
        },
        data() {
            return {
                toDoList: WeeklyToDoListRepository.load(this.moments(this.date).format('YYYYMMDD')),
                newToDo: {text: "", checked: false},
                header_hover: false,
            }
        },
        methods: {
            addToDo: function () {
                if (this.newToDo.text != "") {
                    var newTodo = {text: this.newToDo.text, checked: false}
                    ToDoItemRepository.add(this.id(), newTodo);
                    this.newToDo.text = "";
                    this.updateData();
                }
            },
            check_all_items: function () {
                WeeklyToDoListRepository.checkAllItems(this.id());
                this.updateData();
            },
            moveUndoneItems: function(){
                WeeklyToDoListRepository.moveUndoneItems(this.id(),'20210206');
                this.updateData();
            },
            moments: function (date) {
                return moment(date);
            },
            id: function () {
                return this.moments(this.date).format('YYYYMMDD');
            },
            updateData: function () {
                this.toDoList = WeeklyToDoListRepository.load(this.id());
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

  .to-do-list-container {
    margin: 20px 13px 13px;
    flex: 0 0 calc(20% - 26px);
  }

  .to-do-fake-item {
    height: 1.5rem;
    width: 100%;
    border-bottom: 1px solid #eaecef;
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
</style>
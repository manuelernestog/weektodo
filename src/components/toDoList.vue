<template>
  <div class="to-do-list-container" :class="{ 'old-date': moments(date).isBefore(Date(),'day') }">
    <div class="weekly-to-do-header" @mouseover="header_hover = true" @mouseleave="header_hover = false">
      <i class="bi-check2-all" v-show="header_hover && !allTodoChecked()" @click="check_all_items"></i>
      <div style="flex-grow:1;" class="noselect">
        <h4> {{moments(date).format('dddd')}} </h4>
        <span class="weekly-to-do-header"> {{moments(date).format('LL')}} </span>
      </div>
      <i class="bi-reply-all" v-show="header_hover && !allTodoChecked()" @click="moveUndoneItems"></i>
    </div>
    <ul class="to-do-list drop-zone" @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent>
      <li v-for="(toDo,n) in toDoList" :key="n" class='drag-el' draggable @dragstart='startDrag($event, toDo)'>
        <to-do-item :to-do="toDo" :index="n" :to-do-list-id="date"></to-do-item>
      </li>
    </ul>
    <div class="todo-item-container">
      <input class="todo-input" type="text" ref="newToDoInput" v-model="newToDo.text" @blur="addToDo()"
             @keyup.enter="addToDo()">
    </div>
    <div v-if="toDoList.length < 7" @click="$refs.newToDoInput.focus()">
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

    export default {
        components: {
            toDoItem,
        },
        props: {
            date: {required: false, type: String}
        },
        data() {
            return {
                toDoList: this.$store.state.todoLists[this.date],
                newToDo: {text: "", checked: false},
                header_hover: false,
            }
        },
        beforeCreate() {
            let listId = this.date;
            this.$store.dispatch('loadTodoLists', listId);
        },
        methods: {
            addToDo: function () {
                if (this.newToDo.text != "") {
                    var newTodo = {text: this.newToDo.text, checked: false, listId: this.date};
                    this.$store.commit('addTodo', newTodo);
                    toDoListRepository.update(this.date, this.$store.state.todoLists[this.date]);
                    this.newToDo.text = "";
                }
            },
            check_all_items: function () {
                this.$store.commit('checkAllItems', this.date);
                toDoListRepository.update(this.date, this.$store.state.todoLists[this.date]);
            },
            moveUndoneItems: function () {
                let towmorrow_id = this.moments(this.date).add(1, 'd').format('YYYYMMDD');
                this.$store.commit('moveUndoneItems', {origenId: this.date, destinyId: towmorrow_id});
                toDoListRepository.update(this.date, this.$store.state.todoLists[this.date]);
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
            startDrag: function (event, item) {
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('item', JSON.stringify(item))
            },
            onDrop: function (event, list) {
                const item = JSON.parse(event.dataTransfer.getData('item'));
                console.log(item, list);
                // const item = this.items.find(item => item.id == itemID)
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
    margin: 20px 13px 13px;
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

  .bi-check2-all {
    font-size: 1.4rem;
    flex-grow: 0;
    align-self: start;
    cursor: pointer;
  }

  .bi-reply-all {
    font-size: 1.4rem;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    flex-grow: 0;
    align-self: start;
    cursor: pointer;
  }
</style>
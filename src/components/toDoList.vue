<template>
  <div class="to-do-list-container">
    <div class="weekly-to-do-header" style="text-align: center; margin-bottom: 16px; margin-top: 10px;">
      <h4> {{date_to_week_day(Date.now())}} </h4>
      <h6> {{date_to_month_date(Date.now())}} </h6>
    </div>
    <ul class="to-do-list">
      <li v-for="(toDo,n) in toDoList" :key="toDo.id">
        <to-do-item :label="toDo.text" :done="toDo.checked" :index="n" @remove-todo="removeToDo"></to-do-item>
      </li>
    </ul>
    <div class="todo-item-container">
      <input class="todo-input" type="text" ref="newToDoInput" v-model="newToDo.text" @blur="addToDo()"
             @keyup.enter="addToDo()">
    </div>
    <div v-if="toDoList.length < 7" @click="$refs.newToDoInput.focus()">
      <div v-for="index in 7 - toDoList.length" :key="index">
        <div class="to-do-fake-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import toDoItem from "./toDoItem";
    import moment from 'moment'

    export default {
        components: {
            toDoItem
        },
        data() {
            return {
                toDoList: [
                    {text: "Primer Todo", checked: false,},
                    {text: "Segundo Todo", checked: false,},
                ],
                newToDo: {text: "", checked: false}
            }
        },
        methods: {
            addToDo: function () {
                if (this.newToDo.text != "") {
                    this.toDoList.push({text: this.newToDo.text, checked: false});
                    this.newToDo.text = "";
                }
            },
            removeToDo: function (index) {
                this.toDoList.pop(index);
            },
            date_to_week_day: function (date) {
                return moment(date).format('dddd')
            },
            date_to_month_date: function (date) {
                return moment(date).format('LL')
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
    min-height: 45vh;
  }

  .to-do-fake-item {
    height: 1.5rem;
    width: 220px;
    border-bottom: 1px solid #eaecef;
  }
</style>
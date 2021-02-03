<template>
  <div class="to-do-list-container">
    <div class="weekly-to-do-header" @mouseover="header_hover = true" @mouseleave="header_hover = false">
      <i class="bi-check2-all" v-show="header_hover" @click="check_all_items"
         style="font-size: 1.4rem; flex-grow:0; align-self: start "></i>
      <div style="flex-grow:1;">
        <h4> {{date_to_week_day(date)}} </h4>
                <span class="weekly-to-do-header"> {{date_to_month_date(date)}} </span>
      </div>
      <i class="bi-reply-all " v-show="header_hover"
         style="font-size: 1.4rem; -webkit-transform: scaleX(-1); transform: scaleX(-1); flex-grow:0; align-self: start"></i>
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
      <div v-for="index in 6 - toDoList.length" :key="index">
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
        props: {
            date: {required: false, type: Date}
        },
        data() {
            return {
                toDoList: [
                    {text: "Primer Todo", checked: false,},
                    {text: "Segundo Todo", checked: false,},
                ],
                newToDo: {text: "", checked: false},
                header_hover: false,
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
            },
            check_all_items: function () {
                this.toDoList.forEach(function (toDo) {
                    toDo.checked = true;
                });
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
  }

  .to-do-fake-item {
    height: 1.5rem;
    width: 216px;
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
</style>
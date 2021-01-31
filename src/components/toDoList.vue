<template>
  <div class="to-do-list-container">
    <ul class="to-do-list">
      <li v-for="toDo in toDoList" :key="toDo.id">
        <to-do-item :label="toDo.text" :done="toDo.checked"></to-do-item>
      </li>
    </ul>
    <div class="todo-item-container">
      <input class="todo-input" type="text"
             v-model="newToDo.text"
             @blur="addToDo()"
             @keyup.enter="addToDo()">
    </div>
  </div>
</template>

<script>
    import toDoItem from "./toDoItem";

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

  .to-do-list-container{
    min-height: 45vh;
  }


</style>
<template>
  <div class="side-bar">
    <img class="logo" src="WeekToDo-Logo-Color.svg" width="32" height="32" alt="WeekTodo Logo" title="WeekTodo">
    <i class="bi-house"></i>
    <i class="bi-calendar-event" @click="changeDate"></i>
    <i class="bi-clipboard-plus" @click="newCustomTodoList"></i>
    <i class="bi-sliders"></i>
    <span style="flex-grow: 1"></span>
    <i class="bi-info-square"></i>
    <i class="bi-gift"></i>
  </div>
</template>

<script>
    import moment from 'moment';
    import customToDoListIdsRepository from "../../repositories/customToDoListIdsRepository";
    import toDoListRepository from "../../repositories/toDoListRepository";

    export default {
        name: "sideBar",
        methods: {
            changeDate: function () {

            },
            newCustomTodoList: function () {
                const customTodoListId = {listId: moment().format("YYYYMMDDTHHmmss"), listName: ""};
                this.$store.commit('newCustomTodoList', customTodoListId);
                customToDoListIdsRepository.update(this.$store.state.cTodoListIds);
                toDoListRepository.update(customTodoListId.listId, this.$store.state.todoLists[customTodoListId.listId]);
            },
        }
    }
</script>

<style scoped>
  .side-bar {
    width: 4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    float: left;
    background-color: #fcfcfc
  }

  .side-bar i:first-child {
    margin-bottom: 14px;
    margin-top: 8px;
  }

  .side-bar i:first-child:hover {
    border-radius: unset;
    background-color: unset;
  }

  .side-bar i {
    font-size: 1.4rem;
    padding: 10px;
    margin-bottom: 10px;
    align-self: center;
    cursor: pointer;
  }

  .side-bar i:hover {
    border-radius: 6px;
    background-color: #eaecef;
  }

  .side-bar i:active {
    background-color: #dddfe2;
  }

  .side-bar .logo{
    /*padding: 10px;*/
    margin-bottom: 18px;
    margin-top: 18px;
    align-self: center;
    cursor: pointer;
  }

</style>
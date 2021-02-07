import {reactive} from "vue";

export const store = {
    state: reactive({
        toDoLists: {}
    }),
    loadTodoLists(toDoListId, todoList) {
        this.state.toDoLists[toDoListId] = todoList;
    },
    checkTodo(toDoListId, toDoIndex) {
        this.state.toDoLists[toDoListId][toDoIndex].checked = !this.state.toDoLists[toDoListId][toDoIndex].checked;
    },
    removeTodo(toDoListId, toDoIndex){
        this.state.toDoLists[toDoListId].splice(toDoIndex, 1);
    },
    addTodo(todo){
      this.state.toDoLists[todo.listId].push(todo);
    }
};
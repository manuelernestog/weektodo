export default {
    pendingTasksCount(todoList) {
        return todoList.filter(todo => !todo.checked).length;
    }
}
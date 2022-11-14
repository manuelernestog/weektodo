export default {
  pendingTasksCount(todoList) {
    if (todoList == null) return 0;
    return todoList.filter((todo) => !todo.checked).length;
  },
};

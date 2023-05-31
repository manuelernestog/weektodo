export default {
  pendingTasksCount(todoList) {
    if (todoList == null || typeof(todoList) === "undefined") return 0;
    return todoList.filter((todo) => !todo.checked).length;
  },
  reorderTasksList(toDoList) {
    var array = toDoList;
    array.sort(function (a, b) {
      if (b.checked != a.checked) {
        if (b.checked) return -1;
        if (a.checked) return 1;
      }
      if (b.time != a.time) {
        if (b.time == null) return -1;
        if (a.time == null) return 1;
      }
      if (b.time < a.time) return 1;
      if (b.time > a.time) return -1;
    });
    return array;
  },
};

import storageRepository from "./storageRepository";

export default {
    add(todo) {
        let todoList = storageRepository.get(todo.listId) || '[]';
        todoList.push(todo);
        storageRepository.set(todo.listId, todoList);
    },
    remove(toDoListId, index) {
        let todoList = storageRepository.get(toDoListId);
        todoList.splice(index, 1);
        storageRepository.set(toDoListId, todoList);
    },
    check(toDoListId, index) {
        let todoList = storageRepository.get(toDoListId);
        todoList[index].checked = !todoList[index].checked;
        storageRepository.set(toDoListId, todoList);
    },
    edit(toDoListId, index, text) {
        let todoList = storageRepository.get(toDoListId);
        todoList[index].text = text;
        storageRepository.set(toDoListId, todoList);
    },
};
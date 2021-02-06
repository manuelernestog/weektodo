import storageRepository from "./storageRepository";

export default {
    add(toDoListId, todo) {
        let todoList = storageRepository.get(toDoListId) || '[]';
        todoList.push(todo);
        storageRepository.set(toDoListId, todoList);
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
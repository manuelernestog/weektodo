import storageRepository from "./storageRepository";

export default {
    load(toDoListId) {
        let todoList = storageRepository.get(toDoListId);
        if (todoList) {
            return todoList;
        } else {
            storageRepository.set(toDoListId, []);
            return [];
        }
    },
    update(toDoListId, toDoList) {
        storageRepository.set(toDoListId, toDoList);
    }
};
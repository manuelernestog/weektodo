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
    checkAllItems(toDoListId) {
        let todoList = storageRepository.get(toDoListId);
        todoList.forEach(function (toDo) {
            toDo.checked = true;
        });
        storageRepository.set(toDoListId, todoList);
    },
    moveUndoneItems(originToDoListId, destinyToDoListId) {
        let origenTodoList = storageRepository.get(originToDoListId);
        let destinyTodoList = storageRepository.get(destinyToDoListId) || [];
        let tempArray = [];
        for (let i = origenTodoList.length - 1; i >= 0; i--) {
            if (!origenTodoList[i].checked) {
                tempArray.unshift(origenTodoList.splice(i, 1)[0]);
            }
        }
        destinyTodoList = destinyTodoList.concat(tempArray);
        storageRepository.set(originToDoListId, origenTodoList);
        storageRepository.set(destinyToDoListId, destinyTodoList);
    }
};
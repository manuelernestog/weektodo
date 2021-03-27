import dbRepository from "./dbRepository";

export default {
    update(toDoListId, toDoList) {
        let db_req = dbRepository.open();
        db_req.onsuccess = function (event) {
            let db = event.target.result;
            dbRepository.update(db,'todo_lists',toDoListId, toDoList)
        }
    },
    remove(toDoListId) {
        console.log(toDoListId);
        // storageRepository.remove(toDoListId);
    }
};
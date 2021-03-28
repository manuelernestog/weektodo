import storageRepository from "../repositories/storageRepository";
import dbRepository from "../repositories/dbRepository";

export default {
    export() {
        var filename = "WeekToDoBackup.wtdb";
        var data = storageRepository.as_json();
        data.todoLists = {};
        let db_req = dbRepository.open();

        db_req.onsuccess = function (event) {
            let db = event.target.result;
            let request = dbRepository.selectAll(db, 'todo_lists');

            request.onsuccess = function () {
                let cursor = request.result;
                if (cursor) {
                    data.todoLists[cursor.key] = cursor.value;
                    cursor.continue();
                } else {
                    let string_data = JSON.stringify(data);
                    createExportLink(filename, string_data);
                }
            };
        }
    },
    import() {

    }
};

function createExportLink(filename, fileBody) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileBody));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
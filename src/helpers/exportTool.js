import storageRepository from "../repositories/storageRepository";
import dbRepository from "../repositories/dbRepository";
import { Toast } from "bootstrap";
import migrations from "../migrations/migrations";

export default {
  export() {
    var filename = "WeekToDoBackup.wtdb";
    var data = storageRepository.as_json();
    data.todoLists = {};
    data.repeating_events = {};
    let db_req = dbRepository.open();

    db_req.onsuccess = function (event) {
      var db = event.target.result;
      let request = dbRepository.selectAll(db, "todo_lists");
      request.onsuccess = function () {
        let cursor = request.result;
        if (cursor) {
          data.todoLists[cursor.key] = cursor.value;
          cursor.continue();
        } else {
          getRepeatinEventData(filename, data, event);
        }
      };
    };
  },
  import(event) {
    let fr = readFile(event.target.files);
    fr.onload = function () {
      var toast = new Toast(document.getElementById("invalidFile"));
      try {
        var data = JSON.parse(fr.result);
        if ("config" in data) {
          importData(data);
          migrations.migrate();
        } else {
          toast.show();
        }
      } catch (e) {
        toast.show();
      }
    };
  },
  clear() {
    storageRepository.clean();
    let db_req = dbRepository.open();
    db_req.onsuccess = function (event) {
      let db = event.target.result;
      let request = dbRepository.clear(db, "todo_lists");
      request.onsuccess = function () {
        let request2 = dbRepository.clear(db, "repeating_events");
        request2.onsuccess = function () {
          location.reload();
        };
      };
    };
  },
};

function getRepeatinEventData(filename, data, event) {
  var db = event.target.result;
  let request = dbRepository.selectAll(db, "repeating_events");
  request.onsuccess = function () {
    let cursor = request.result;
    if (cursor) {
      data.repeating_events[cursor.key] = cursor.value;
      cursor.continue();
    } else {
      let string_data = JSON.stringify(data);
      createExportLink(filename, string_data);
    }
  };
}

function createExportLink(filename, fileBody) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fileBody));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function readFile(files) {
  const fileList = files;
  var fr = null;
  if (fileList[0]) {
    fr = new FileReader();
    fr.readAsText(fileList[0]);
  }
  return fr;
}

function importData(data) {
  importLocalStorageData(data);
  importIndexedDbData(data, "todo_lists");
}

function importLocalStorageData(data) {
  storageRepository.clean();
  storageRepository.load_json(data);
}

function importIndexedDbData(a_data, table) {
  var data = a_data;
  let db_req = dbRepository.open();
  db_req.onsuccess = function (event) {
    let db = event.target.result;
    let request = dbRepository.clear(db, table);
    request.onsuccess = function () {
        console.log(data);
      importDbRecords(db, data, table);
    };
  };
}

function importDbRecords(db, data_a, table) {
  var keys =  (table == "todo_lists") ? Object.keys(data_a.todoLists) : Object.keys(data_a.repeating_events)
  var data = (table == "todo_lists") ? data_a.todoLists : data_a.repeating_events
  var i = keys.length;
  var req;

  while (i--) {
    req = dbRepository.add(db, table, keys[i], data[keys[i]]);
  }
  req.onsuccess = function () {
    if (table == "todo_lists") {
      importIndexedDbData(data_a, "repeating_events");
    } else {
      location.reload();
    }
  };
}

import storageRepository from "../repositories/storageRepository";
import dbRepository from "../repositories/dbRepository";
import { Toast, Modal } from "bootstrap";
import migrations from "../migrations/migrations";
import isElectron from "is-electron";

export default {
  export() {
    var filename = "WeekToDoBackup.wtdb";
    var data = storageRepository.as_json();
    data.todoLists = {};
    data.repeating_events = {};
    data.repeating_events_by_date = {};
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
    if (isElectron()) {
      const { ipcRenderer } = require("electron");
      ipcRenderer.send("clear-config");
    }

    storageRepository.clean();
    let db_req = dbRepository.open();
    db_req.onsuccess = function (event) {
      var db = event.target.result;
      let request = dbRepository.clear(db, "todo_lists");
      request.onsuccess = function () {
        let request2 = dbRepository.clear(db, "repeating_events");
        request2.onsuccess = function () {
          let request3 = dbRepository.clear(db, "repeating_events_by_date");
          request3.onsuccess = function () {
            location.reload();
          };
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
      getRepeatinEventByDateData(filename, data, event);
    }
  };
}

function getRepeatinEventByDateData(filename, data, event) {
  var db = event.target.result;
  let request = dbRepository.selectAll(db, "repeating_events_by_date");
  request.onsuccess = function () {
    let cursor = request.result;
    if (cursor) {
      data.repeating_events_by_date[cursor.key] = cursor.value;
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
  setTimeout(function () {
    let exportingModal = Modal.getInstance(document.getElementById("exportingModal"));
    exportingModal.hide();
  },1000);
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
  var configData = JSON.parse(data.config);
  configData.importing = true;
  data.config = JSON.stringify(configData)
  storageRepository.load_json(data);
}

function importIndexedDbData(a_data, table) {
  var data = a_data;
  let db_req = dbRepository.open();
  db_req.onsuccess = function (event) {
    let db = event.target.result;
    let request = dbRepository.clear(db, table);
    request.onsuccess = function () {
      importDbRecords(db, data, table);
    };
  };
}

function importDbRecords(db, data_a, table) {
  var keys, data;

  if (table == "todo_lists") {
    keys = Object.keys(data_a.todoLists);
    data = data_a.todoLists;
  } else if (table == "repeating_events") {
    if (!('repeating_events' in data_a)) location.reload(); // if not exist is an old data, finish the import and reload
    keys = Object.keys(data_a.repeating_events);
    data = data_a.repeating_events;
  } else {
    keys = Object.keys(data_a.repeating_events_by_date);
    data = data_a.repeating_events_by_date;
  }

  var i = keys.length;
  var req;

  if (i == 0) {
    if (table == "todo_lists") {
      importIndexedDbData(data_a, "repeating_events");
    } else if (table == "repeating_events") {
      importIndexedDbData(data_a, "repeating_events_by_date");
    } else {
      location.reload();
    }
  } else {
    while (i--) {
      req = dbRepository.add(db, table, keys[i], data[keys[i]]);
    }
    req.onsuccess = function () {
      if (table == "todo_lists") {
        importIndexedDbData(data_a, "repeating_events");
      } else if (table == "repeating_events") {
        importIndexedDbData(data_a, "repeating_events_by_date");
      } else {
        location.reload();
      }
    };
  }
}

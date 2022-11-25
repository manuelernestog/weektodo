import dbRepository from "./dbRepository";

export default {
  update(repeatingEventId, repeatingEvent) {
    let db_req = dbRepository.open();
    db_req.onsuccess = function (event) {
      let db = event.target.result;
      dbRepository.update(db, "repeating_events", repeatingEventId, repeatingEvent);
    };
  },
  remove(repeatingEventId) {
    let db_req = dbRepository.open();
    db_req.onsuccess = function (event) {
      let db = event.target.result;
      dbRepository.delete(db, "repeating_events", repeatingEventId);
    };
  },
};

import dbRepository from "../../repositories/dbRepository";

const state = {
  repeatingEventList: {},
  repeatingEventByDate: {},
};

const getters = {
  repeatingEventList(state) {
    return state.repeatingEventList;
  },
  repeatingEventByDate(state) {
    return state.repeatingEventByDate;
  },
};

const mutations = {
  loadRepeatingEvent(state, repeatingEvent) {
    state.repeatingEventList[repeatingEvent.id] = repeatingEvent;
  },
  updateRepeatingEvent(state, obj) {
    state.repeatingEventList[obj.key] = obj.val;
  },
  removeRepeatingEvent(state, id) {
    delete state.repeatingEventList[id];
  },
  loadRepeatingEventList(state, repeatingEventList) {
    state.repeatingEventList = repeatingEventList;
  },
  loadRepeatingEventGeneratedByDate(state, obj) {
    state.repeatingEventByDate[obj.key] = obj.val ? obj.val : {};
  },
};

const actions = {
  loadRepeatingEvent({ commit }, repeatingEventId) {
    let db_req = dbRepository.open();

    db_req.onsuccess = function (event) {
      let db = event.target.result;
      var get_req = dbRepository.get(db, "repeating_events", repeatingEventId);

      get_req.onsuccess = function (event) {
        let repeatingEvent = event.target.result;
        commit("loadRepeatingEvent", repeatingEvent);
      };
    };
  },
  loadAllRepeatingEvent({ commit }) {
    return new Promise((resolve) => {
      let db_req = dbRepository.open();
      db_req.onsuccess = function (event) {
        let db = event.target.result;
        let get_req = dbRepository.selectAll(db, "repeating_events");
        var repeatingEvents = {};
        get_req.onsuccess = function () {
          let cursor = get_req.result;
          if (cursor) {
            repeatingEvents[cursor.key] = cursor.value;
            cursor.continue();
          } else {
            commit("loadRepeatingEventList", repeatingEvents);
            resolve();
          }
        };
      };
    });
  },
  loadRepeatingEventGeneratedByDate({ commit }, date) {
    return new Promise((resolve) => {
      let db_req = dbRepository.open();
      db_req.onsuccess = function (event) {
        let db = event.target.result;
        var get_req = dbRepository.get(db, "repeating_events_by_date", date);
        get_req.onsuccess = function (event) {
          let re_list = event.target.result;
          commit("loadRepeatingEventGeneratedByDate", { key: date, val: re_list });
          resolve();
        };
      };
    });
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};

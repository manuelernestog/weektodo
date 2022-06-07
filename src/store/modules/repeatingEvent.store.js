import dbRepository from "../../repositories/dbRepository";

const state = {
  repeatingEventList: {},
};

const getters = {
  repeatingEventList(state) {
    return state.repeatingEventList;
  },
};

const mutations = {
  loadRepeatingEvent(state, repeatingEvent) {
    state.repeatingEventList[repeatingEvent.id] = repeatingEvent;
  },
  updateRepeatingEvent(state, obj) {
    state.repeatingEventList[obj.key] = obj.val;
  },
  loadRepeatingEventList(state, repeatingEventList) {
    state.repeatingEventList = repeatingEventList;
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
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};

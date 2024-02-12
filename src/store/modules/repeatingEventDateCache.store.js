import { rrulestr } from "rrule";
import moment from "moment";

const state = {
  repeatingEventDateCache: {},
};

const getters = {
  repeatingEventDateCache(state) {
    return state.repeatingEventDateCache;
  },
};

const mutations = {
  resetRepeatingEventDateCache(state) {
    state.repeatingEventDateCache = {};
  },
  loadRepeatingEventDateCache(state, repeatingEventList) {
    var today = new Date();
    var future_date = new Date();

    future_date.setFullYear(today.getFullYear() + 10);
    for (const [id, re] of Object.entries(repeatingEventList)) {
      const rule = rrulestr(re.repeating_rule);
      rule.between(today, future_date).forEach((date) => {
        if (state.repeatingEventDateCache[moment.utc(date).format("YYYYMMDD")]) {
          state.repeatingEventDateCache[moment.utc(date).format("YYYYMMDD")].push(id);
        } else {
          state.repeatingEventDateCache[moment.utc(date).format("YYYYMMDD")] = [id];
        }
      });
    }
  },
  addRepeatingEventToDateCache(state, re) {
    var today = new Date();
    var future_date = new Date();
    future_date.setFullYear(today.getFullYear() + 10);
    const rule = rrulestr(re.repeating_rule);
    rule.between(today, future_date).forEach((date) => {
      if (state.repeatingEventDateCache[moment.utc(date).format("YYYYMMDD")]) {
        state.repeatingEventDateCache[moment.utc(date).format("YYYYMMDD")].push(re.id);
      } else {
        state.repeatingEventDateCache[moment.utc(date).format("YYYYMMDD")] = [re.id];
      }
    });
  },
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
};

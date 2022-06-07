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
  loadRepeatingEventDateCache(state, repeatingEventList) {
    var today = new Date();
    var future_date = new Date();
    future_date.setFullYear(today.getFullYear() + 20);
    for (const [id, re] of Object.entries(repeatingEventList)) {
      const rule = rrulestr(re.repeating_rule);
      rule.between(today, future_date).forEach((date) => {
        if (state.repeatingEventDateCache[moment(date).format("YYYYMMDD")]){
          state.repeatingEventDateCache[moment(date).format("YYYYMMDD")].push(id);
        }else{
          state.repeatingEventDateCache[moment(date).format("YYYYMMDD")] = [id];
        }
      });
    }
  },
  // addRepeatingEventDateCache(state, re_id) {
  //   state.repeatingEventList[obj.key] = obj.val;
  // },
  // loadRepeatingEventList(state, repeatingEventList) {
  //   state.repeatingEventList = repeatingEventList;
  // }
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
};

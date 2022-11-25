const state = {
  activeTodo: {
    toDo: {
      text: "Text",
      checked: false,
      listId: 1,
      desc: "",
      subTaskList: [],
      color: "none",
      priority: 0,
      tags: [],
      time: null,
      alarm: false,
      repeatingEvent: null,
    },
  },
};

const getters = {
  activeTodo(state) {
    return state.activeTodo;
  },
};

const mutations = {
  setActiveTodo(state, obj) {
    state.activeTodo = obj;
  },
};

const actions = {};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};

const state = {
    config: {}
}

const getters = {
    config(state) {
        return state.config;
    }
}

const mutations = {
    loadConfig(state, obj) {
        state.config = obj;
    },
    updateConfig(state, obj) {
        state.config[obj.key] = obj.val;
    }
}

const actions = {}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
}

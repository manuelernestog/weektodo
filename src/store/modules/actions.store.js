const state = {
    actions: {
        cListCreated: false,
        cListToRmv: null
    }
}

const getters = {
    actions(state) {
        return state.actions;
    }
}

const mutations = {
    actionsCListCreatedUpdate(state, obj) {
        state.actions.cListCreated = obj;
    },
    actionsCListToRmvUpdate(state, obj) {
        state.actions.cListToRmv = obj;
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

const state = {
    notifications: []
}

const getters = {
    notifications(state) {
        return state.notifications;
    }
}

const mutations = {
    setNotificatios(state, obj) {
        state.notifications = obj;
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

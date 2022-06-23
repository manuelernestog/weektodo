const state = {
    clicks: 0,
    clicksTimer: null
}

const getters = {
    clicks(state) {
        return state.clicks;
    },
    clicksTimer(state) {
        return state.clicksTimer;
    }
}

const mutations = {
    setClicks(state, obj) {
        state.clicks = obj;
    },
    setClicksTimer(state, obj) {
        state.clicksTimer = obj;
    }
}

export default {
    namespaced: false,
    state,
    getters,
    mutations
}

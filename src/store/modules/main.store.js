const state = {
    clicks: 0,
    clicksTimer: null,
    undoElement: null
}

const getters = {
    clicks(state) {
        return state.clicks;
    },
    clicksTimer(state) {
        return state.clicksTimer;
    },
    undoElement(state) {
        return state.undoElement;
    }
}

const mutations = {
    setClicks(state, obj) {
        state.clicks = obj;
    },
    setClicksTimer(state, obj) {
        state.clicksTimer = obj;
    },
    setUndoElement(state, obj) {
        state.undoElement = obj;
    }
}

export default {
    namespaced: false,
    state,
    getters,
    mutations
}

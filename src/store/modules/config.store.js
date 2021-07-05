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
    updateConfigCustomList(state, val) {
        state.config.customList = val;
    },
    updateConfigDarkTheme(state, val) {
        state.config.darkTheme = val;
    },
    updateConfigLanguage(state, val) {
        state.config.language = val;
    },
    updateConfigFirstTimeOpen(state) {
        state.config.firstTimeOpen = false;
    },
    updateConfigVersion(state, val) {
        state.config.version = val;
    },
    updateConfigCheckUpdates(state, val) {
        state.config.checkUpdates = val;
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

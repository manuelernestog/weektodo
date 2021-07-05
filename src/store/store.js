import {createStore} from 'vuex'
import todoLists from "./modules/todolist.store";
import config from "./modules/config.store";


export const store = createStore({
    modules: {
        config: config,
        todoLists: todoLists,
    },
    state: {
        actions: {
            cListCreated: false,
            cListToRmv: null
        }
    },
    getters: {},
    mutations: {
        actionsCListCreatedUpdate(state, obj) {
            state.actions.cListCreated = obj;
        },
        actionsCListToRmvUpdate(state, obj) {
            state.actions.cListToRmv = obj;
        }
    },
    actions: {}
});
import {createStore} from 'vuex'
import todoLists from "./modules/todolist.store";
import config from "./modules/config.store";
import actions from "./modules/actions.store";
import notifications from "./modules/notifications.store";
import repeatingEvents from "./modules/repeatingEvent.store";
import repeatingEventsDataCache from "./modules/repeatingEventDateCache.store";


export const store = createStore({
    modules: {
        config: config,
        todoLists: todoLists,
        actions: actions,
        notifications: notifications,
        repeatingEvents: repeatingEvents,
        repeatingEventsDataCache: repeatingEventsDataCache,
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
});
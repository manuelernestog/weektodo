import {createStore} from 'vuex'
import toDoListRepository from "../repositories/toDoListRepository";

export const store = createStore({
    state: {
        todoLists: [],
        cTodoListIds: [],
        config: {},
        actions: {
            cListCreated: false,
            cListToRmv: null
        }
    },
    getters: {},
    mutations: {
        loadTodoLists(state, obj) {
            state.todoLists[obj.todoListId] = obj.todoList;
        },
        checkTodo(state, obj) {
            state.todoLists[obj.toDoListId][obj.index].checked = !state.todoLists[obj.toDoListId][obj.index].checked;
        },
        addTodo(state, toDo) {
            state.todoLists[toDo.listId].push(toDo);
        },
        updateTodo(state, obj) {
            state.todoLists[obj.toDoListId][obj.index].text = obj.text;
        },
        removeTodo(state, obj) {
            state.todoLists[obj.toDoListId].splice(obj.index, 1);
        },
        insertTodo(state, obj) {
            state.todoLists[obj.toDoListId].splice(obj.index, 0, obj.toDo);
        },
        checkAllItems(state, toDoListId) {
            state.todoLists[toDoListId].forEach(toDo => toDo.checked = true)
        },
        moveUndoneItems(state, obj) {
            state.todoLists[obj.origenId].forEach(function (item) {
                if (!item.checked) {
                    item.listId = obj.destinyId;
                    state.todoLists[obj.destinyId].push(item);
                }
            });
            for (let i = state.todoLists[obj.origenId].length - 1; i >= 0; i--) {
                if (!state.todoLists[obj.origenId][i].checked) {
                    state.todoLists[obj.origenId].splice(i, 1);
                }
            }
        },
        loadCustomTodoListsIds(state, obj) {
            state.cTodoListIds = obj;
        },
        newCustomTodoList(state, obj) {
            state.cTodoListIds.push(obj);
            this.commit('loadTodoLists', {todoListId: obj.listId, todoList: []});
        },
        updateCustomTodoList(state, obj) {
            state.cTodoListIds[obj.index].listName = obj.name;
        },
        actionsCListCreatedUpdate(state, obj) {
            state.actions.cListCreated = obj;
        },
        actionsCListToRmvUpdate(state, obj) {
            state.actions.cListToRmv = obj;
        },
        removeCustomTodoList(state, obj) {
            delete state.todoLists[obj.id];
            state.cTodoListIds.splice(obj.index, 1);
        },
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
    },
    actions: {
        loadTodoLists({commit}, todoListId) {
            let todoList = toDoListRepository.load(todoListId);
            commit('loadTodoLists', {todoListId: todoListId, todoList: todoList});
        },
    }
});
import {createStore} from 'vuex'
import toDoListRepository from "../repositories/toDoListRepository";

export const store = createStore({
    state: {
        todoLists: []
    },
    getters: {},
    mutations: {
        loadTodoLists(state, obj) {
            state.todoLists[obj.todoListId] = obj.todoList;
        },
        checkTodo(state, obj) {
            state.todoLists[obj.toDoListId][obj.index].checked = !state.todoLists[obj.toDoListId][obj.index].checked;
            console.log()
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
        checkAllItems(state, toDoListId) {
            state.todoLists[toDoListId].forEach(toDo => toDo.checked = true)
        },
        moveUndoneItems(state, obj) {
            state.todoLists[obj.origenId].forEach(function (item) {
                if (!item.checked) {
                    state.todoLists[obj.destinyId].push(item);
                }
            });
            for (let i = state.todoLists[obj.origenId].length - 1; i >= 0; i--) {
                if (!state.todoLists[obj.origenId][i].checked) {
                    state.todoLists[obj.origenId].splice(i, 1);
                }
            }
        }
    },
    actions: {
        loadTodoLists({commit}, todoListId) {
            let todoList = toDoListRepository.load(todoListId);
            commit('loadTodoLists', {todoListId: todoListId, todoList: todoList})
        },
    }
});
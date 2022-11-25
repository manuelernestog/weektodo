import dbRepository from "../../repositories/dbRepository";

const state = {
  todoLists: {},
  cTodoListIds: [],
  selectedDates: [],
};

const getters = {
  todoLists(state) {
    return state.todoLists;
  },
  cTodoListIds(state) {
    return state.cTodoListIds;
  },
  selectedDates(state) {
    return state.selectedDates;
  },
};

const mutations = {
  loadTodoLists(state, obj) {
    state.todoLists[obj.todoListId] = obj.todoList;
  },
  clearTodoList(state, obj) {
    state.todoLists[obj] = [];
  },
  checkTodo(state, obj) {
    state.todoLists[obj.toDoListId][obj.index].checked = !state.todoLists[obj.toDoListId][obj.index].checked;
  },
  moveTodoToEnd(state, obj) {
      state.todoLists[obj.toDoListId].push(state.todoLists[obj.toDoListId].splice(obj.index, 1)[0]);
  },
  addTodo(state, toDo) {
    state.todoLists[toDo.listId].push(toDo);
  },
  updateTodo(state, obj) {
    state.todoLists[obj.toDoListId][obj.index].repeatingEvent = null;
    state.todoLists[obj.toDoListId][obj.index].text = obj.text;
  },
  removeTodo(state, obj) {
    state.todoLists[obj.toDoListId].splice(obj.index, 1);
  },
  insertTodo(state, obj) {
    state.todoLists[obj.toDoListId].splice(obj.index, 0, obj.toDo);
  },
  checkAllItems(state, toDoListId) {
    state.todoLists[toDoListId].forEach((toDo) => {
      toDo.checked = true;
    });
  },
  moveUndoneItems(state, obj) {
    for (let i = state.todoLists[obj.origenId].length - 1; i >= 0; i--) {
      if (!state.todoLists[obj.origenId][i].checked) {
        state.todoLists[obj.origenId][i].repeatingEvent = null;
        state.todoLists[obj.origenId][i].listId = obj.destinyId;
        state.todoLists[obj.destinyId].unshift(state.todoLists[obj.origenId][i]);
        state.todoLists[obj.origenId].splice(i, 1);
      }
    }
  },
  loadCustomTodoListsIds(state, obj) {
    state.cTodoListIds = obj;
  },
  newCustomTodoList(state, obj) {
    state.cTodoListIds.push(obj);
    this.commit("loadTodoLists", { todoListId: obj.listId, todoList: [] });
  },
  removeCustomTodoList(state, obj) {
    delete state.todoLists[obj.id];
    state.cTodoListIds.splice(obj.index, 1);
  },
  updateCustomTodoList(state, obj) {
    state.cTodoListIds[obj.index].listName = obj.name;
  },
  updateSelectedDates(state, selectedDates) {
    state.selectedDates = selectedDates;
  },
};

const actions = {
  loadTodoLists({ commit }, todoListId) {
    return new Promise((resolve) => {
      let db_req = dbRepository.open();
      db_req.onsuccess = function (event) {
        let db = event.target.result;
        var get_req = dbRepository.get(db, "todo_lists", todoListId);
        get_req.onsuccess = function (event) {
          let todoList = event.target.result;
          if (todoList) {
            commit("loadTodoLists", { todoListId: todoListId, todoList: todoList });
          } else {
            commit("loadTodoLists", { todoListId: todoListId, todoList: [] });
            dbRepository.add(db, "todo_lists", todoListId, []);
          }
          resolve();
        };
      };
    });
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};

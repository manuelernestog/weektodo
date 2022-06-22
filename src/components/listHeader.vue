<template>
  <div class="weekly-to-do-header">
    <i
      class="bi-check2-all"
      v-show="!allTodoChecked() && !editing"
      @click="check_all_items"
      :title="$t('ui.completeAll')"
    ></i>
    <i
      class="bi-info"
      v-show="customTodoList && allTodoChecked() && !editing"
      style="visibility: hidden"
    ></i>
    <div style="flex-grow: 1" class="noselect">
      <div v-if="!customTodoList">
        <h4 :class="{ 'today-date': is_today }">
          {{ moments(id).locale(language).format("dddd") }}
        </h4>
        <span class="weekly-to-do-header">
          {{ moments(id).locale(language).format("LL") }}
        </span>
      </div>
      <div v-else>
        <h5 v-show="!editing" @dblclick="editToDoListName">
          {{ todo_list_name }}
        </h5>
        <input
          class="custom-todo-input"
          v-show="editing"
          type="text"
          v-model="name"
          ref="cTodoInput"
          @blur="doneEdit()"
          @keyup.enter="doneEdit()"
          @keyup.esc="cancelEdit()"
        />
      </div>
    </div>
    <i
      class="bi-reply-all"
      v-show="!customTodoList && !allTodoChecked()"
      @click="moveUndoneItems"
      :title="$t('ui.postpone')"
    ></i>
    <i
      v-show="customTodoList && !editing"
      class="bi-x"
      data-bs-toggle="modal"
      data-bs-target="#customListRemoveModal"
      @click="removeList"
      :title="$t('ui.removeList')"
    ></i>
  </div>
</template>

<script>
import moment from "moment";
import toDoListRepository from "../repositories/toDoListRepository";
import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";
import notifications from "../helpers/notifications";

export default {
  components: {},
  props: {
    id: { required: false, type: String },
    customTodoList: { required: false, default: false, type: Boolean },
    cTodoListIndex: { required: false, type: Number },
    toDoList: { required: false, type: Array },
  },
  data() {
    return {
      editing: false,
      name: "",
    };
  },
  mounted() {
    if (this.customTodoList) {
      if (this.$store.getters.actions.cListCreated) {
        this.$store.commit("actionsCListCreatedUpdate", false);
        this.editing = true;
        this.$nextTick(function () {
          this.$refs.cTodoInput.focus();
          this.$refs.cTodoInput.select();
        });
      }
    }
  },
  methods: {
    check_all_items: function () {
      this.$store.commit("checkAllItems", this.id);
      this.updateTodoList(this.id, this.$store.getters.todoLists[this.id]);
    },
    moveUndoneItems: function () {
      let towmorrow_id = this.moments(this.id).add(1, "d").format("YYYYMMDD");
      this.$store.commit("moveUndoneItems", {
        origenId: this.id,
        destinyId: towmorrow_id,
      });
      this.updateTodoList(this.id, this.$store.getters.todoLists[this.id]);
      this.updateTodoList(towmorrow_id, this.$store.getters.todoLists[towmorrow_id]);
    },
    moments: function (date) {
      return moment(date);
    },
    updateTodoList: function (todoListId, TodoList) {
      notifications.refreshDayNotifications(this, todoListId);
      toDoListRepository.update(todoListId, TodoList);
    },
    allTodoChecked: function () {
      let allChecked = true;
      this.toDoList.forEach(function (todo) {
        if (!todo.checked) {
          allChecked = false;
          return;
        }
      });
      return allChecked;
    },
    editToDoListName: function () {
      this.name =
        this.$store.getters.cTodoListIds[this.cTodoListIndex].listName;
      this.editing = true;
      this.$nextTick(function () {
        this.$refs.cTodoInput.focus();
        this.$refs.cTodoInput.select();
      });
    },
    doneEdit: function () {
      this.editing = false;
      this.$store.commit("updateCustomTodoList", {
        index: this.cTodoListIndex,
        name: this.name,
      });
      customToDoListIdsRepository.update(this.$store.getters.cTodoListIds);
    },
    cancelEdit: function () {
      this.name =
        this.$store.getters.cTodoListIds[this.cTodoListIndex].listName || "";
      this.editing = false;
    },
    removeList: function () {
      this.$store.commit("actionsCListToRmvUpdate", {
        id: this.id,
        index: this.cTodoListIndex,
        name: this.$store.getters.cTodoListIds[this.cTodoListIndex].listName,
      });
    },
  },
  computed: {
    is_today: function () {
      return moment().format("YYYYMMDD") == this.id;
    },
    todo_list_name: function () {
      return this.$store.getters.cTodoListIds[this.cTodoListIndex].listName;
    },
    language: function () {
      return this.$store.getters.config.language;
    },
  },
};
</script>

<style scoped>
.weekly-to-do-header {
  text-align: center;
  margin-bottom: 15px;
  margin-top: 10px;
  display: flex;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.today-date {
  text-decoration: underline;
}

.weekly-to-do-header h4 {
  margin-bottom: 4px;
  font-size: 21px;
  text-transform: capitalize;
}

.weekly-to-do-header span {
  margin-top: 0px;
  font-size: 12px;
  color: grey;
}

.weekly-to-do-header i {
  color: grey;
}

.dark-theme .weekly-to-do-header i {
  color: #c9d1d9;
}

.weekly-to-do-header i:hover {
  color: black;
}

.dark-theme .weekly-to-do-header i:hover {
  color: white;
}

.weekly-to-do-header i {
  font-size: 1.4rem;
  flex-grow: 0;
  align-self: start;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  transition: 0.4s cubic-bezier(0.2, 1, 0.1, 1);
}

.bi-reply-all {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.custom-todo-input {
  font-size: 1.25rem;
  width: 100%;
}

.weekly-to-do-header h5 {
  min-height: 1.5rem;
}

.custom-todo-input:focus {
  outline: black auto 1px;
}

.dark-theme .custom-todo-input:focus {
  color: white;
  outline: #13171d auto 1px;
}

.weekly-to-do-header:hover i {
  visibility: visible;
  opacity: 1;
}
</style>
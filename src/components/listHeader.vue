<template>
  <div class="weekly-to-do-header" @mouseover="header_hover = true" @mouseleave="header_hover = false">
    <i class="bi-check2-all" v-show="header_hover && !allTodoChecked() && !editing" @click="check_all_items"></i>
    <i class="bi-info" v-show="header_hover && customTodoList && allTodoChecked() && !editing"
       style="visibility: hidden"></i>
    <div style="flex-grow:1;" class="noselect">
      <div v-if="!customTodoList">
        <h4 :class="{ 'today-date': is_today }"> {{moments(id).format('dddd')}} </h4>
        <span class="weekly-to-do-header"> {{moments(id).format('LL')}} </span>
      </div>
      <div v-else>
        <h5 v-show="!editing" @dblclick="editToDoListName"> {{ todo_list_name }} </h5>
        <input class="custom-todo-input" v-show="editing" type="text" v-model="name" ref="cTodoInput"
               @blur="doneEdit()"
               @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()"/>
      </div>
    </div>
    <i v-if="!customTodoList" class="bi-reply-all" v-show="header_hover && !allTodoChecked()"
       @click="moveUndoneItems"></i>
    <i v-if="customTodoList && !editing" class="bi-x" v-show="header_hover"></i>
  </div>
</template>

<script>
    import moment from 'moment'
    import toDoListRepository from "../repositories/toDoListRepository";
    import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";

    export default {
        components: {},
        props: {
            id: {required: false, type: String},
            customTodoList: {required: false, default: false, type: Boolean},
            cTodoListIndex: {required: false, type: Number},
            toDoList: {required: false, type: Array}
        },
        data() {
            return {
                header_hover: false,
                editing: false,
                name: ""
            }
        },
        mounted() {
            if (this.customTodoList) {
                this.name = this.$store.state.cTodoListIds[this.cTodoListIndex].listName;
                if (this.name == "") {
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
                this.$store.commit('checkAllItems', this.id);
                toDoListRepository.update(this.id, this.$store.state.todoLists[this.id]);
            },
            moveUndoneItems: function () {
                let towmorrow_id = this.moments(this.id).add(1, 'd').format('YYYYMMDD');
                this.$store.commit('moveUndoneItems', {origenId: this.id, destinyId: towmorrow_id});
                toDoListRepository.update(this.id, this.$store.state.todoLists[this.id]);
                toDoListRepository.update(towmorrow_id, this.$store.state.todoLists[towmorrow_id]);
            },
            moments: function (date) {
                return moment(date);
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
                this.name = this.$store.state.cTodoListIds[this.cTodoListIndex].listName;
                this.editing = true;
                this.$nextTick(function () {
                    this.$refs.cTodoInput.focus();
                    this.$refs.cTodoInput.select();
                });
            },
            doneEdit: function () {
                this.editing = false;
                this.$store.commit('updateCustomTodoList', {index: this.cTodoListIndex, name: this.name});
                customToDoListIdsRepository.update(this.$store.state.cTodoListIds);
            },
            cancelEdit: function () {
                this.editing = false;
            },
        },
        computed: {
            is_today: function () {
                return moment().format('YYYYMMDD') == this.id;
            },
            todo_list_name: function () {
                return this.$store.state.cTodoListIds[this.cTodoListIndex].listName
            }
        }
    }

</script>

<style>

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
  }

  .weekly-to-do-header span {
    margin-top: 0px;
  }

  .weekly-to-do-header i {
    color: grey;
  }

  .weekly-to-do-header i:hover {
    color: black;
  }

  .weekly-to-do-header i {
    font-size: 1.4rem;
    flex-grow: 0;
    align-self: start;
    cursor: pointer;
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
    min-height: 1.25rem;
  }
</style>
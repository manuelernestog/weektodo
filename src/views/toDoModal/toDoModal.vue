<template>
  <div class="modal fade" id="toDoModal" data-backdrop="static" data-keyboard="false"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex">
          <div class="todo-list-selector">
            <div class="d-flex align-items-center">
              <div v-show="showingCalendar" class="align-items-center date-picker-btn"
                   @click="showCalendar()">
                <i class="bi-calendar-event mx-2 "></i>
                <datepicker id="todo-date-picker-input" class="py-2" v-model="pickedDate" :locale="language"/>
              </div>
              <div v-show="!showingCalendar" class="align-items-center date-picker-btn">
                <div data-bs-toggle="dropdown" class=" align-items-center date-picker-btn py-2">
                  <i class="bi-view-list mx-2"></i>
                  <div id="todo-list-select"> {{pickedCListName}}</div>
                </div>
                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li v-for="option in cListOptions" :key="option.listId" :value="option.listId">
                    <button class="dropdown-item" type="button" @click="pickedCList = option.listId">
                      <i class="bi-check2"
                         :style="{visibility: option.listId == pickedCList ? 'visible' : 'hidden'}"></i>
                      <span>{{ option.listName }}</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div v-if="showCL && showCal" class="d-flex align-items-center">
                <div class="selector-divider"></div>
                <i id="btnGroupDrop1" class="bi-chevron-down p-2" type="button" data-bs-toggle="dropdown"></i>
                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li>
                    <button class="dropdown-item" type="button" @click="showingCalendar = true">
                      <i class="bi-calendar-check"></i> <span>{{$t('settings.calendar')}}</span>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button" @click="showingCalendar = false">
                      <i class="bi-view-list"></i> <span>{{$t('settings.customLists')}}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex ms-auto align-items-center">

            <!--            <i class="bi-alarm header-menu-icons"></i>-->
            <!--            <i class="bi-arrow-repeat header-menu-icons"></i>-->
            <!--            <i class="bi-flag header-menu-icons"></i>-->
            <color-picker :color="todo.color" @color-selected="changeColor"></color-picker>
            <i id="btnTaskOptionMenu" class="bi-three-dots-vertical header-menu-icons" type="button"
               data-bs-toggle="dropdown"></i>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="btnTaskOptionMenu">
              <li>
                <button class="dropdown-item" type="button" @click="copyTodo">
                  <i class="bi-clipboard"></i> <span>{{$t('donate.copy')}}</span>
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" @click="duplicateTodo" data-bs-dismiss="modal">
                  <i class="bi-back"></i> <span>{{$t('todoDetails.duplicate')}}</span>
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" @click="removeTodo" data-bs-dismiss="modal">
                  <i class="bi-trash"></i> <span>{{$t('ui.remove')}}</span>
                </button>
              </li>
            </ul>
            <div>
              <i class="bi-x close-modal header-menu-icons" data-bs-dismiss="modal"></i>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="todo-header" v-model="todo.checked"
                   @change="updateTodo">
            <div class=" title-container">
              <label v-show="!editingTitle" class="form-check-label todo-title" for="todo-header"
                     :class="{'completed-task' : todo.checked }"
                     @dblclick="editTitle">
                {{todo.text}}
              </label>
              <label v-show="!editingTitle && todo.text==''" class="form-check-label todo-title todo-title-empty-title"
                     for="todo-header" @dblclick="editTitle">
                {{$t('todoDetails.taskTitle')}}
              </label>
              <input v-show="editingTitle" class="todo-title-input" type="text" v-model="todo.text" ref="titleInput"
                     :placeholder="$t('todoDetails.taskTitle')"
                     @blur="doneEditTitle()"
                     @keyup.esc="cancelEditTitle()"
                     @keyup.enter="doneEditTitle()">
              <div class="position-relative" v-show="editingDescription">
              <textarea class="todo-description-textarea mt-2" v-model="todo.desc"
                        :placeholder="$t('todoDetails.notes')"
                        ref="descriptionInput"
                        @blur="doneEditDescription">
              </textarea>
                <i class="bi-markdown-fill" @mousedown="goToMarkDown" :title="$t('todoDetails.markdown')"></i>
              </div>
              <div v-show="!editingDescription && todo.desc!=''" class="mt-2 todo-description"
                   @dblclick="editDescription">
                <Markdown :source="todo.desc"/>
              </div>
              <div v-show="!editingDescription && todo.desc.replace(/^\s*$(?:\r\n?|\n)/gm, '') ==''"
                   @dblclick="editDescription"
                   class="description-empty mt-2"> {{$t('todoDetails.notes')}}
              </div>
            </div>
          </div>
          <div class="mt-3"></div>
          <div class="horizontal-divider mb-0 mt-3"></div>
          <ul class="sub-tasks">
            <li v-for="(subTask,index) in todo.subTaskList" :key="index"
                class="sub-task">
              <div v-show="!subTask.editing" draggable="true"
                   @dragstart='startDrag($event,index)'
                   @dragover.prevent
              >
                <div class="d-flex flex-row align-items-center" :class="{'checked' : subTask.checked }">
                  <input class="form-check-input flex-grow-1 mx-3 mt-0" type="checkbox" v-model="subTask.checked"
                         :id="'sub-task-'+index" @change="updateTodo">
                  <label class="form-check-label" :for="'sub-task-'+index"
                         @dblclick="editSubTask(index)"
                         @dragenter.self="onDragenter($event)"
                         @dragleave.self="onDragleave($event)"
                         @drop="onDrop($event, index)"
                         @dragover.prevent
                  >{{subTask.text}}</label>
                  <i class="bi-trash mx-2" :title="$t('ui.remove')" @click="removeSubTask(index)"></i>
                </div>
              </div>
              <input v-show="subTask.editing" v-model="subTask.text" @blur="doneEditSubTask(index)"
                     @keyup.enter="doneEditSubTask(index)" @keyup.esc="cancelEditSubTask(index)"
                     :ref="'subTaskEdit'+index" class="edit-sub-task">
            </li>
            <div class="new-sub-task d-flex align-items-center">
              <label for="new-sub-task"><i class="bi-plus-square mx-3"></i></label>
              <input type="text" id="new-sub-task" :placeholder="$t('todoDetails.addSubTask')" autocomplete="off"
                     @blur="addSubTask()"
                     @keyup.enter="addSubTask()"
                     @keyup.esc="cancelAddSubTask()" v-model="newSubTask.text" ref="newSubTask">
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <toast-message id="copiedTaskToClipboard" :text="$t('todoDetails.copiedTaskToClipboard')"></toast-message>
  <toast-message id="taskRemoved" :text="$t('todoDetails.taskRemoved')"></toast-message>
  <toast-message id="taskDuplicated" :text="$t('todoDetails.taskDuplicated')"></toast-message>
</template>

<script>
    import Datepicker from 'vue3-datepicker';
    import {es, enUS, fr, pt, ru, zhCN, de} from 'date-fns/locale';
    import Markdown from 'vue3-markdown-it';
    import toDoListRepository from "../../repositories/toDoListRepository";
    import moment from 'moment'
    import dbRepository from '../../repositories/dbRepository'
    import {Toast} from 'bootstrap';
    import toastMessage from '../../components/toastMessage';
    import colorPicker from "./colorPicker";

    export default {
        name: "toDoModal",
        data() {
            return {
                pickedDate: new Date(),
                pickedCList: "",
                pickedCListName: "",
                cListOptions: [],
                todo: {text: "", checked: false, desc: "", subTaskList: []},
                todoList: null,
                index: 0,
                newSubTask: {text: "", checked: false, editing: false},
                editingDescription: false,
                tempTitle: "",
                tempSubTask: "",
                editingTitle: false,
                showingCalendar: true
            }
        },
        props: {
            selectedTodo: {required: true, type: Object},
        },
        components: {
            colorPicker,
            Datepicker,
            Markdown,
            toastMessage
        },
        methods: {
            removeSubTask: function (index) {
                this.todo.subTaskList.splice(index, 1);
                this.updateTodo();
            },
            addSubTask: function () {
                if (this.newSubTask.text != "") {
                    var newTodo = {text: this.newSubTask.text, checked: false, editing: false};
                    this.todo.subTaskList.push(newTodo);
                    this.newSubTask.text = "";
                }
                this.updateTodo();
            },
            cancelAddSubTask: function () {
                this.newSubTask.text = "";
                this.$refs["newSubTask"].blur();
            },
            editSubTask: function (index) {
                this.todo.subTaskList[index].editing = true;
                this.$nextTick(function () {
                    this.$refs["subTaskEdit" + index].focus();
                    this.$refs["subTaskEdit" + index].select();
                    this.tempSubTask = this.todo.subTaskList[index].text;
                });
            },
            doneEditSubTask: function (index) {
                this.todo.subTaskList[index].editing = false;
                this.updateTodo();
            },
            cancelEditSubTask: function (index) {
                this.todo.subTaskList[index].text = this.tempSubTask;
                this.$refs["subTaskEdit" + index].blur();
            },
            editDescription: function () {
                this.editingDescription = true;
                this.$nextTick(function () {
                    this.$refs["descriptionInput"].focus();
                    this.$refs["descriptionInput"].setSelectionRange(0, 0);
                    this.$refs["descriptionInput"].scrollTop = 0;
                });
            },
            doneEditDescription: function () {
                this.editingDescription = false;
                this.updateTodo();
            },
            editTitle: function () {
                this.editingTitle = true;
                this.$nextTick(function () {
                    this.tempTitle = this.todo.text;
                    this.$refs["titleInput"].focus();
                    this.$refs["titleInput"].select();
                });
            },
            cancelEditTitle: function () {
                this.todo.text = this.tempTitle;
                this.$refs["titleInput"].blur();
            },
            doneEditTitle: function () {
                this.editingTitle = false;
                this.updateTodo();
            },
            goToMarkDown: function () {
                window.open("https://commonmark.org/help/", '_blank');
            },
            startDrag: function (event, index) {
                event.dataTransfer.setData('index', index);
            },
            onDragenter: function (event) {
                event.target.parentElement.classList.add("drag-hover");
            },
            onDragleave: function (event) {
                event.target.parentElement.classList.remove("drag-hover");
            },
            onDrop: function (event, to_index) {
                let from_index = event.dataTransfer.getData('index');
                let sub_task = this.todo.subTaskList.splice(parseInt(from_index), 1)[0];
                this.todo.subTaskList.splice(to_index, 0, sub_task);
                event.target.parentElement.classList.remove("drag-hover");
                this.updateTodo();
            },
            showCalendar: function () {
                document.getElementById('todo-date-picker-input').focus();
            },
            updateTodo: function () {
                toDoListRepository.update(this.todo.listId, this.todoList);
            },
            getCListOptions: function () {
                this.cListOptions = this.$store.getters.cTodoListIds;
            },
            moveToTodoList: function (newListID) {
                if (newListID == "Invalid date" || newListID == "") return;

                //todo: cambiar todo esto cuando andicione los tablones para poder apuntar directo al customtodo por el id en memoria y no iterar
                if (moment(newListID, 'YYYYMMDD', true).isValid()) {
                    this.pickedCListName = "";
                    this.pickedCList = "";
                } else {
                    this.cListOptions.forEach((x) => {
                        if (x.listId == this.pickedCList) {
                            this.pickedCListName = x.listName;
                        }
                    });
                }

                let oldListId = this.todo.listId;
                this.todoList.splice(this.index, 1);
                toDoListRepository.update(oldListId, this.todoList);
                this.todo.listId = newListID;
                if (this.$store.getters.todoLists[newListID]) {
                    this.$store.commit('addTodo', this.todo);
                    this.todoList = this.$store.getters.todoLists[this.todo.listId];
                    this.index = this.todoList.length - 1;
                    this.todo = this.todoList[this.index];
                    toDoListRepository.update(newListID, this.todoList);
                } else {
                    this.loadToDoFormDB(newListID);
                }
            },
            loadToDoFormDB: function (newListID) {
                let db_req = dbRepository.open();
                var instancePointer = this;
                db_req.onsuccess = function (event) {
                    let db = event.target.result;
                    var get_req = dbRepository.get(db, 'todo_lists', newListID);
                    get_req.onsuccess = function (event) {
                        let newTodoList = event.target.result ? event.target.result : [];
                        newTodoList.push(instancePointer.todo);
                        instancePointer.todoList = newTodoList;
                        instancePointer.index = newTodoList.length - 1;
                        toDoListRepository.update(newListID, instancePointer.todoList);
                    }
                }
            },
            removeTodo: function () {
                this.$store.commit('removeTodo', {toDoListId: this.todo.listId, index: this.index});
                toDoListRepository.update(this.todo.listId, this.$store.getters.todoLists[this.todo.listId]);
                let toast = new Toast(document.getElementById('taskRemoved'));
                toast.show();
            },
            duplicateTodo: function () {
                var newTodo = {
                    text: this.todo.text,
                    checked: this.todo.checked,
                    listId: this.todo.listId,
                    desc: this.todo.desc,
                    subTaskList: this.todo.subTaskList,
                    color: this.todo.color,
                    priority: 0,
                    tags: [],
                    time: null,
                    alarm: false,
                    repeatingEvent: null
                };
                this.$store.commit('addTodo', newTodo);
                toDoListRepository.update(this.todo.listId, this.$store.getters.todoLists[this.todo.listId]);
                let toast = new Toast(document.getElementById('taskDuplicated'));
                toast.show();
            },
            async copyTodo() {
                await navigator.clipboard.writeText(this.todoToString());
                let toast = new Toast(document.getElementById('copiedTaskToClipboard'));
                toast.show();
            },
            todoToString() {
                var text = "";
                text += this.todo.text;
                if (this.todo.desc != "") {
                    text += '\n\n'
                    text += this.$t('todoDetails.notes') + ':\n\n';
                    text += this.todo.desc;
                }
                if (this.todo.subTaskList.length > 0) {
                    text += '\n\n'
                    text += this.$t('todoDetails.subtasks') + ':\n\n';
                    this.todo.subTaskList.forEach(function (task) {
                        text += '- ' + task.text + '\n';
                    });
                }
                return text;
            },
            changeColor(color){
                this.todo.color = color;
                console.log(color);
            }
        },
        watch: {
            selectedTodo: function (newVal) {
                this.todoList = this.$store.getters.todoLists[newVal.toDo.listId];
                this.index = newVal.index;
                this.todo = this.todoList[this.index];
                if (this.todo['desc'] == undefined) {
                    this.todo['desc'] = "";
                    this.todo['subTaskList'] = [];
                    this.todo['color'] = 'none';
                    this.todo['priority'] = 0;
                    this.todo['tags'] = [];
                    this.todo['time'] = null;
                    this.todo['alarm'] = false;
                    this.todo['repeatingEvent'] = null;
                }
                this.showingCalendar = moment(this.todo.listId, 'YYYYMMDD', true).isValid();
                this.getCListOptions();
                if (this.showingCalendar) {
                    this.pickedCList = "";
                    this.pickedCListName = "";
                    this.pickedDate = moment(this.todo.listId).toDate();
                } else {
                    this.pickedDate = null;
                    this.pickedCList = this.todo.listId
                }
            },
            pickedDate: function (newVal) {
                var newListId = moment(newVal).format('YYYYMMDD');
                if (newListId != this.todo.listId) {
                    this.moveToTodoList(newListId);
                }
            },
            pickedCList: function (newVal) {
                this.moveToTodoList(newVal);
            }
        },
        computed: {
            language: function () {
                let lang = this.$store.getters.config.language;
                let return_lang = null;
                switch (lang) {
                    case "es":
                        return_lang = es;
                        break;
                    case "en":
                        return_lang = enUS;
                        break;
                    case "fr":
                        return_lang = fr;
                        break;
                    case "pt":
                        return_lang = pt;
                        break;
                    case "ru":
                        return_lang = ru;
                        break;
                    case "zh_cn":
                        return_lang = zhCN;
                        break;
                    case "de":
                        return_lang = de;
                        break;
                }
                return return_lang;
            },
            showCL: function () {
                return this.$store.getters.config.customList;
            },
            showCal: function () {
                return this.$store.getters.config.calendar;
            },
        }
    }
</script>

<style scoped lang="scss">

  @import "/src/assets/style/globalVars.scss";

  .todo-list-selector .bi-chevron-down {
    @include btn-icon;
  }

  .todo-list-selector .date-picker-btn {
    display: flex;
    @include btn-icon;
    padding: 0px;

    #todo-list-select {
      font-size: 15px;
    }
  }

  .todo-list-selector .selector-divider {
    height: 21px;
    width: 1px;
    background-color: #b9b9b9;
    margin: 0px 4px 0px 4px;
  }

  .todo-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    border: 2px solid transparent;
    padding: 1px 2px 1px 2px;
  }

  .todo-title-input {
    font-size: 18px;
    line-height: 22px;
    width: 100%;
    font-weight: 500;
    outline: unset;
    border: 2px solid black;
    border-radius: 3px;

    .dark-theme & {
      border: 2px solid white;
      background-color: unset;
    }
  }

  .todo-title-empty-title {
    color: grey;
    margin-left: -8px;
  }

  .todo-description-textarea {
    font-size: 14px;
    line-height: 19px;
    height: 150px;
    width: 100%;
    overflow: auto;
    resize: none;
    background: unset;
    cursor: auto;
    outline: unset;
    border: 2px solid black;
    border-radius: 3px;

    .dark-theme & {
      border: 2px solid white;
      color: #c9d1d9;
    }
  }

  .bi-markdown-fill {
    font-size: 20px;
    margin-top: -50px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    opacity: .3;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .todo-description {
    zoom: 89%;
    max-height: 150px;
    overflow-y: auto;
    user-select: auto;
    -moz-user-select: auto;
    -webkit-user-drag: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    padding: 2px;
    border: 2px solid transparent;
  }

  .description-empty {
    color: grey;
    font-size: 14px;
    line-height: 21px;
    padding: 2px;
    border: 2px solid transparent;
  }

  .sub-tasks {
    list-style: none;
    padding: 0px 10px 10px 10px;
    margin: 0px;
    max-height: 250px;
    overflow-y: auto;

    li > div {
      -webkit-user-drag: element;
    }

    .sub-task {
      border-bottom: 1px solid #eaecef;

      .dark-theme & {
        border-bottom: 1px solid #464647;
      }

      label {
        width: 100%;
        padding: 10px 5px 10px 0px;
        min-height: 38px;
        height: auto;

        * {
          pointer-events: none;
        }
      }

      .form-check-input {
        width: 16px !important;
        height: 16px !important;
        min-width: 16px;
        min-height: 16px;
      }

      i {
        color: #87888a;
        display: none;
        cursor: pointer;

        &:hover {
          color: black;
        }

        .checked & {
          opacity: 1 !important;
        }

        .dark-theme & {
          color: #babbbe;

          &:hover {
            color: white;
          }
        }
      }

      .drag-hover {
        color: rgba(157, 157, 157, 0.43);
        background-color: rgb(250, 249, 249);

        .dark-theme & {
          color: rgb(87, 87, 87);
          background-color: #1f1e20;
        }
      }

      &:hover {
        background-color: $btn-hover-bg-color;

        .dark-theme & {
          background-color: $dt-btn-hover-bg-color;
        }

        i {
          display: block;
        }
      }
    }

    .new-sub-task {
      padding: 0px 5px 0px 0px;
      width: 100%;

      i {
        color: lightgrey;
      }

      input {
        border: none;
        width: 100%;
        height: 38px;
        outline: unset;

        border: 2px solid transparent;

        .dark-theme & {
          background-color: unset;
        }

        &:focus {
          border: 2px solid black;
          border-radius: 3px;

          .dark-theme & {
            border: 2px solid white;
            background-color: #21262d;
          }
        }
      }
    }

    .edit-sub-task {
      outline: unset;
      border: none;
      width: 100%;
      height: 38px;
      width: calc(100% - 48px);
      margin-left: 48px;
      border: 2px solid black;
      border-radius: 3px;

      .dark-theme & {
        border: 2px solid white;
        background-color: #21262d;
      }
    }
  }

  .sub-task .checked input, .sub-task .checked label {
    opacity: .6;
    text-decoration: line-through;
  }

  .title-container {
    margin-left: 14px;
    margin-top: 1px;
  }

  .form-check-input {
    width: 1.3em !important;
    height: 1.3em !important;
  }

  .dark-theme .form-select {
    background-color: #15161e;
    border: 1px solid #30363d;
    color: #c9d1d9;
  }

  .form-select:focus {
    box-shadow: none;
  }

  .modal-dialog {
    max-width: 600px;
  }

  .header-menu-icons {
    margin-left: 6px;
    @include btn-icon;
  }

  .header-menu-icons.bi-x {
    font-size: 1.9rem;
    padding: 0px;
  }


  .modal.modal-static .modal-dialog {
    transform: none;
  }

  #todo-list-select {
    padding: 0px;
    border: none;
    background-color: unset;
    cursor: pointer;
    width: 90px;
    font-size: 15px;
    line-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .completed-task {
    text-decoration: line-through;
  }

</style>
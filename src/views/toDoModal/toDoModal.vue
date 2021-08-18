<template>
  <div class="modal fade" id="toDoModal" data-backdrop="static" data-keyboard="false"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex">

          <!--          <div class="btn-group d-block todo-list-selector" role="group">-->
          <!--            <button type="button" class="btn btn-outline-primary">-->
          <!--             -->
          <!--            </button>-->
          <!--            <div class="btn-group" role="group">-->
          <!--              <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary"-->
          <!--                      data-bs-toggle="dropdown" aria-expanded="false">-->
          <!--                <i class="bi-chevron-down"></i>-->
          <!--              </button>-->
          <!--              <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">-->
          <!--                <li>-->
          <!--                  <button class="dropdown-item" type="button"><i class="bi-calendar-check"></i> <span>Calendar</span>-->
          <!--                  </button>-->
          <!--                </li>-->
          <!--                <li>-->
          <!--                  <button class="dropdown-item" type="button"><i class="bi-list"></i> <span>Custom List</span>-->
          <!--                  </button>-->
          <!--                </li>-->
          <!--              </ul>-->
          <!--            </div>-->
          <!--          </div>-->

          <div class="todo-list-selector">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center py-2 date-picker-btn" @click="showCalendar()">
                <i class="bi-calendar-event mx-2 "></i>
                <datepicker id="todo-date-picker-input" v-model="pickedDate" :locale="language"/>
              </div>
              <div class="selector-divider"></div>
              <i class="bi-chevron-down p-2"></i>
            </div>
          </div>

          <div class="d-flex header-menu-icons ms-auto align-items-center">
            <!--            <i class="bi-circle "></i>-->
            <!--            <i class="bi-alarm "></i>-->
            <!--            <i class="bi-arrow-repeat "></i>-->
            <!--            <i class="bi-flag "></i>-->
            <!--            <i class="bi-tag "></i>-->
            <!--            <i class="bi-three-dots-vertical"></i>-->
            <div>
              <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
            </div>

          </div>

        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="todo-header">
            <div class=" title-container">
              <label v-show="!editingTitle" class="form-check-label todo-title mt-1" for="todo-header"
                     @dblclick="editTitle">
                {{title}}
              </label>
              <label v-show="!editingTitle && title==''" class="form-check-label todo-title todo-title-empty-title mt-1"
                     for="todo-header" @dblclick="editTitle">
                Titulo de Tarea
              </label>
              <input v-show="editingTitle" class="todo-title-input" type="text" v-model="title" ref="titleInput"
                     placeholder="Titulo de Tarea"
                     @blur="doneEditTitle()"
                     @keyup.esc="cancelEditTitle()"
                     @keyup.enter="doneEditTitle()">
              <div class="position-relative" v-show="editingDescription">
              <textarea class="todo-description-input mt-2" v-model="description"
                        placeholder="Descripcion" ref="descriptionInput" @blur="doneEditDescription">
              </textarea>
                <i class="bi-markdown-fill" @click="goToMarkDown" title="Markdown Style Supported"></i>
              </div>
              <div v-show="!editingDescription && description!=''" class="mt-2 todo-description"
                   @dblclick="editDescription">
                <Markdown :source="description"/>
              </div>
              <div v-show="!editingDescription && description.replace(/^\s*$(?:\r\n?|\n)/gm, '') ==''" @dblclick="editDescription"
                   class="description-empty mt-2"> Description
              </div>
            </div>
          </div>
          <div class="mt-3"></div>
          <!--          <div class="sub-tasks-header">Subtasks</div>-->
          <div class="horizontal-divider mb-2 mt-3"></div>
          <ul class="sub-tasks">
            <li v-for="(subTask,index) in subTaskList" :key="index"
                class="sub-task">
              <div v-show="!subTask.editing" draggable="true"
                   @dragstart='startDrag($event,index)'
                   @dragover.prevent
              >
                <div class="d-flex flex-row align-items-center" :class="{'checked' : subTask.checked }">
                  <input class="form-check-input flex-grow-1 mx-3 mt-0" type="checkbox" v-model="subTask.checked"
                         :id="'sub-task-'+index">
                  <label class="form-check-label" :for="'sub-task-'+index"
                         @dblclick="editSubTask(index)"
                         @dragenter.self="onDragenter($event)"
                         @dragleave.self="onDragleave($event)"
                         @drop="onDrop($event, index)"
                         @dragover.prevent
                  >{{subTask.text}}</label>
                  <i class="bi-trash mx-2" @click="removeSubTask(index)"></i>
                </div>
              </div>
              <input v-show="subTask.editing" v-model="subTask.text" @blur="doneEditSubTask(index)"
                     @keyup.enter="doneEditSubTask(index)" @keyup.esc="cancelEditSubTask(index)"
                     :ref="'subTaskEdit'+index" class="edit-sub-task">
            </li>
            <div class="new-sub-task d-flex align-items-center">
              <label for="new-sub-task"><i class="bi-plus-circle mx-3"></i></label>
              <input type="text" id="new-sub-task" placeholder="Adicionar Subtarea" autocomplete="false"
                     @blur="addSubTask()"
                     @keyup.enter="addSubTask()"
                     @keyup.esc="cancelAddSubTask()" v-model="newSubTask.text" ref="newSubTask">
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Datepicker from 'vue3-datepicker';
    import {es, enUS, fr, pt, ru, zhCN, de} from 'date-fns/locale';
    import Markdown from 'vue3-markdown-it';

    export default {
        name: "toDoModal",
        data() {
            return {
                pickedDate: new Date(),
                subTaskList: [
                    {checked: true, text: "Primera sub-tarea", editing: false},
                    {checked: false, text: "Segunda sub-tarea", editing: false},
                    {checked: true, text: "tercera sub-tarea", editing: false}
                ],
                description: "",
                editingDescription: false,
                newSubTask: {text: "", checked: false, editing: false},
                title: "Task Title",
                tempTitle: "",
                tempSubTask: "",
                editingTitle: false,
            }
        },
        components: {
            Datepicker,
            Markdown
        },
        methods: {
            removeSubTask: function (index) {
                this.subTaskList.splice(index, 1);
            },
            addSubTask: function () {
                if (this.newSubTask.text != "") {
                    var newTodo = {text: this.newSubTask.text, checked: false, editing: false};
                    this.subTaskList.push(newTodo);
                    this.newSubTask.text = "";
                }
            },
            cancelAddSubTask: function () {
                this.newSubTask.text = "";
                this.$refs["newSubTask"].blur();
            },
            editSubTask: function (index) {
                this.subTaskList[index].editing = true;
                this.$nextTick(function () {
                    this.$refs["subTaskEdit" + index].focus();
                    this.$refs["subTaskEdit" + index].select();
                    this.tempSubTask = this.subTaskList[index].text;
                });
            },
            doneEditSubTask: function (index) {
                this.subTaskList[index].editing = false;
            },
            cancelEditSubTask: function (index) {
                this.subTaskList[index].text = this.tempSubTask;
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
                setTimeout(function () {
                    this.editingDescription = false;
                }.bind(this), 110)
            },
            editTitle: function () {
                this.editingTitle = true;
                this.$nextTick(function () {
                    this.tempTitle = this.title;
                    this.$refs["titleInput"].focus();
                    this.$refs["titleInput"].select();
                });
            },
            cancelEditTitle: function () {
                this.title = this.tempTitle;
                this.$refs["titleInput"].blur();
            },
            doneEditTitle: function () {
                this.editingTitle = false;
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
                let sub_task = this.subTaskList.splice(parseInt(from_index), 1)[0];
                this.subTaskList.splice(to_index, 0, sub_task);
                event.target.parentElement.classList.remove("drag-hover");
            },
            showCalendar: function () {
                document.getElementById('todo-date-picker-input').focus();
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
            }
        }
    }
</script>

<style scoped>

  .todo-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
  }

  .todo-title-input {
    font-size: 18px;
    line-height: 22px;
    width: 100%;
  }

  .todo-title-empty-title {
    color: grey;
  }

  .todo-description-input {
    font-size: 14px;
    line-height: 19px;
    height: 150px;
    width: 100%;
    overflow: auto;
    resize: none;
    background: unset;
    cursor: auto;
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
  }


  .description-empty {
    color: grey;
    font-size: 14px;
    line-height: 21px;
  }

  .todo-list-selector i {
    font-size: 1rem;
  }


  .todo-list-selector .bi-chevron-down:hover {
    background-color: #f4f3f3;
    border-radius: 4px;
    color: black;
    cursor: pointer;
  }

  .todo-list-selector .date-picker-btn {
    cursor: grab;
  }

  .todo-list-selector .date-picker-btn:hover {
    background-color: #f4f3f3;
    border-radius: 4px;
    color: black;
    cursor: pointer;
  }

  .todo-list-selector .selector-divider {
    height: 21px;
    width: 1px;
    background-color: #b9b9b9;
    margin: 0px 4px 0px 4px;
  }

  .sub-tasks {
    list-style: none;
    padding: 0px 10px 10px 10px;
    margin: 0px;
    max-height: 250px;
    overflow-y: auto;
  }

  .sub-tasks li > div {
    -webkit-user-drag: element;
  }

  .sub-task {
    marging: 0px 20px 10px 20px;
    border-bottom: 1px solid #eaecef;
  }

  .sub-task .drag-hover {
    color: rgba(157, 157, 157, 0.43);
    box-shadow: rgb(244, 243, 243) 0px 0px 4px 1px inset;
    background-color: rgb(250, 249, 249);
  }

  .sub-task .drag-hover label * {
    pointer-events: none;
  }

  .bi-markdown-fill {
    font-size: 20px;
    margin-top: -50px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    opacity: .3;
    cursor: pointer;
  }

  .bi-markdown-fill:hover {
    opacity: 1;
  }

  .sub-task label {
    width: 100%;
    padding: 10px 5px 10px 0px;
    min-height: 38px;
    height: auto;
  }

  .sub-task i {
    color: #87888a;
    display: none;
    cursor: pointer;
  }

  .sub-task i:hover {
    color: black;
  }

  .sub-task:hover i {
    display: block;
  }

  .sub-task:hover {
    background-color: #f4f4f4;
  }

  .sub-task .checked i {
    opacity: 1 !important;
  }

  .sub-task .checked input, .sub-task .checked label {
    opacity: .6;
    text-decoration: line-through;
  }


  .new-sub-task {
    padding: 0px 5px 0px 0px;
    width: 100%;
  }

  .new-sub-task i {
    color: lightgrey;
  }

  .new-sub-task input, .edit-sub-task {
    border: none;
    width: 100%;
    height: 38px;
  }

  .form-check-input {
    border-radius: 10px !important;
  }

  .form-check-input:checked {
    border: 1px solid #5bb04e;
    background-color: #5bb04e;
  }

  .form-check-input:focus {
    border-color: #5bb04e;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(210, 253, 198, 0.2);
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
    max-width: 550px;
  }

  .header-menu-icons i {
    font-size: 1.1rem;
    margin-left: 6px;
    padding: 8px;
    border-radius: 5px;
    color: #6e6e6e;
  }

  .header-menu-icons .bi-x {
    font-size: 1.9rem;
    padding: 0px;
  }

  .header-menu-icons i:hover {
    color: #171717;
    background-color: #f4f4f4;
    cursor: pointer;
  }

  .dropdown-item {
    font-size: 1rem;
  }

  .dropdown-item i {
    font-size: 1.2rem;
    margin-right: 15px;
  }

  .sub-task .form-check-input {
    width: 16px !important;
    height: 16px !important;
    min-width: 16px;
    min-height: 16px;
  }

  .modal.modal-static .modal-dialog {
    transform: none;
  }

  /*.sub-tasks-header{*/
  /*  display: inline;*/
  /*  border-bottom: 1px solid #3b3b3b;*/
  /*  color: #3d3d3d;*/
  /*  padding: 0px 20px 0px 5px;*/
  /*  margin-left: 30px;*/
  /*}*/


</style>
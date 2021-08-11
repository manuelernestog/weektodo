<template>
  <div class="modal  fade" id="toDoModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex">
          <div class="btn-group d-block todo-list-selector" role="group">
            <button type="button" class="btn btn-outline-primary">
              <div class="d-flex align-items-center">
                <i class="bi-calendar-event mx-2 "></i>
                <datepicker id="todo-date-picker-input" v-model="pickedDate" :locale="language"/>
              </div>
            </button>
            <div class="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary"
                      data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi-chevron-down"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li>
                  <button class="dropdown-item" type="button"><i class="bi-calendar-check"></i> <span>Calendar</span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button"><i class="bi-list"></i> <span>Custom List</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="d-flex header-menu-icons ms-auto align-items-center">
            <i class="bi-circle "></i>
            <i class="bi-alarm "></i>
            <i class="bi-arrow-repeat "></i>
            <i class="bi-flag "></i>
            <i class="bi-tag "></i>
            <i class="bi-three-dots-vertical"></i>
            <div>
              <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
            </div>

          </div>

        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="todo-header">
            <div class="mt-1 title-container">
              <label class="form-check-label todo-title" for="todo-header">
                Este es el nombre de la tareca esa dios miooooooo asd aksdjh askdjhaskdj haskdj
                haksjdhaksdjhaskjhaksdjhadk
              </label>
              <textarea class="todo-description mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </textarea>
            </div>
          </div>
          <div class="horizontal-divider mb-2 mt-3"></div>
          <ul class="sub-tasks">

            <li v-for="(subTask,index) in subTaskList" :key="index"
                class="sub-task ">
              <div v-show="!subTask.editing">
                <div class="d-flex flex-row align-items-center">
                  <input class="form-check-input d-inline mx-3 mt-0" type="checkbox" v-model="subTask.checked"
                         :id="'sub-task-'+index">
                  <label class="form-check-label" :for="'sub-task-'+index"
                         @dblclick="editSubTask(index)">{{subTask.text}}</label>
                  <i class="bi-trash ms-auto" @click="removeSubTask(index)"></i>
                </div>
              </div>
              <input v-show="subTask.editing" v-model="subTask.text" @blur="doneEditSubTask(index)"
                     @keyup.enter="doneEditSubTask(index)">
            </li>
            <div class="new-sub-task d-flex align-items-center">
              <i class="bi-plus-circle mx-3"></i>
              <input type="text" placeholder="Nueva subtarea" @blur="addSubTask()" @keyup.enter="addSubTask()"
                     @keyup.esc="cancelAddSubTask()" v-model="newSubTask.text">
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
                newSubTask: {text: "", checked: false, editing: false},
            }
        },
        components: {
            Datepicker
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

            },
            editSubTask: function (index) {
                this.subTaskList[index].editing = true;
            },
            doneEditSubTask: function (index) {
                this.subTaskList[index].editing = false;
            },
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

  .todo-description {
    font-size: 14px;
    color: grey;
    max-height: 150px;
    height: 100px;
    width: 100%;
    border: none;
    overflow: auto;
    line-height: 20px;
    resize: none;
    background: unset
  }

  .todo-list-selector i {
    font-size: 1rem;
  }

  .todo-list-selector .btn {
    padding: unset;
  }

  .sub-tasks {
    list-style: none;
    padding: 0px 20px 10px 20px;
    margin: 0px;
    max-height: 250px;
    overflow-y: auto;
  }

  .sub-task {
    border-bottom: 1px solid #eaecef;
    padding: 10px 5px 10px 0px;
  }

  .sub-task i {
    color: #6b6c6e;
    display: none;
    cursor: pointer;
  }

  .sub-task i:hover {
    color: #444547;
  }

  .sub-task:hover i {
    display: block;
  }

  .sub-task:hover {
    background-color: #f9f9f9;
  }

  .new-sub-task {
    padding: 0px 5px 0px 0px;
    width: 100%;
  }

  .new-sub-task i {
    color: lightgrey;
  }

  .new-sub-task input {
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
    margin-left: 18px;
    color: #6e6e6e;
    cursor: pointer;
  }

  .header-menu-icons .bi-x {
    font-size: 1.9rem;
  }

  .header-menu-icons i:hover {
    color: #171717;
  }

  .dropdown-item {
    font-size: 1rem;
  }

  .dropdown-item i {
    font-size: 1.2rem;
    margin-right: 15px;
  }

  .sub-task .form-check-input {
    width: 1.1em !important;
    height: 1.1em !important;
  }


</style>
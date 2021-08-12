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
              <div class="d-flex align-items-center py-1">
                <label for="todo-date-picker-input">
                  <i class="bi-calendar-event mx-2 "></i>
                </label>
                <datepicker id="todo-date-picker-input" v-model="pickedDate" :locale="language"/>
              </div>
              <i class="bi-chevron-down p-1 px-2"></i>
            </div>
          </div>

          <div class="d-flex header-menu-icons ms-auto align-items-center">
            <i class="bi-circle "></i>
            <i class="bi-alarm "></i>
            <!--            <i class="bi-arrow-repeat "></i>-->
            <!--            <i class="bi-flag "></i>-->
            <!--            <i class="bi-tag "></i>-->
            <i class="bi-three-dots-vertical"></i>
            <div>
              <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
            </div>

          </div>

        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="todo-header">
            <div class=" title-container">
              <label class="form-check-label todo-title mt-1" for="todo-header">
                Este es el nombre de la tareca esa dios miooooooo asd aksdjh askdjhaskdj haskdj
                haksjdhaksdjhaskjhaksdjhadk
              </label>
              <textarea class="todo-description-input mt-3" v-model="description" placeholder="Descripcion">
              </textarea>
              <p class="todo-description mt-3">{{description}}</p>
            </div>
          </div>
          <div class="mt-3"></div>
          <!--          <div class="sub-tasks-header">Subtasks</div>-->
          <div class="horizontal-divider mb-2 mt-3"></div>
          <ul class="sub-tasks">
            <li v-for="(subTask,index) in subTaskList" :key="index"
                class="sub-task ">
              <div v-show="!subTask.editing">
                <div class="d-flex flex-row align-items-center" :class="{'checked' : subTask.checked }">
                  <input class="form-check-input flex-grow-1 mx-3 mt-0" type="checkbox" v-model="subTask.checked"
                         :id="'sub-task-'+index">
                  <label class="form-check-label" :for="'sub-task-'+index"
                         @dblclick="editSubTask(index)">{{subTask.text}}</label>
                  <i class="bi-trash mx-2" @click="removeSubTask(index)"></i>
                </div>
              </div>
              <input v-show="subTask.editing" v-model="subTask.text" @blur="doneEditSubTask(index)"
                     @keyup.enter="doneEditSubTask(index)" :ref="'subTaskEdit'+index" class="edit-sub-task">
            </li>
            <div class="new-sub-task d-flex align-items-center">
              <label for="new-sub-task"><i class="bi-plus-circle mx-3"></i></label>
              <input type="text" id="new-sub-task" placeholder="Adicionar Subtarea" @blur="addSubTask()"
                     @keyup.enter="addSubTask()"
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
                description: "",
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
                this.$nextTick(function () {
                    this.$refs["subTaskEdit" + index].focus();
                    this.$refs["subTaskEdit" + index].select();
                });
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

  .todo-description-input {
    font-size: 14px;
    color: grey;
    max-height: 150px;
    height: 100px;
    width: 100%;
    border: none;
    overflow: auto;
    line-height: 21px;
    resize: none;
    background: unset
  }

  .todo-description {
    font-size: 14px;
    color: #252525;
    line-height: 21px;
    max-height: 100px;
    white-space: pre-wrap;
    overflow-y: auto;
  }

  .todo-list-selector i {
    font-size: 1rem;
  }

  .todo-list-selector .bi-chevron-down{
    border-left: 1px solid #b9b9b9;
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

  .sub-task label {
    width: 100%;
  }

  .sub-task i {
    color: #6b6c6e;
    display: none;
    cursor: pointer;
  }

  .sub-task i:hover {
    color: #0a0b0d;
  }

  .sub-task:hover i {
    display: block;
  }

  .sub-task:hover {
    background-color: #f9f9f9;
  }

  .sub-task .checked i{
    opacity: 100% !important;
  }

  .sub-task .checked {
    opacity: 60%;
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
    width: 16px !important;
    height: 16px !important;
    min-width: 16px;
    min-height: 16px;
  }

  /*.sub-tasks-header{*/
  /*  display: inline;*/
  /*  border-bottom: 1px solid #3b3b3b;*/
  /*  color: #3d3d3d;*/
  /*  padding: 0px 20px 0px 5px;*/
  /*  margin-left: 30px;*/
  /*}*/


</style>
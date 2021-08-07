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
          <div class="d-flex header-menu-icons ms-auto">
            <i class="bi-circle "></i>
            <i class="bi-alarm "></i>
            <i class="bi-arrow-repeat "></i>
            <i class="bi-flag "></i>
            <i class="bi-tag "></i>
            <i class="bi-three-dots-vertical "></i>
          </div>
<!--          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>-->
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="">
            <div class="mt-1 title-container">
              <label class="form-check-label todo-title">
                Este es el nombre de la tareca esa dios miooooooo asd aksdjh askdjhaskdj haskdj
                haksjdhaksdjhaskjhaksdjhadk
              </label>
              <label class="todo-description mt-3">
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
              </label>
            </div>
          </div>
          <div class="horizontal-divider mb-4 mt-4"></div>
          <div class="subtask-container m-4">
            <div class="sub-task d-flex flex-row align-items-center">
              <input class="form-check-input d-inline " type="checkbox" value="">
              <span>Sub task number uno lasd a sdasd asd asd asd</span>
              <i class="bi-trash ms-auto"></i>
            </div>
            <div class="horizontal-divider mb-4 mt-4"></div>
          </div>
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
            }
        },
        components: {
            Datepicker
        },
        methods: {},
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
    max-height: 100px;
    overflow: auto;
  }

.todo-list-selector i{
  font-size: 1rem;
}

  .todo-list-selector .btn{
    padding: unset;
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
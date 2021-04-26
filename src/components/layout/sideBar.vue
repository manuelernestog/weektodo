<template>
  <div class="side-bar">
    <img class="logo" src="WeekToDo-Logo-Color.svg" width="32" height="32" alt="WeekTodo Logo"
         data-bs-toggle="modal" data-bs-target="#aboutModal" :title="$t('about.about')">
    <i class="bi-house" @click="setTodayDate" :title="$t('ui.today')"></i>
    <datepicker v-if="datepickerEnabled" id="side-bar-date-picker-input" v-model="pickedDate" :locale="language"/>
    <i class="bi-calendar-event" @click="changeDate" :title="$t('ui.calendar')"> </i>
    <i v-if="showCustomList" class="bi-clipboard-plus" @click="newCustomTodoList" :title="$t('ui.newCustomList')"></i>
    <i class="bi-sliders" data-bs-toggle="modal" data-bs-target="#configModal" :title="$t('settings.settings')"></i>
    <span style="flex-grow: 1"></span>
    <i class="bi-info-square" data-bs-toggle="modal" data-bs-target="#tipsModal" :title="$t('tips.tips')"></i>
    <i class="bi-gift" data-bs-toggle="modal" data-bs-target="#donateModal" :title="$t('donate.donate')"></i>
  </div>
</template>

<script>
    import moment from 'moment';
    import customToDoListIdsRepository from "../../repositories/customToDoListIdsRepository";
    import toDoListRepository from "../../repositories/toDoListRepository";
    import Datepicker from 'vue3-datepicker';
    import {es, enUS, fr, pt, ru, zhCN} from 'date-fns/locale';

    export default {
        name: "sideBar",
        emits: ["changeDate"],
        components: {
            Datepicker
        },
        data() {
            return {
                pickedDate: new Date(),
                datepickerEnabled: false
            }
        },
        methods: {
            changeDate: function () {
                this.datepickerEnabled = true;
                this.$nextTick(function () {
                    document.getElementById('side-bar-date-picker-input').click();
                    document.getElementById('side-bar-date-picker-input').focus();
                    document.getElementById('side-bar-date-picker-input').addEventListener('focusout', this.resetDatePicker);
                    document.getElementById('side-bar-date-picker-input').onkeydown = function (evt) {
                        evt.keyCode == 27 && document.getElementById("side-bar-date-picker-input").blur();
                    }
                });
            },
            setTodayDate: function () {
                this.$emit('changeDate', moment().format('YYYYMMDD'));
            },
            newCustomTodoList: function () {
                const customTodoListId = {listId: moment().format("YYYYMMDDTHHmmssS"), listName: ""};
                this.$store.commit('actionsCListCreatedUpdate', true);
                this.$store.commit('newCustomTodoList', customTodoListId);
                customToDoListIdsRepository.update(this.$store.state.cTodoListIds);
                toDoListRepository.update(customTodoListId.listId, this.$store.state.todoLists[customTodoListId.listId]);
            },
            resetDatePicker: function () {
                document.getElementById('side-bar-date-picker-input').removeEventListener("focusout", this.resetDatePicker);
                this.datepickerEnabled = false;
            }
        },
        watch: {
            pickedDate: function (val) {
                if (this.datepickerEnabled) {
                    document.getElementById('side-bar-date-picker-input').removeEventListener("focusout", this.resetDatePicker);
                    this.datepickerEnabled = false;
                    this.$emit('changeDate', moment(val).format('YYYYMMDD'));
                    this.pickedDate = new Date();
                }
            }
        },
        computed: {
            showCustomList: function () {
                return this.$store.state.config.customList;
            },
            language: function () {
                let lang = this.$store.state.config.language;
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
                }
                return return_lang;
            }
        }
    }
</script>

<style scoped>
  .side-bar {
    width: 4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    float: left;
    background-color: #fcfcfc
  }

  .side-bar i:first-child {
    margin-bottom: 14px;
    margin-top: 8px;
  }

  .side-bar i:first-child:hover {
    border-radius: unset;
    background-color: unset;
  }

  .side-bar i {
    font-size: 1.4rem;
    padding: 10px;
    margin-bottom: 10px;
    align-self: center;
    cursor: pointer;
    transition: 0.4s cubic-bezier(0.2, 1, 0.1, 1);
  }

  .side-bar i:hover {
    border-radius: 6px;
    background-color: #eaecef;
  }

  .side-bar i:active {
    background-color: #dddfe2;
  }

  .side-bar .logo {
    /*padding: 10px;*/
    margin-bottom: 18px;
    margin-top: 18px;
    align-self: center;
    cursor: pointer;
  }

  /*------------------------Dark Theme*------------------*/

  .dark-theme .side-bar {
    background-color: #161b22
  }

  .dark-theme .side-bar i:hover {
    border-radius: 6px;
    background-color: #21262d;
  }

  .dark-theme .side-bar i:active {
    background-color: #2e353d;
  }

</style>
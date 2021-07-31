<template>
  <i class="bi-three-dots-vertical todo-item-menu" type="button" data-bs-toggle="dropdown"></i>
  <ul class="dropdown-menu dropdown-menu-end todo-item-dropdown">
    <li>
      <button class="dropdown-item" type="button"><i class="bi-pen"></i> <span>Edit</span></button>
    </li>
    <li>
      <hr class="dropdown-divider">
    </li>
    <li>
      <to-do-color-picker></to-do-color-picker>
    </li>
    <li>
      <button class="dropdown-item" type="button"><i class="bi-alarm"></i> <span>Hora</span></button>
    </li>
    <li>
      <button class="dropdown-item" type="button"><i class="bi-arrow-right-square"></i> <span>Mover a</span></button>
    </li>
    <li>
      <button class="dropdown-item" type="button"><i class="bi-files"></i> <span>Duplicar</span></button>
    </li>
    <li>
      <hr class="dropdown-divider">
    </li>
    <li>
      <button class="dropdown-item" type="button" @click="removeTodo()"><i class="bi-trash"></i> <span>Eliminar</span>
      </button>
    </li>
  </ul>
</template>

<script>
    import toDoListRepository from "../repositories/toDoListRepository";
    import toDoColorPicker from "./toDoColorPicker";

    export default {
        components: {
            toDoColorPicker
        },
        props: {
            toDo: {required: true, type: Object},
            index: {required: true, type: Number},
            toDoListId: {required: true, type: String}
        },
        data() {
            return {}
        },
        methods: {
            removeTodo: function () {
                this.$store.commit('removeTodo', {toDoListId: this.toDoListId, index: this.index});
                toDoListRepository.update(this.toDoListId, this.$store.getters.todoLists[this.toDoListId]);
                this.$refs.dropdownMenu.show();
            }
        },
    }

</script>

<style>
  .todo-item-menu {
    display: none;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 3px;
    margin-left: 5px;
    margin-right: 5px;
    color: grey;
    height: 1.3rem;
    flex-grow: 0;
  }

  .todo-item:hover .todo-item-menu {
    display: block;
  }

  .todo-item-menu:hover {
    color: black;
  }

  .dark-theme .todo-item-menu {
    color: #c9d1d9;
  }

  .dark-theme .todo-item-menu:hover {
    color: white;
  }

</style>
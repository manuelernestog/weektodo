import toDoListRepository from "../repositories/toDoListRepository";
import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";
import moment from "moment";

export default {
    create(vue) {
        let yesterday_id = moment().subtract(1, 'd').format('YYYYMMDD');
        let today_id = moment().format('YYYYMMDD');
        let tomorrow_id = moment().add(1, 'd').format('YYYYMMDD');
        let custom_list1_id = create_custom_list(vue, 'Lista Personalizada');
        let custom_list2_id = create_custom_list(vue, 'Lista de Compras');

        create_todo(vue, yesterday_id, vue.$t("generatedData.oldTask"), false);
        create_todo(vue, today_id, 'Click para completar tarea', false);
        create_todo(vue, today_id, 'Doble click para editar', false);
        create_todo(vue, today_id, 'Esto ya se completo', true);
        create_todo(vue, tomorrow_id, 'Puedes arrastrar las tareas', false);

        create_todo(vue, custom_list1_id, 'Esto es una lista personalizada', false);
        create_todo(vue, custom_list1_id, 'Puedes crear y eliminar las que quieras', false);
        create_todo(vue, custom_list1_id, 'Puedes ocultarlas en el menu de opciones', false);
        create_todo(vue, custom_list2_id, 'Refrescos', false);
        create_todo(vue, custom_list2_id, '5 libras de Pan', false);
    }
};

function create_todo(vue, list_id, text, checked) {
    var newTodo = {text: text, checked: checked, listId: list_id};
    vue.$store.commit('addTodo', newTodo);
    toDoListRepository.update(list_id, vue.$store.state.todoLists[list_id]);
}

function create_custom_list(vue, name) {
    const customTodoListId = {listId: name, listName: name};
    vue.$store.commit('newCustomTodoList', customTodoListId);
    customToDoListIdsRepository.update(vue.$store.state.cTodoListIds);
    toDoListRepository.update(customTodoListId.listId, vue.$store.state.todoLists[customTodoListId.listId]);
    return customTodoListId.listId;
}
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

        create_todo(vue, yesterday_id, vue.$t("generatedData.data1"), false);
        create_todo(vue, today_id, vue.$t("generatedData.data2"), false);
        create_todo(vue, today_id, vue.$t("generatedData.data3"), false);
        create_todo(vue, today_id, vue.$t("generatedData.data4"), true);
        create_todo(vue, tomorrow_id, vue.$t("generatedData.data5"), false);

        create_todo(vue, custom_list1_id, vue.$t("generatedData.data6"), false);
        create_todo(vue, custom_list1_id, vue.$t("generatedData.data7"), false);
        create_todo(vue, custom_list1_id, vue.$t("generatedData.data8"), false);
        create_todo(vue, custom_list2_id, vue.$t("generatedData.data9"), false);
        create_todo(vue, custom_list2_id, vue.$t("generatedData.data10"), false);
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
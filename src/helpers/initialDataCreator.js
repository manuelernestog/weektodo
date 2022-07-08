import toDoListRepository from "../repositories/toDoListRepository";
import customToDoListIdsRepository from "../repositories/customToDoListIdsRepository";
import moment from "moment";

export default {
    create(vue) {
        // let yesterday_id = moment().subtract(1, 'd').format('YYYYMMDD');
        let today_id = moment().format('YYYYMMDD');
        let tomorrow_id = moment().add(1, 'd').format('YYYYMMDD');
        let after_tomorrow_id = moment().add(2, 'd').format('YYYYMMDD');
        let custom_list1_id = create_custom_list(vue, vue.$t("generatedData.list1"));
        let custom_list2_id = create_custom_list(vue, vue.$t("generatedData.list2"));
        create_custom_list(vue, vue.$t("generatedData.list3"));

        create_todo(vue, today_id, vue.$t("generatedData.data2"), false,"",[],"#77e785");
        create_todo(vue, today_id, vue.$t("generatedData.data3"), false,"",[],"#f9d54a");
        create_todo(vue, today_id, vue.$t("generatedData.data4"), false);
        create_todo(vue, tomorrow_id, vue.$t("generatedData.data5"), false,"",[],"#5e6ef2");

        let subtasks = [
            {text: vue.$t("generatedData.subtask1"), checked: false, editing: false},
            {text: vue.$t("generatedData.subtask2"), checked: false, editing: false},
        ];
        create_todo(vue, tomorrow_id, vue.$t("generatedData.data11"), false,vue.$t("generatedData.desc1"), subtasks, "none", "16:20");
        create_todo(vue, after_tomorrow_id, vue.$t("generatedData.data12"), false);

        create_todo(vue, custom_list1_id, vue.$t("generatedData.data6"), false);
        create_todo(vue, custom_list1_id, vue.$t("generatedData.data7"), false);
        create_todo(vue, custom_list1_id, vue.$t("generatedData.data8"), false);
        create_todo(vue, custom_list2_id, vue.$t("generatedData.data9"), false,"",[],"#ed544b");
        create_todo(vue, custom_list2_id, vue.$t("generatedData.data10"), false,"",[],"#ed56a1");
    }
};

function create_todo(vue, list_id, text, checked, desc = "", subTaskList = [], color = "none", time = null) {
    var newTodo = {
        text: text,
        checked: checked,
        listId: list_id,
        desc: desc,
        subTaskList: subTaskList,
        color: color,
        priority: 0,
        tags: [],
        time: time,
        alarm: false,
        repeatingEvent: null
    }
    vue.$store.commit('addTodo', newTodo);
    toDoListRepository.update(list_id, vue.$store.getters.todoLists[list_id]);
}

function create_custom_list(vue, name) {
    const customTodoListId = {listId: name, listName: name};
    vue.$store.commit('newCustomTodoList', customTodoListId);
    customToDoListIdsRepository.update(vue.$store.getters.cTodoListIds);
    toDoListRepository.update(customTodoListId.listId, vue.$store.getters.todoLists[customTodoListId.listId]);
    return customTodoListId.listId;
}
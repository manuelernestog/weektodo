import toDoListRepository from "../repositories/toDoListRepository";
import repeatingEventByDateRepository from "../repositories/repeatingEventByDateRepository";

export default {
  generateRepeatingEventsIntances(listId, vue) {
    let r_events = vue.$store.getters.repeatingEventDateCache[listId] || [];
    r_events.forEach((re_id) => {
      var re = vue.$store.getters.repeatingEventList[re_id];
      var re_by_date = vue.$store.getters.repeatingEventByDate[listId];
      if (!re_by_date[re_id]) {
        var new_instanced_event = JSON.parse(JSON.stringify(re.data));
        new_instanced_event.listId = listId;
        vue.$store.commit("addTodo", new_instanced_event);
        toDoListRepository.update(listId, vue.$store.getters.todoLists[listId]);
        re_by_date[re_id] = true;
        repeatingEventByDateRepository.update(listId, re_by_date);
      }
    });
  },
};

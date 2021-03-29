export default {
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clean(){
        localStorage.clear();
    },
    as_json(){
        var values = {}, keys = Object.keys(localStorage), i = keys.length;
        while (i--) {
            values[keys[i]] = localStorage.getItem(keys[i]);
        }
        return values;
    },
    load_json(data){
        localStorage.setItem('config',data['config'])
        localStorage.setItem('customTodoListIds',data['customTodoListIds'])
    },
};
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
        return JSON.stringify(values);
    },
    load_json(data){
        var keys = Object.keys(data), i = keys.length;
        while (i--) {
            localStorage.setItem(keys[i],data[keys[i]]);
        }
    }
};
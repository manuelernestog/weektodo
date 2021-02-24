export default {
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};
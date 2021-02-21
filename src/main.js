import {createApp} from 'vue';
import App from './App.vue';
import {store} from "./store/store";

import './assets/main.css'


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(store);
app.mount('#app');

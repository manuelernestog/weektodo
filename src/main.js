import {createApp} from 'vue';
import App from './App.vue';
import {store} from "./store/store";

import { createI18n } from 'vue-i18n'
import {languages} from "./assets/languages/languages.js"
const messages = Object.assign(languages);
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/style/globalVars.scss'
import './assets/style/main.scss'
import './assets/style/uiComponents.scss'

const app = createApp(App);
app.use(store);
app.use(i18n);
app.mount('#app');

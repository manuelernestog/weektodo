import {createApp} from 'vue';
import App from './App.vue';
import {store} from "./store/store";
import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js";

const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    ja: {
        message: {
            hello: 'こんにちは、世界'
        }
    },
    es: {
        message: {
            hello: 'bankayy'
        }
    }
}
// {{ $t("message.hello") }}

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'es',
    messages,
})



import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/main.css'

const app = createApp(App);
app.use(store);
app.use(i18n);
app.mount('#app');

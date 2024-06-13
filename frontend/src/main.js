// src/main.js
import { createApp } from 'vue';
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router); // Asegúrate de usar el router si lo necesitas
app.use(Quasar); // Instala Quasar

app.mount('#app');


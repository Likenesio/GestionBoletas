// src/main.js
import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import quasarUserOptions from "./quasar-user-options";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(Quasar, { plugins: { Notify }, ...quasarUserOptions });
app.mount("#app");

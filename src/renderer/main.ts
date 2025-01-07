import { createApp } from "vue";
import "./styles/element-variables.scss";
import "./styles/styles.scss";
import ElementPlus from "element-plus";
import App from "./App.vue";
import moment from "moment";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$moment = moment;

app.use(ElementPlus);
app.use(pinia);
app.mount("#app");

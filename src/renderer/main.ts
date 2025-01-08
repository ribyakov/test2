import { createApp } from "vue";
import "./styles/element-variables.scss";
import "./styles/styles.scss";
import ElementPlus from "element-plus";
import App from "./App.vue";
import moment from "moment";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import messagesRu from "./messages/messages.ru.json";
import { useMasterdata } from "./store/useMasterdata";

const i18n = createI18n({
  globalInjection: true,
  locale: "ru",
  messages: {
    ru: messagesRu,
  },
});

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$moment = moment;

app.use(ElementPlus);
app.use(i18n);
app.use(pinia);
app.mount("#app");
void useMasterdata().get();

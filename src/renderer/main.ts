import { createApp } from "vue";
import "./styles/element-variables.scss";
import "./styles/styles.scss";
import ElementPlus from "element-plus";
import App from "./App.vue";
import locale from "element-plus/es/locale/lang/de";

const app = createApp(App);

app.use(ElementPlus, {
  locale,
});
app.mount("#app");

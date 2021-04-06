import { createApp } from 'vue'
import App from './App.vue';
import { router } from './router';
import axios from 'axios';
import './assets/base.css';
/** 加载组件 **/
import { 
    ElRow,
    ElCol,
    ElHeader,
    ElMenu,
    ElMenuItem,
    ElButton,
    ElTable,
    ElTableColumn,
    ElLink,
    ElDialog,
    ElCard,
    ElForm,
    ElFormItem,
    ElInput 
} from 'element-plus';
  
const app = createApp(App);

app.use(ElRow);
app.use(ElCol);
app.use(ElHeader);
app.use(ElMenu);
app.use(ElMenuItem);
app.use(ElButton);
app.use(ElLink);
app.use(ElTable);
app.use(ElTableColumn);
app.use(ElDialog);
app.use(ElCard);
app.use(ElForm);
app.use(ElFormItem);
app.use(ElInput);

let protocol = window.location.protocol;
let host = window.location.host;
let port = window.location.port;
let reg = /^9086+/;
if(!reg.test(port)) {
    axios.defaults.baseURL = 'http://127.0.0.1/';
} else {
    axios.defaults.baseURL = protocol + "//" + host + ":9086";
}
axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');
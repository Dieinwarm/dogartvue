import { createApp } from 'vue'
import App from './App.vue';
import { router } from './router';
import axios from 'axios';
import './assets/base.css';
/** 加载组件 **/
import { ElRow } from 'element-plus';
import { ElCol } from 'element-plus';
import { ElHeader } from 'element-plus';
import { ElMenu } from 'element-plus';
import { ElMenuItem } from 'element-plus';
import { ElButton } from 'element-plus';
import { ElLink } from 'element-plus';
import { ElDialog } from 'element-plus';
import { ElCard } from 'element-plus';
import { ElForm } from 'element-plus';
import { ElFormItem } from 'element-plus';
import { ElInput } from 'element-plus';
  
const app = createApp(App);

app.use(ElRow);
app.use(ElCol);
app.use(ElHeader);
app.use(ElMenu);
app.use(ElMenuItem);
app.use(ElButton);
app.use(ElLink);
app.use(ElDialog);
app.use(ElCard);
app.use(ElForm);
app.use(ElFormItem);
app.use(ElInput);

let protocol = window.location.protocol;
let host = window.location.host;
let reg = /^localhost+/;
if(reg.test(host)) {
	axios.defaults.baseURL = 'http://127.0.0.1/';
} else {
	axios.defaults.baseURL = protocol + "//" + host;
}
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');
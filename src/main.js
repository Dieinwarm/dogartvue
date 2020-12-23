import { createApp } from 'vue'
import { ElMenu } from 'element-plus';
import App from './App.vue';
import { router } from './router';
import './assets/base.css';

const app = createApp(App);
app.use(router);

/** 加载需要用到的组件 **/
app.use(ElMenu);

/** 挂载节点 **/
app.mount('#app');
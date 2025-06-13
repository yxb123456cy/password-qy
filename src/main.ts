import {createApp} from 'vue'
import './style.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue'
import router from "./router";

const app = createApp(App);
// 完整引入ArcoVue;
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app')

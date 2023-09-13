import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './routers';
import { createPinia } from 'pinia';

import { veeValidatePlugin } from './plugins/veeValidate/veePlugin';
// import { loadingPlugin } from './plugins/loading/index'

const app = createApp(App);

app.use(router).use(createPinia()).use(veeValidatePlugin).mount('#app');

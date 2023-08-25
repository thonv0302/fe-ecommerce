import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './routers';
import { createPinia } from 'pinia';

import { veeValidatePlugin } from './plugins/veeValidate/veePlugin';

const app = createApp(App);

app.use(router).use(createPinia()).use(veeValidatePlugin).mount('#app');

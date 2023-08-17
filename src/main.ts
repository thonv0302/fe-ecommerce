import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './routers';

import { veeValidatePlugin } from './plugins/veeValidate/veePlugin';

createApp(App).use(router).use(veeValidatePlugin).mount('#app');

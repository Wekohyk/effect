import { createApp } from 'vue';
// pinia and pinia-plugin-persistedstate
import pinia from './stores';
// vue-router
import router from './router';
// i18n
import i18n from './lang';
/**
 * Import the Unocss core styles
 * Best placed after reset style, before uno.css
 */
import './assets/styles/index.scss';
// Import the Unocss utilities styles
import 'uno.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// App
import App from './App.vue';

const app = createApp(App);

app.use(pinia);
app.use(ElementPlus);
app.use(i18n);
app.use(router);
app.mount('#app');

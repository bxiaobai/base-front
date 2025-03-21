import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import './permission';
app.use(createPinia())
app.use(router)
app.use(TDesign);
app.mount('#app')


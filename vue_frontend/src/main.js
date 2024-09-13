import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Set Axios default base URL (your Laravel backend URL)
axios.defaults.baseURL = 'http://localhost:8000/api';
app.config.globalProperties.$http = axios;

app.use(router);
app.mount('#app');

import './assets/main.css'

// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vue-toastification/dist/index.css'; // Import the styles
import Toast from 'vue-toastification';

const app = createApp(App);

app.use(Toast); 
app.use(router); 


app.mount('#app');

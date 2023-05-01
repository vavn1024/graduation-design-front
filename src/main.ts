import { createApp } from 'vue'


import App from './App.vue'
import tool from '@/utils/localStorage'
import { Message } from '@arco-design/web-vue';
import {router} from './router'
import {store} from "@/stores";
import './assets/main.css'


const app = createApp(App)
Message._context=app._context;
app.use(tool)
app.use(store)
app.use(router)

app.mount('#app')

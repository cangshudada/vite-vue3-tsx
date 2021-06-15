import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(router).use(store).mount('#app')

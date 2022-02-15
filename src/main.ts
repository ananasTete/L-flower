import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'normalize.css'
import useGlobal from './global'
import { useUserStore } from '@/store/User'

const pinia = createPinia()
const userStore = useUserStore(pinia)

const app = createApp(App)

useGlobal(app)

app.use(router).use(pinia).mount('#app')

userStore.resetLoginInfo()

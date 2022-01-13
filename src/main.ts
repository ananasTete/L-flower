import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import useGlobal from './global'

const app = createApp(App)

useGlobal(app)

app.use(router).mount('#app')

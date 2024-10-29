import axios from 'axios'
import App from './App.vue'
import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'

// Axios
axios.defaults.withXSRFToken = true
axios.defaults.withCredentials = true
axios.defaults.baseURL = String(import.meta.env.VITE_API_URL)

axios.interceptors.request.use(function (config) {
    if (!['/sanctum/csrf-cookie', '/login', '/logout'].includes(String(config.url))) {
        config.url = `/api${config.url}`
    }

    return config
})

// App
const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')
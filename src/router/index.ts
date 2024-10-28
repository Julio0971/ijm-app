import { nextTick } from 'vue'
import { useStore } from '../store'
import type { User } from '../interfaces'
import { useAxiosRequest } from '../composables'
import { createRouter, createWebHashHistory } from 'vue-router'

const history = createWebHashHistory(import.meta.env.BASE_URL)

const routes = [
    { path: '/', name: 'root', redirect: '/login' },
    { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { title: 'Login' } },
    { path: '/', component: () => import('../layouts/Layout.vue'), children: [
        { path: '/home', name: 'home', component: () => import('../views/Home.vue'), meta: { title: 'Inicio' } },
    ]}
]

export const router = createRouter({ history, routes })

router.beforeEach(async (to, _from) => {
    const store = useStore()

    try {
        const response = await useAxiosRequest('get', '/check')

        store.user = response.user as User

        if (to.name == 'login') {
            return { name: 'home' }
        }
    } catch (error) {
        if (to.name != 'login') {
            return { name: 'login' }
        }
    }
})

router.afterEach((to) => {
    const title = 'RH Sur'

    nextTick(() => {
        document.title = `${title} - ${to.meta.title}` || title
    })
})
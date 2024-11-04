import { nextTick } from 'vue'
import { useStore } from '../store'
import type { User } from '../interfaces'
import { useAxiosRequest } from '../composables'
import { createRouter, createWebHashHistory } from 'vue-router'

const history = createWebHashHistory(import.meta.env.BASE_URL)

const routes = [
    { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { title: 'Login' } },
    { path: '/', component: () => import('../layouts/Layout.vue'), children: [
        { path: '/', name: 'home', component: () => import('../views/Home.vue'), meta: { title: 'Estudio' } },
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { title: 'Dashboard' } },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue'), meta: { title: 'Página no encontrada' } },
    ]},
]

export const router = createRouter({ history, routes })

router.beforeEach(async (to, _from) => {
    const store = useStore()

    try {
        const response = await useAxiosRequest('get', '/check')

        store.user = response.user as User

        if (to.name != 'dashboard') {
            return { name: 'dashboard' }
        }
    } catch (error) {
        if (to.name == 'dashboard') {
            return { name: 'login' }
        }
    }
})

router.afterEach((to) => {
    const title = 'IJM'

    nextTick(() => {
        document.title = `${title} - ${to.meta.title}` || title
    })
})
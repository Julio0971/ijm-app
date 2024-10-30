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
        { path: '/dilemma', name: 'dilemma', component: () => import('../views/Dilemma.vue'), meta: { title: 'Dilema' } },
        { path: '/thank-you', name: 'thank-you', component: () => import('../views/ThankYou.vue'), meta: { title: 'Gracias' } },
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { title: 'Dashboard' } },
        { path: '/instructions', name: 'instructions', component: () => import('../views/Instructions.vue'), meta: { title: 'Instrucciones' } },
        { path: '/notice', name: 'notice', component: () => import('../views/Notice.vue'), meta: { title: 'Carta de consentimiento informado ' } },
        { path: '/subject', name: 'subject', component: () => import('../views/Subject.vue'), meta: { title: 'Cuestionario de información demográfica' } },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue'), meta: { title: 'Página no encontrada' } },
    ]},
]

export const router = createRouter({ history, routes })

router.beforeEach(async (to, _from) => {
    const store = useStore()

    try {
        const response = await useAxiosRequest('get', '/check')

        store.user = response.user as User

        if (store.user.role == 'admin' && (to.name == 'login' || to.name != 'dashboard')) {
            return { name: 'dashboard' }
        } else if (store.user.role == 'participant' && (to.name == 'login' || to.name != store.user.step)) {
            return { name: store.user.step ?? '' }
        }
    } catch (error) {
        if (to.name != 'login') {
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
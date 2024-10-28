<!-- <script setup lang="ts">
import { useStore } from '../store'
import type { AxiosError } from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAxiosErrors, useAxiosRequest } from '../composables'

const store = useStore()
const route = useRoute()
const router = useRouter()

const logout = async () => {
    try {
        await useAxiosRequest('post', '/logout')

        router.push({ name: 'login' })
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    }
}
</script> -->

<template>
    <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" />
        </Transition>
    </RouterView>
    
    <!-- <main>
        <nav class="navbar is-spaced is-link">
            <div class="navbar-brand">
                <a class="navbar-burger">
                    <span />
                    <span />
                    <span />
                    <span />
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <a :class="{ 'navbar-item': true, 'is-active': route.name == 'employees' }">
                        Empleados
                    </a>
                </div>
                
                <div class="navbar-end">
                    <ThemeDropdown />

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" v-text="store.user.name" />

                        <div class="navbar-dropdown is-right">
                            <a class="navbar-item">
                                Perfil
                            </a>
                            
                            <a class="navbar-item" @click="logout">
                                Cerrar sesión
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="section">
            <RouterView v-slot="{ Component }">
                <Transition name="fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </div>
    </main> -->
</template>
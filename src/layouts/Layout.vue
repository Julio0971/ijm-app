<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store'
import type { AxiosError } from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAxiosErrors, useAxiosRequest } from '../composables'

const store = useStore()
const route = useRoute()
const router = useRouter()

const loading = ref(false)

const logout = async () => {
    loading.value = true

    try {
        await useAxiosRequest('post', '/logout')

        router.push({ name: 'login' })
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = false
    }
}

const updateStep = async (step: 'home' | 'notice' | 'subject' | 'instructions' | 'dilemma' | 'thank-you') => {
    loading.value = true

    try {
        await useAxiosRequest('put', '/users/update-step', { step })

        router.push({ name: step })
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <v-app :class="{ 'bg-general': route.name != 'thank-you', 'bg-thank-you': route.name == 'thank-you' }">
        <v-layout>
            <v-app-bar flat style="background-color: transparent;" v-if="route.name != 'thank-you'">
                <v-spacer />

                <v-menu>
                    <template #activator="{ props }">
                        <v-btn
                            v-bind="props"
                            class="text-capitalize"
                        >
                            <template #prepend>
                                <v-icon size="small" icon="fas fa-user" />
                            </template>
                            {{ store.user.name }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item value="logout" @click="logout">
                            <v-list-item-title>
                                Cerrar sesión
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>

            <v-main class="d-flex align-center justify-center">
                <v-container>
                    <v-row justify="center">
                        <RouterView v-slot="{ Component }">
                            <Transition name="fade" mode="out-in">
                                <component
                                    :is="Component"
                                    :loading="loading"
                                    @logout="logout"
                                    @update-step="updateStep"
                                />
                            </Transition>
                        </RouterView>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>

        <v-snackbar
            location="right bottom"
            :color="store.snackbar_type"
            v-model="store.show_snackbar"
            :timeout="store.snackbar_type == 'success' ? 3000 : -1"
        >
            {{ store.snackbar_text }}

            <template v-slot:actions v-if="store.snackbar_type == 'error'">
                <v-btn @click="store.show_snackbar = false">
                    <v-icon icon="fas fa-times" />
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>
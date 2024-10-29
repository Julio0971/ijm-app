<script setup lang="ts">
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
</script>

<template>
    <v-app :class="{ 'bg-general': route.name != 'thank-you', 'bg-final': route.name == 'thank-you' }">
        <v-layout class="rounded rounded-md">
            <v-app-bar flat style="background-color: transparent;">
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
                        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
                            <RouterView v-slot="{ Component }">
                                <Transition name="fade" mode="out-in">
                                    <component :is="Component" />
                                </Transition>
                            </RouterView>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
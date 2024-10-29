<script setup lang="ts">
import { useStore } from '../store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
</script>

<template>
    <div>
        <h2 class="text-h2 mb-3 text-center text-white">
            Página no encontrada
        </h2>
    
        <div class="d-flex justify-center">
            <v-btn
                rounded="pill"
                class="text-none"
                color="secondary"
                @click="router.push({ name: store.user.step })"
            >
                Continuar
            </v-btn>
        </div>
    </div>
</template>
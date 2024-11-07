<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div>
        <h2 class="text-h2 mb-3 text-center text-white">
            Página no encontrada
        </h2>
    
        <div class="d-flex justify-center">
            <v-btn
                rounded
                class="text-none"
                color="secondary"
                @click="router.push({ name: 'home' })"
            >
                Ir al inicio
            </v-btn>
        </div>
    </div>
</template>
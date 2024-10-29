<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div>
        <v-img src="/images/logo.svg" height="158" class="mb-6" />

        <h4 class="text-h4 mb-3 text-center text-white">
            Investigación sobre juicios morales
        </h4>

        <h6 class="text-h6 mb-3 text-center text-white">
            Gracias por tu valiosa participación
        </h6>

        <div class="d-flex justify-center">
            <v-btn
                rounded="pill"
                class="text-none"
                color="secondary"
                @click="router.push({ name: 'notice' })"
            >
                Iniciar
            </v-btn>
        </div>
    </div>
</template>
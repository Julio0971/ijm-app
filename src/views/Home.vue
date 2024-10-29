<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div>
        <v-img src="/images/logo.svg" height="158" class="mb-6" />

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
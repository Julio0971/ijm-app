<script setup lang="ts">
const emit = defineEmits<{
    (e: 'updateStep', step: 'notice'): void
}>()
</script>

<template>
    <v-col class="text-center text-white">
        <v-img src="/images/logo.svg" height="158" class="mb-6" />

        <h4 class="text-h4 mb-3">
            Investigación sobre juicios morales
        </h4>

        <h6 class="text-h6 mb-3">
            Gracias por tu valiosa participación
        </h6>

        <div class="d-flex justify-center">
            <v-btn
                rounded
                class="text-none"
                color="secondary"
                @click="emit('updateStep', 'notice')"
            >
                Iniciar
            </v-btn>
        </div>
    </v-col>
</template>
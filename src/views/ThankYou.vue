<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>()

const emit = defineEmits<{
    (e: 'logout'): void
}>()
</script>

<template>
    <v-col class="text-center text-white">
        <h2 class="text-h2 mb-3">
            ¡Gracias!
        </h2>
    
        <h4 class="text-h4 mb-3">
            Por tu valiosa participación
        </h4>
    
        <div class="d-flex justify-center">
            <v-btn
                rounded="pill"
                class="text-none"
                color="secondary"
                :loading="props.loading"
                @click="emit('logout')"
            >
                Salir
            </v-btn>
        </div>
    </v-col>
</template>
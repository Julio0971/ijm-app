<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>()

const emit = defineEmits<{
    (e: 'updateStep', step: 'home' | 'notice' | 'subject' | 'instructions' | 'dilemma' | 'thank-you'): void
}>()
</script>

<template>
    <v-col cols="12" sm="9" md="7" lg="5" xl="3">
        <v-card>
            <v-card-title>
                Instrucciones
            </v-card-title>
    
            <v-card-text class="text-justify">
                <p class="mb-3">
                    A continuación, verás una serie de tres videos breves. 
                </p>
                
                <p class="mb-3">
                    Después de cada video, te haremos una pregunta relacionada con lo que has visto.
                </p>
                
                <p class="mb-3">
                    Por favor, responde honestamente con "Sí" o "No" según lo que consideres apropiado en cada situación.
                </p>
                
                <p class="mb-3">
                    Recuerda que no hay respuestas correctas o incorrectas. Lo importante es tu opinión personal.
                </p>
                
                <p class="mb-3">
                    Asegúrate de estar en un lugar cómodo y sin compañía.
                </p>
                
                <p class="mb-3">
                    Cuando estés listo/a, haz clic en "Continuar" para comenzar.
                </p>
    
                <div class="d-flex justify-end mt-6">
                    <v-btn
                        rounded="pill"
                        color="primary"
                        class="text-none"
                        :loading="props.loading"
                        @click="emit('updateStep', 'dilemma')"
                    >
                        Continuar
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-col>
</template>
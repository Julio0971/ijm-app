<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>()

const emit = defineEmits<{
    (e: 'updateStep', step: 'home' | 'notice' | 'subject' | 'instructions' | 'dilemma' | 'thank-you'): void
}>()
</script>

<template>
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card>
            <v-card-title>
                Carta de Consentimiento Informado
            </v-card-title>
    
            <v-card-text class="text-justify">
                <p class="font-weight-bold mb-3">
                    Investigación sobre: Procesos Cognitivos y Juicios Morales
                </p>
    
                <p class="font-weight-bold mb-3">
                    Investigadores:
                </p>
                
                <p class="mb-3">
                    Dr. Jonathan Isaac Flores Ascencio
                </p>
    
                <p class="mb-3">
                    Dr. Juan Gerardo Martínez Borrayo
                </p>
                
                <p class="mb-3">
                    Estimado/a participante:
                </p>
                
                <p class="mb-3">
                    Le agradecemos su interés en participar en nuestro estudio de investigación. Este estudio tiene como objetivo explorar cómo las personas toman decisiones en situaciones que involucran dilemas morales. Su participación es completamente voluntaria y puede retirarse en cualquier momento sin ningún tipo de repercusión.
                </p>
                
                <p class="mb-3">
                    <strong>
                        Procedimiento:
                    </strong>
                    Si decide participar, se le pedirá que complete una serie de preguntas en línea relacionadas con situaciones hipotéticas. No se requiere ningún conocimiento previo y su participación no debería tomar más de 10 minutos.
                </p>
                
                <p class="mb-3">
                    <strong>
                        Confidencialidad:
                    </strong>
                    Toda la información que proporcione será tratada de forma confidencial y se utilizará únicamente para fines de investigación. Sus respuestas se almacenarán de manera segura y se presentarán de forma agregada en los resultados del estudio, sin ninguna identificación personal.
                </p>
                
                <p class="mb-3">
                    <strong>
                        Riesgos:
                    </strong>
                    Su participación no conlleva ningún riesgo. Sin embargo, si en algún momento se siente incómodo/a, tiene la libertad de abandonar el estudio.
                </p>
                
                <p class="mb-3">
                    <strong>
                        Consentimiento:
                    </strong>
                    Al continuar con este estudio, usted indica que ha leído y comprende la información anterior y que acepta participar.
                </p>
                
                <p class="mb-3">
                    Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nosotros.
                </p>
                
                <p class="mb-3">
                    Agradecemos su tiempo y colaboración.
                </p>
    
                <div class="d-flex justify-space-between mt-6">
                    <v-btn
                        color="info"
                        rounded="pill"
                        class="text-none"
                        :loading="props.loading"
                        @click="emit('updateStep', 'subject')"
                    >
                        Acepto participar
                    </v-btn>
                    
                    <v-btn
                        rounded="pill"
                        color="primary"
                        class="text-none"
                        :loading="props.loading"
                        @click="emit('updateStep', 'home')"
                    >
                        No acepto participar
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-col>
</template>
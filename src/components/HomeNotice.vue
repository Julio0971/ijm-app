<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const emit = defineEmits<{
    (e: 'updateStep', step: 'home' | 'subject'): void
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
                    <v-badge content="1" color="primary">
                        Dr. Jonathan Isaac Flores Ascencio &nbsp;&nbsp
                    </v-badge>
                </p>
                
                <p class="mb-3">
                    <v-badge content="2" color="primary">
                        Dr. Juan Gerardo Martínez Borrayo &nbsp;&nbsp
                    </v-badge>
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
                        Sugerencia:
                    </strong>
                    Asegúrate de estar en un lugar cómodo y que nadie te vaya a interrumpir durante los próximos 10 minutos. Te recomendamos utilizar audífonos durante el estudio ya que verás tres videos cortos y es indispensable que comprendas bien las narraciones.
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

                <v-divider class="mb-3" />
                
                <p class="mb-3 text-caption text-left">
                    1. Departamento de Ciencias Sociales y Humanidades del Centro Universitario de los Valles de la Universidad de Guadalajara:
                    <a href="mailto:jonathan.flores6716@academicos.udg.mx" class="text-info text-decoration-none font-weight-bold">
                        jonathan.flores6716@academicos.udg.mx
                    </a>
                </p>
                
                <p class="mb-3 text-caption text-left">
                    2. Departamento de Neurociencias del Centro Universitario de Ciencias de la Salud de la Universidad de Guadalajara:
                    <a href="mailto:juan.mborrayo@academicos.udg.mx" class="text-info text-decoration-none font-weight-bold">
                        juan.mborrayo@academicos.udg.mx
                    </a>
                </p>

                <v-row justify="space-between" class="mt-6">
                    <v-col cols="12" sm="6">
                        <v-btn
                            rounded
                            color="info"
                            :block="mobile"
                            class="text-none"
                            @click="emit('updateStep', 'subject')"
                        >
                            Acepto participar
                        </v-btn>
                    </v-col>
                    
                    <v-col cols="12" sm="6">
                        <div class="d-flex justify-end">
                            <v-btn
                                rounded
                                color="primary"
                                :block="mobile"
                                class="text-none"
                                @click="emit('updateStep', 'home')"
                            >
                                No acepto participar
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
</template>
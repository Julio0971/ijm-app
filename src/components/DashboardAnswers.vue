<script setup lang="ts">
import { Answer } from '../interfaces'
import ModalDialog from './ModalDialog.vue'
import { toDateTime, toMinutesSeconds } from '../composables'

const props = defineProps<{
    show: boolean
    answers: Answer[]
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()
</script>

<template>
    <ModalDialog
        :show="props.show"
        title="Cuestionario de información demográfica"
        @close="emit('close')"
    >
        <v-table>
            <thead>
                <tr>
                    <th class="text-center">
                        Fecha y hora
                    </th>
                    <th class="text-center">
                        Pregunta
                    </th>
                    <th class="text-center">
                        Respuesta
                    </th>
                    <th class="text-center">
                        Tiempo en responder
                    </th>
                    <th class="text-center">
                        Respondido a tiempo
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="answer in answers" :key="answer.id" class="text-center">
                    <td v-text="toDateTime(answer.created_at)" />
                    <td v-text="answer.question.name" />
                    <td v-text="answer.answer" />
                    <td v-text="toMinutesSeconds(answer.in_time ? (20 - answer.seconds) : answer.seconds)" />
                    <td>
                        <v-icon icon="fas fa-check" color="success" v-if="answer.in_time" />
                        <v-icon icon="fas fa-times" color="error" v-else />
                    </td>
                </tr>
            </tbody>
        </v-table>
    </ModalDialog>
</template>
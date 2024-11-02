<script setup lang="ts">
import { Subject } from '../interfaces';
import ModalDialog from './ModalDialog.vue';

const props = defineProps<{
    show: boolean
    subject: Subject
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
        <v-list lines="two" class="pt-0">
            <v-list-item title="Sexo" :subtitle="props.subject.gender" />
            <v-list-item title="Edad" :subtitle="props.subject.age" />
            <v-list-item title="Carrera" :subtitle="props.subject.speciality" />
            <v-list-item title="Grado" :subtitle="props.subject.grade" />
            <v-list-item title="¿Has participado antes en estudios con dilemas morales?" :subtitle="props.subject.participated_before ? 'Sí' : 'No'" />
        </v-list>
    </ModalDialog>
</template>
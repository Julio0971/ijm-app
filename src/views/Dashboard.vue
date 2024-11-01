<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { Header, Subject } from '../interfaces'
import ModalDialog from '../components/ModalDialog.vue'
import { toDateTime, toMinutesSeconds, useAxiosErrors, useAxiosRequest } from '../composables'

const headers = ref([
    {
        title: 'Fecha y hora',
        key: 'answer.created_at',
        align: 'center',
        sortable: false
    },
    {
        title: 'Sujeto',
        key: 'id',
        align: 'center',
        sortable: false
    },
    {
        title: 'Grupo',
        key: 'answer.question.name',
        align: 'center',
        sortable: false
    },
    {
        title: 'Respuesta',
        key: 'answer.answer',
        align: 'center',
        sortable: false
    },
    {
        title: 'Tiempo en responder',
        key: 'answer.seconds',
        align: 'center',
        sortable: false
    },
    {
        title: 'Respondido a tiempo',
        key: 'answer.in_time',
        align: 'center',
        sortable: false
    },
    {
        title: 'Encuesta',
        key: 'survey',
        align: 'center',
        sortable: false
    }
] as Header[])

const loading = ref(true)
const items_length = ref(0)
const items_per_page = ref(0)
const show_survey = ref(false)
const items = ref([] as Subject[])
const subject_survey = ref({} as Subject)

const getItems = async () => {
    loading.value = true

    try {
        const response = await useAxiosRequest('get', '/subjects')

        items_length.value = response.total
        items.value = response.data as Subject[]
        items_per_page.value = response.per_page as number
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = false
    }
}

const showSurvey = (subject: Subject) => {
    show_survey.value = true
    subject_survey.value = subject
}
</script>

<template>
    <v-col cols="12" md="10" lg="8" xl="6">
        <v-card>
            <v-card-text>
                <v-data-table-server
                    :items="items"
                    :headers="headers"
                    :loading="loading"
                    :items-length="items_length"
                    v-model:items-per-page="items_per_page"
                    @update:options="getItems"
                >
                    <template v-slot:loading>
                        <v-skeleton-loader :type="`table-row@${ headers.length }`" />
                    </template>
    
                    <template v-slot:item="{ item }">
                        <tr class="text-center">
                            <td v-text="toDateTime(item.answer.created_at)" />
                            <td v-text="item.id" />
                            <td v-text="item.answer.question.name" />
                            <td v-text="item.answer.answer" />
                            <td v-text="toMinutesSeconds(item.answer.in_time ? (20 - item.answer.seconds) : item.answer.seconds)" />
                            <td>
                                <v-icon icon="fas fa-check" color="success" v-if="item.answer.in_time" />
                                <v-icon icon="fas fa-times" color="error" v-else />
                            </td>
                            <td>
                                <v-btn
                                    rounded="pill"
                                    color="primary"
                                    class="text-none"
                                    @click="showSurvey(item)"
                                >
                                    Ver
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table-server>
            </v-card-text>
            
            <ModalDialog
                :show="show_survey"
                title="Cuestionario de información demográfica"
                @close="show_survey = false"
            >
                <v-list lines="two" class="pt-0">
                    <v-list-item title="Sexo" :subtitle="subject_survey.gender" />
                    <v-list-item title="Edad" :subtitle="subject_survey.age" />
                    <v-list-item title="Carrera" :subtitle="subject_survey.speciality" />
                    <v-list-item title="Grado" :subtitle="subject_survey.grade" />
                    <v-list-item title="¿Has participado antes en estudios con dilemas morales?" :subtitle="subject_survey.participated_before ? 'Sí' : 'No'" />
                </v-list>
            </ModalDialog>
        </v-card>
    </v-col>
</template>
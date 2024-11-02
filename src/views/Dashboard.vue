<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { Answer, Header, Subject } from '../interfaces'
import DashboardSurvey from '../components/DashboardSurvey.vue'
import DashboardAnswers from '../components/DashboardAnswers.vue'
import { toDateTime, toMinutesSeconds, useAxiosErrors, useAxiosRequest } from '../composables'

const headers = ref([
    {
        title: 'Fecha y hora',
        key: 'question.answer.created_at',
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
        key: 'question.name',
        align: 'center',
        sortable: false
    },
    {
        title: 'Respuesta',
        key: 'question.answer.answer',
        align: 'center',
        sortable: false
    },
    {
        title: 'Tiempo en responder',
        key: 'question.answer.seconds',
        align: 'center',
        sortable: false
    },
    {
        title: 'Respondido a tiempo',
        key: 'question.answer.in_time',
        align: 'center',
        sortable: false
    },
    {
        title: 'Preguntas entrenadoras',
        key: 'answers',
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
const show_answers = ref(false)
const items = ref([] as Subject[])
const answers = ref([] as Answer[])
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

const showAnswers = (subject: Subject) => {
    show_answers.value = true
    answers.value = subject.answers.filter(a => a.question.id != subject.question.id)
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
                            <td v-text="toDateTime(item.question.answer.created_at)" />
                            <td v-text="item.id" />
                            <td v-text="item.question.name" />
                            <td v-text="item.question.answer.answer" />
                            <td v-text="toMinutesSeconds(item.question.answer.in_time ? (20 - item.question.answer.seconds) : item.question.answer.seconds)" />
                            <td>
                                <v-icon icon="fas fa-check" color="success" v-if="item.question.answer.in_time" />
                                <v-icon icon="fas fa-times" color="error" v-else />
                            </td>
                            <td>
                                <v-btn
                                    rounded="pill"
                                    color="primary"
                                    class="text-none"
                                    @click="showAnswers(item)"
                                >
                                    Ver
                                </v-btn>
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

            <DashboardSurvey
                :show="show_survey"
                :subject="subject_survey"
                @close="show_survey = false"
            />
            
            <DashboardAnswers
                :answers="answers"
                :show="show_answers"
                @close="show_answers = false"
            />
        </v-card>
    </v-col>
</template>
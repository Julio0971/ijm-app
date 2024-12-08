<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { Answer, Header, Subject } from '../interfaces'
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

const emit = defineEmits<{
    (e: 'showSurvey', subject: Subject): void
    (e: 'showAnswers', subject: Subject): void
}>()

const loading = ref(true)
const items_length = ref(0)
const items_per_page = ref(0)
const items = ref([] as Subject[])

const getItems = async (pagination: { page: number, itemsPerPage: number }) => {
    loading.value = true

    try {
        const response = await useAxiosRequest('get', `/subjects?page=${ pagination.page }&per_page=${ pagination.itemsPerPage }`)

        items_length.value = response.total
        items.value = response.data as Subject[]
        items_per_page.value = response.per_page as number
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = false
    }
}

const getAnswer = (subject: Subject) => {
    const answer = subject.answers.find(a => a.question.id == subject.question.id)

    if (answer) {
        return answer
    }

    return {} as Answer
}
</script>

<template>
    <v-data-table-server
        :items="items"
        :headers="headers"
        :loading="loading"
        :items-length="items_length"
        v-model:items-per-page="items_per_page"
        @update:options="getItems"
    >
        <template v-slot:loading>
            <v-skeleton-loader :type="`table-row@${ items_per_page }`" />
        </template>

        <template v-slot:item="{ item }">
            <tr class="text-center">
                <td v-text="toDateTime(getAnswer(item).created_at)" />
                <td v-text="item.id" />
                <td v-text="item.question.name" />
                <td v-text="getAnswer(item).answer ?? '---'" />
                <td v-text="getAnswer(item).seconds ? toMinutesSeconds(getAnswer(item).in_time ? (20 - getAnswer(item).seconds) : getAnswer(item).seconds) : '---'" />
                <td>
                    <v-icon icon="fas fa-check" color="success" v-if="getAnswer(item).in_time && getAnswer(item).in_time == 1" />
                    <v-icon icon="fas fa-times" color="error" v-else-if="getAnswer(item).in_time && getAnswer(item).in_time == 0" />
                    <span v-else>
                        ---
                    </span>
                </td>
                <td>
                    <v-btn
                        rounded
                        color="primary"
                        class="text-none"
                        @click="emit('showAnswers', item)"
                    >
                        Ver
                    </v-btn>
                </td>
                <td>
                    <v-btn
                        rounded
                        color="primary"
                        class="text-none"
                        @click="emit('showSurvey', item)"
                    >
                        Ver
                    </v-btn>
                </td>
            </tr>
        </template>
    </v-data-table-server>
</template>
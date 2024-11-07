<script setup lang="ts">
import { AxiosError } from 'axios'
import { useStore } from '../store'
import { Question } from '../interfaces'
import { onMounted, ref, useTemplateRef } from 'vue'
import { toMinutesSeconds, useAxiosErrors, useAxiosRequest } from '../composables'

const emit = defineEmits<{
    (e: 'updateStep', step: 'thank-you'): void
}>()

const store = useStore()
const video = useTemplateRef('video')

const seconds = ref(20)
const interval = ref(0)
const in_time = ref(true)
const show_timer = ref(false)
const show_play_button = ref(true)
const loading = ref('getting-video')
const question = ref({} as Question)
const current_question_index = ref(0)
const api_url = String(import.meta.env.VITE_API_URL)
const questions = ref(['Camino al trabajo', 'La cena', store.question_name])

const getQuestion = async () => {
    loading.value = 'getting-video'

    try {
        const response = await useAxiosRequest('get', `/questions/${ questions.value[current_question_index.value] }`)

        seconds.value = 20
        in_time.value = true
        show_timer.value = false
        show_play_button.value = true
        question.value = response.question as Question
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = ''
    }
}

const play = () => {
    video.value?.play()
    show_play_button.value = false
}

const setTimer = () => {
    show_timer.value = true
    interval.value = setInterval(() => {
        seconds.value = seconds.value - 1

        if (seconds.value == 0) {
            clearInterval(interval.value)

            in_time.value = false

            setStopwatch()
        }
    }, 1000)
}

const setStopwatch = () => interval.value = setInterval(() => {
    seconds.value = seconds.value + 1

    if (seconds.value == 3599) {
        clearInterval(interval.value)
    }
}, 1000)

const answer = async (answer: string) => {
    loading.value = `saving-answer-${ answer }`

    clearInterval(interval.value)

    const data = {
        answer,
        seconds: seconds.value,
        in_time: in_time.value,
        subject_id: store.subject_id,
        question_id: question.value.id,
    }

    try {
        await useAxiosRequest('post', '/answers', data)

        if (current_question_index.value == questions.value.length - 1) {
            emit('updateStep', 'thank-you')
        } else {
            current_question_index.value++

            getQuestion()
        }
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = ''
    }
}

onMounted(() => getQuestion())
</script>

<template>
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <Transition name="fade" mode="out-in">
            <v-skeleton-loader v-if="loading == 'getting-video'" type="image, button" color="primary" />
    
            <div v-else>
                <video
                    ref="video"
                    class="w-100 mb-4"
                    :src="`${ api_url }/storage/${ question.video }`"
                    @ended="setTimer"
                >
                    Tu navegador no soporta la etiqueta de video
                </video>
    
                <Transition name="fade" mode="out-in">
                    <v-container v-if="show_timer">
                        <v-row>
                            <v-col cols="12" md="2">
                                <p
                                    v-text="toMinutesSeconds(seconds)"
                                    :class="{ 'text-h5': true, 'text-white': in_time, 'text-error': in_time == false }"
                                />
                            </v-col>
                            
                            <v-col cols="12" md="7">
                                <p class="text-white text-h6" v-text="question.question" />
                            </v-col>
    
                            <v-col cols="12" md="3">
                                <div class="d-flex justify-space-between">
                                    <v-btn
                                        rounded
                                        color="primary"
                                        :loading="loading == 'saving-answer-Sí'"
                                        :disabled="loading == 'saving-answer-No'"
                                        @click="answer('Sí')"
                                    >
                                        Sí
                                    </v-btn>
    
                                    <v-btn
                                        rounded
                                        color="primary"
                                        :loading="loading == 'saving-answer-No'"
                                        :disabled="loading == 'saving-answer-Sí'"
                                        @click="answer('No')"
                                    >
                                        No
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
    
                    <div class="d-flex justify-center" v-else>
                        <Transition name="fade" mode="out-in">
                            <v-btn
                                rounded
                                color="primary"
                                class="text-none"
                                v-if="show_play_button"
                                @click="play"
                            >
                                Iniciar
                            </v-btn>
                        </Transition>
                    </div>
                </Transition>
            </div>
        </Transition>
    </v-col>
</template>
<script setup lang="ts">
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { Question } from '../interfaces'
import { onMounted, ref, useTemplateRef } from 'vue'
import { toMinutesSeconds, useAxiosErrors, useAxiosRequest } from '../composables'

const router = useRouter()
const video = useTemplateRef('video')

const seconds = ref(20)
const interval = ref(0)
const in_time = ref(true)
const show_timer = ref(false)
const loading = ref('getting-video')
const question = ref({} as Question)
const api_url = String(import.meta.env.VITE_API_URL)

const getSubjectQuestion = async () => {
    loading.value = 'getting-video'

    try {
        const response = await useAxiosRequest('get', '/questions/get-subject-question')

        question.value = response.question as Question
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = ''
    }
}

const play = () => video.value?.play()

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
    loading.value = 'saving-answer'

    clearInterval(interval.value)

    const data = {
        answer,
        seconds: seconds.value,
        in_time: in_time.value,
        question_id: question.value.id,
    }

    try {
        await useAxiosRequest('post', '/answers', data)

        router.push({ name: 'thank-you' })
    } catch (error) {
        useAxiosErrors(error as AxiosError)
    } finally {
        loading.value = ''
    }
}

onMounted(() => getSubjectQuestion())
</script>

<template>
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
                            <Transition name="fade" mode="out-in">
                                <v-skeleton-loader v-if="loading == 'saving-answer'" type="button, button" color="primary" />
    
                                <div class="d-flex justify-space-between" v-else>
                                    <v-btn
                                        rounded="pill"
                                        color="primary"
                                        @click="answer('Sí')"
                                    >
                                        Sí
                                    </v-btn>
    
                                    <v-btn
                                        rounded="pill"
                                        color="primary"
                                        @click="answer('No')"
                                    >
                                        No
                                    </v-btn>
                                </div>
                            </Transition>
                        </v-col>
                    </v-row>
                </v-container>

                <div class="d-flex justify-center" v-else>
                    <v-btn
                        rounded="pill"
                        color="primary"
                        class="text-none"
                        @click="play"
                    >
                        Iniciar
                    </v-btn>
                </div>
            </Transition>
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Answer, Subject } from '../interfaces'
import DashboardList from '../components/DashboardList.vue'
import DashboardSurvey from '../components/DashboardSurvey.vue'
import DashboardAnswers from '../components/DashboardAnswers.vue'

const show_survey = ref(false)
const show_answers = ref(false)
const answers = ref([] as Answer[])
const subject_survey = ref({} as Subject)

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
                <DashboardList
                    @show-survey="showSurvey"
                    @show-answers="showAnswers"
                />
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
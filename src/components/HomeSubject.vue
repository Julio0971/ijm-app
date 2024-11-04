<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store'
import FormSelect from './FormSelect.vue'
import FormRadios from './FormRadios.vue'
import FormRequest from './FormRequest.vue'
import FormInputText from './FormInputText.vue'

const store = useStore()

const emit = defineEmits<{
    (e: 'updateStep', step: 'instructions'): void
}>()

const form = ref({
    data: {
        gender: '',
        age: '',
        speciality: '',
        grade: undefined,
        participated_before: '',
    },
    errors: {
        gender: '',
        age: '',
        speciality: '',
        grade: '',
        participated_before: '',
    }
})

const grades = ref([
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5', value: '5' },
    { title: '6', value: '6' },
    { title: '7', value: '7' },
    { title: '8', value: '8' },
])

const genders = ref([
    { label: 'Hombre', value: 'Hombre' },
    { label: 'Mujer', value: 'Mujer' },
    { label: 'Prefiero no contestar', value: 'Prefiero no contestar' }
])

const options = ref([
    { label: 'Sí', value: '1' },
    { label: 'No', value: '0' },
])

const setData = (data: { subject_id: number, question_name: string }) => {
    form.value.errors = {
        gender: '',
        age: '',
        speciality: '',
        grade: '',
        participated_before: '',
    }

    store.subject_id = data.subject_id
    store.question_name = data.question_name
    
    localStorage.setItem('question_name', data.question_name)
    localStorage.setItem('subject_id', data.subject_id.toString())
    
    emit('updateStep', 'instructions')
}

const setErrors = (errors: any) => form.value.errors = errors
</script>

<template>
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card>
            <v-card-title>
                Cuestionario de información demográfica
            </v-card-title>
    
            <v-card-text>
                <FormRequest
                    method="post"
                    url="/subjects"
                    :data="form.data"
                    button-text="Guardar"
                    @set-data="setData"
                    @set-errors="setErrors"
                >
                    <FormRadios
                        label="Sexo"
                        icon="restroom"
                        :options="genders"
                        v-model="form.data.gender"
                        :error="form.errors.gender"
                    />
                    
                    <FormInputText
                        mask="###"
                        label="Edad"
                        icon="hashtag"
                        v-model="form.data.age"
                        :error="form.errors.age"
                    />
                    
                    <FormInputText
                        label="Carrera"
                        icon="graduation-cap"
                        v-model="form.data.speciality"
                        :error="form.errors.speciality"
                    />
                    
                    <FormSelect
                        icon="school"
                        label="Grado"
                        :items="grades"
                        v-model="form.data.grade"
                        :error="form.errors.grade"
                    />
    
                    <FormRadios
                        :options="options"
                        icon="file-circle-question"
                        v-model="form.data.participated_before"
                        :error="form.errors.participated_before"
                        label="¿Has participado antes en estudios con dilemas morales?"
                    />
                </FormRequest>
            </v-card-text>
        </v-card>
    </v-col>
</template>
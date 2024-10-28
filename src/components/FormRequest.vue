<script setup lang="ts">
import { ref } from 'vue'
import type { AxiosError } from 'axios'
import { useAxiosErrors, useAxiosRequest } from '../composables'

const props = defineProps<{
    url: string
    data: object
    buttonText: string
    isButtonFullWidth?: boolean
    method: 'get' | 'post' | 'put' | 'delete'
}>()

const emit = defineEmits<{
    (e: 'setData', data: any): void
    (e: 'setErrors', errors: any): void
}>()

const loading = ref(false)

const handleSubmit = async () => {
    loading.value = true

    try {
        if (props.url == '/login') {
            await useAxiosRequest('get', '/sanctum/csrf-cookie')
        }

        const response = await useAxiosRequest(props.method, props.url, props.data)

        emit('setData', response)
    } catch (error) {
        const errors = useAxiosErrors(error as AxiosError)

        emit('setErrors', errors)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <slot />

        <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            v-text="buttonText"
            :block="props.isButtonFullWidth"
        />
    </form>
</template>
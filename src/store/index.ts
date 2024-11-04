import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../interfaces'

export const useStore = defineStore('auth', () => {
    const user = ref({} as User)
    const snackbar_text = ref('')
    const show_snackbar = ref(false)
    const snackbar_type = ref('' as 'success' | 'error')
    const step = ref(localStorage.getItem('step') ?? 'home')
    const subject_id = ref(localStorage.getItem('subject_id') ?? 0)
    const question_name = ref(localStorage.getItem('question_name') ?? '')

    return {
        user,
        step,
        subject_id,
        question_name,
        show_snackbar,
        snackbar_text,
        snackbar_type,
    }
})
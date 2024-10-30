import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../interfaces'

export const useStore = defineStore('auth', () => {
    const user = ref({} as User)
    const snackbar_text = ref('')
    const show_snackbar = ref(false)
    const snackbar_type = ref('' as 'success' | 'error')

    return { user, show_snackbar, snackbar_text, snackbar_type }
})
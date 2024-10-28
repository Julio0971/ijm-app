import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../interfaces'

export const useStore = defineStore('auth', () => {
    const user = ref({} as User)
    const theme = ref(localStorage.getItem('theme') ?? 'system')

    const setTheme = (option: 'light' | 'dark' | 'system') => {
        theme.value = option

        localStorage.setItem('theme', option)
    }

    return { user, theme, setTheme }
})
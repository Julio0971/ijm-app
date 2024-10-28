<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel()

const password_visible = ref(false)

const props = defineProps<{
    icon: string
    label: string
    error?: string
    isPassword?: boolean
}>()
</script>

<template>
    <v-text-field
        class="mb-3"
        persistent-hint
        v-model="model"
        variant="outlined"
        :hint="props.error"
        :label="props.label"
        density="comfortable"
        :error="props.error ? true : false"
        :type="password_visible || !props.isPassword ? 'text' : 'password'"
    >
        <template #prepend-inner>
            <v-icon size="small" :icon="`fas ${ props.icon }`" />
        </template>

        <template #append-inner v-if="props.isPassword">
            <v-icon
                size="small"
                :icon="`fas fa-eye${ password_visible ? '-slash' : '' }`"
                @click="password_visible = !password_visible"
            />
        </template>
    </v-text-field>
</template>
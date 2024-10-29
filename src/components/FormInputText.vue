<script setup lang="ts">
import { ref } from 'vue'
import { vMaska } from "maska/vue"

const model = defineModel()

const password_visible = ref(false)

const props = defineProps<{
    icon: string
    mask?: string
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
        v-maska="props.mask"
        variant="underlined"
        :label="props.label"
        density="comfortable"
        :error-messages="props.error"
        :error="props.error ? true : false"
        :type="password_visible || !props.isPassword ? 'text' : 'password'"
    >
        <template #prepend>
            <v-icon size="small" :icon="`fas fa-${ props.icon }`" />
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
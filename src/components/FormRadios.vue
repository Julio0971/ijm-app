<script setup lang="ts">
const model = defineModel()

const props = defineProps<{
    icon: string
    label: string
    error?: string
    options: { label: string, value: string }[]
}>()
</script>

<template>
    <v-radio-group
        inline
        v-model="model"
        persistent-hint
        :label="props.label"
        :error-messages="props.error"
        :error="props.error ? true : false"
    >
        <template #prepend>
            <v-icon size="small" :icon="`fas fa-${ props.icon }`" />
        </template>

        <v-radio
            :key="option.value"
            :label="option.label"
            :value="option.value"
            v-for="option in props.options"
        />
    </v-radio-group>
</template>
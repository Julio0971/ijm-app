<script setup lang="ts">
const model = defineModel()

const props = defineProps<{
    icon: string
    label: string
    error?: string
    items: { title: string, value: string }[]
}>()
</script>

<template>
    <v-select
        class="mb-3"
        persistent-hint
        v-model="model"
        :items="props.items"
        variant="underlined"
        :label="props.label"
        density="comfortable"
        :error-messages="props.error"
        :error="props.error ? true : false"
    >
        <template #prepend>
            <v-icon size="small" :icon="`fas fa-${ props.icon }`" />
        </template>
    </v-select>
</template>
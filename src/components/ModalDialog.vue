<script setup lang="ts">
const props = defineProps<{
    show: boolean
    title: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()
</script>

<template>
    <v-dialog v-model="props.show" width="auto">
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h6">
                    {{ props.title }}
                </div>

                <v-btn
                    icon="fas fa-close"
                    variant="text"
                    @click="emit('close')"
                />
            </v-card-title>

            <v-card-text>
                <slot />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormRequest from '../components/FormRequest.vue'
import FormInputText from '../components/FormInputText.vue'

const router = useRouter()

const form = ref({
    data: {
        username: '',
        password: ''
    },
    errors: {
        username: '',
        password: ''
    }
})

const setData = async () => {
    form.value.errors = {
        username: '',
        password: ''
    }

    router.push({ name: 'home' })
}

const setErrors = (errors: any) => form.value.errors = errors
</script>

<template>
    <v-app class="bg-general">
        <v-container style="height: 100vh;">
            <v-row justify="center" align="center" class="fill-height">
                <v-col cols="12" sm="9" md="7" lg="5" xl="3">
                    <v-card rounded="xl" class="px-3 py-3">
                        <v-card-title class="text-center text-h5">
                            Ingresar
                        </v-card-title>

                        <v-card-text>
                            <FormRequest
                                url="/login"
                                method="post"
                                :data="form.data"
                                button-text="Entrar"
                                is-button-full-width
                                @set-data="setData"
                                @set-errors="setErrors"
                            >
                                <FormInputText
                                    icon="user"
                                    label="Usuario"
                                    :error="form.errors.username"
                                    v-model="form.data.username"
                                />
                                
                                <FormInputText
                                    is-password
                                    icon="lock"
                                    label="Contraseña"
                                    :error="form.errors.password"
                                    v-model="form.data.password"
                                />
                            </FormRequest>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
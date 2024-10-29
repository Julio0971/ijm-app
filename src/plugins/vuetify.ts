import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'

import 'vuetify/styles'
import '../assets/styles.css'
import '@fortawesome/fontawesome-free/css/all.css'

export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    secondary: '#4C4C4C',
                    primary: '#717272',
                    info: '#5D9BD1',
                }
            },
        },
    },
})
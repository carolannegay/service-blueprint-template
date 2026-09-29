import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0f2747',
          secondary: '#dfeaf7',
          background: '#f6f7fb',
          surface: '#ffffff',
          success: '#9fcdab',
          warning: '#f8df9d',
          error: '#d27b7b',
          info: '#8cb6e7',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'sm',
      color: 'primary',
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
  },
})

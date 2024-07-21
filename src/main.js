import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons'
const app = createApp(App)

app.use(createPinia())

library.add(faWandMagicSparkles)
library.add(faRotateRight)
library.add(faArrowDownLong)

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createI18n} from "vue-i18n";

import recipes_fr from "@/i18n/fr/recipes";
import common_fr from "@/i18n/fr/common";
import enums_fr from "@/i18n/fr/enums";
import groceryLists_fr from "@/i18n/fr/grocery-lists";

import App from './App.vue'
import router from './router'

const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    messages : {
        fr: {
            common: common_fr,
            enums: enums_fr,
            groceryLists: groceryLists_fr,
            recipes: recipes_fr,
        }
    }
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')

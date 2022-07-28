import {createI18n} from 'vue-i18n'
import zh from './zh'
const messages = {
    zh
}


const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    formatFallbackMessages: true,
    messages
})
export default i18n
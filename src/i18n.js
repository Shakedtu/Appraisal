import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import messages_he from './assets/locales/messages_he.json'
const resources = {
    he: {
        translation: messages_he
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "he",
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
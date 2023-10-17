import { createContext } from 'react';
import enLanguage from './translations/en.js';
import itLanguage from './translations/it.js';
import slLanguage from './translations/sl.js';

const rawSettings = {
    auth: window.localStorage.getItem('auth'),
    language: 'en',
    translations: {
        en: enLanguage,
        it: itLanguage,
        sl: slLanguage
    }
};
const SettingsContext = createContext(rawSettings);

export default SettingsContext;
export {rawSettings};
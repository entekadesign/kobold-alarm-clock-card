// localization code adapted from
// https://github.com/custom-cards/boilerplate-card/blob/master/src/localize/localize.ts

import type { TranslationKey } from './types';

import * as en from './translations/en.json';
import * as de from './translations/de.json';
import * as fr from './translations/fr.json';
import * as es from './translations/es.json';
import * as ru from './translations/ru.json';
// Import other languages as needed above this line and in order

// Define supported languages
const languages: Record<string, any> = {
    en: en,
    de: de,
    fr: fr,
    es: es,
    ru: ru,
    // Add more languages here in order
};

export function localize(string: TranslationKey, search = '', replace = ''): string {
    const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

    let translated: string;

    try {
        translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
    } catch (e) {
        translated = string.split('.').reduce((o, i) => o[i], languages['en']);
    }

    if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

    if (search !== '' && replace !== '') {
        translated = translated.replace(search, replace);
    }
    return translated;
}
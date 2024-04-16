// localStorage.getItem('lang');
import { createI18n } from 'vue-i18n';
import zh from './zh';
import en from './en';

// judge if it is English
export const isEn = navigator.language.includes('en') === true;

// restraint all lang object to typeof zh
const i18n = createI18n<[typeof zh], 'zh' | 'en'>({
  legacy: false,
  globalInjection: true,
  locale: isEn ? 'en' : 'zh',
  messages: {
    zh,
    en,
  },
});

export default i18n;

// use vue-i18n in modules
export const $t = i18n.global.t.bind(i18n.global);

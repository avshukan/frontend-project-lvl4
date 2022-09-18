import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import locales from '../locales';

const defaultLng = 'ru';

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: defaultLng, // if you're using a language detector, do not define the lng option
    fallbackLng: defaultLng,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function I18nProvider({ children }) {
  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}

export default I18nProvider;

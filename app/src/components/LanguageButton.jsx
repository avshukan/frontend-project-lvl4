import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LanguageButton() {
  const { t, i18n } = useTranslation();

  const getOtherLanguage = useCallback((lng) => (lng === 'ru' ? 'en' : 'ru'), []);

  const toggleLanguage = () => {
    const lng = getOtherLanguage(i18n.language);
    console.log('i18n.language', i18n.language);
    console.log('lng', lng);
    i18n.changeLanguage(lng, (error, tt) => {
      console.log('error language', error);
      console.log('tt language', tt);
    });
  };

  // return <Button as={Link} onClick={toggleLanguage}>{t(`langs.${i18n.language}`)}</Button>;
  return <Button onClick={toggleLanguage}>{t(`langs.${getOtherLanguage(i18n.language)}`)}</Button>;
}

export default LanguageButton;

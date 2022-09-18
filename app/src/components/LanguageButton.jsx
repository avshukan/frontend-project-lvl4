import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LanguageButton() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const lng = i18n.language === 'ru' ? 'en' : 'ru';
    console.log('i18n.language', i18n.language);
    console.log('lng', lng);
    i18n.changeLanguage(lng, (error, tt) => {
      console.log('error language', error);
      console.log('tt language', tt);
    });
  };

  // return <Button as={Link} onClick={toggleLanguage}>{t(`langs.${i18n.language}`)}</Button>;
  return <Button onClick={toggleLanguage}>{t(`langs.${i18n.language}`)}</Button>;
}

export default LanguageButton;

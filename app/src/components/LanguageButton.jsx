import React, { useCallback } from 'react';
import { useRollbar } from '@rollbar/react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LanguageButton() {
  const rollbar = useRollbar();
  const { t, i18n } = useTranslation();

  const getOtherLanguage = useCallback((lng) => (lng === 'ru' ? 'en' : 'ru'), []);

  const toggleLanguage = () => {
    const lng = getOtherLanguage(i18n.language);
    i18n.changeLanguage(lng, (error) => {
      rollbar.error('Error fetching language', error, { lng });
    });
  };

  return <Button onClick={toggleLanguage}>{t(`langs.${getOtherLanguage(i18n.language)}`)}</Button>;
}

export default LanguageButton;

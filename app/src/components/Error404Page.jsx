import React from 'react';
import { useTranslation } from 'react-i18next';

function Error404Page() {
  const { t } = useTranslation();
  return (
    <div>{t('error404.message')}</div>
  );
}

export default Error404Page;

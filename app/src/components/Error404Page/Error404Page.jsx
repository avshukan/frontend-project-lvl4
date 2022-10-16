import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import queryString from '../../routes/queryString';

function Error404Page() {
  const { t } = useTranslation();
  return (
    <Container className="h-100 w-100 d-flex align-content-center justify-content-center">
      <Container className="m-auto">
        <h1 className="text-center">{t('error404.message')}</h1>
        <h2 className="text-center"><a href={queryString.indexPath()}>{t('error404.toIndex')}</a></h2>
      </Container>
    </Container>
  );
}

export default Error404Page;

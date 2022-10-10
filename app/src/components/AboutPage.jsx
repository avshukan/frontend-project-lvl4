import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

function AboutPage() {
  const { t } = useTranslation();
  return (
    <Container className="h-100 w-100 d-flex align-content-center justify-content-center">
      <Container className="m-auto">
        <h1 className="text-center">{t('about.header')}</h1>
        <div className="text-justify">{t('about.text')}</div>
      </Container>
    </Container>
  );
}

export default AboutPage;

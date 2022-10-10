import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <Container className='d-flex p-4 justify-content-center'>
      <a href='mailto:avshukan@gmail.com'>avshukan@gmail.com</a>
      <span className='mx-4 font-weight-bold'>2022</span>
    </Container>
  );
}

export default Footer;

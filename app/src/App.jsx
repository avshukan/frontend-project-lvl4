import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Header from './components/Custom/Header';
import Pages from './components/Custom/Pages';
import Footer from './components/Custom/Footer';

function App() {
  return (
    <BrowserRouter>
      <Container fluid="md h-100 d-flex flex-column">
        <ToastContainer />
        <Header />
        <Pages />
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;

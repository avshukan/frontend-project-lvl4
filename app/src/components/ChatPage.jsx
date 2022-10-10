import React from 'react';
import ChannelAdder from './ChannelAdder';
import ChannelsList from './ChannelsList';
import MessagesHeader from './MessagesHeader';
import MessagesList from './MessagesList';
import MessagesAdder from './MessagesAdder';
import { Col, Container, Row } from 'react-bootstrap';

function ChatPage() {
  return (
    <Container className="h-100 my-0 py-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col lg={2} md={3} className="border-end pt-5 px-0 bg-light">
          <ChannelAdder />
          <ChannelsList />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesHeader />
            <MessagesList />
            <MessagesAdder />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatPage;

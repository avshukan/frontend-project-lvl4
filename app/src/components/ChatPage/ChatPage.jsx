import React, { useCallback, useEffect } from 'react';
import { useRollbar } from '@rollbar/react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider';
import fetchDataThunk from '../../slices/fetchDataThunk';
import ChannelAdder from './ChannelAdder';
import ChannelsList from './ChannelsList';
import MessagesHeader from './MessagesHeader';
import MessagesList from './MessagesList';
import MessagesAdder from './MessagesAdder';

function ChatPage() {
  const rollbar = useRollbar();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { user } = useAuth();

  const uploadData = useCallback(() => {
    const { token } = user;
    const toastId = toast.loading(t('authProvider.toast.pending'));
    dispatch(fetchDataThunk(token))
      .unwrap()
      .then(() => {
        toast.update(toastId, {
          render: t('authProvider.toast.success'), type: 'success', isLoading: false, autoClose: 1000,
        });
      })
      .catch((error) => {
        rollbar.error('Error fetching data', error, { token });
        toast.update(toastId, {
          render: t('authProvider.toast.error'), type: 'error', isLoading: false, autoClose: 3000,
        });
      });
  }, [user, dispatch, t, rollbar]);

  useEffect(() => {
    uploadData();
  }, [uploadData]);

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

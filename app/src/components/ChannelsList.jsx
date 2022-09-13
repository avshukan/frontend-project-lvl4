import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { switchChannel } from '../slices/dataSlice';

function ChannelsList() {
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => state.data);

  const getChannelVariant = (id) => (currentChannelId === id ? 'primary' : '');

  const onSwitch = (id) => dispatch(switchChannel({ channelId: id }));

  return (
    <Nav
      as="ul"
      variant="pills"
      className="flex-column"
      activeKey={currentChannelId}
      onSelect={onSwitch}
    >
      {channels.map(({ id, name }) => (
        <Nav.Item key={id} className="w-100">
          <Dropdown as={ButtonGroup} className="w-100 justify-content-between">
            <Nav.Link as={Button} eventKey={id} className="text-truncate text-start">
              <span className="me-1">#</span>
              {name}
            </Nav.Link>
            <Dropdown.Toggle variant={getChannelVariant(id)} style={{ width: '30px', flexGrow: 0 }} />
            <Dropdown.Menu>
              <Dropdown.Item>Переименовать</Dropdown.Item>
              <Dropdown.Item>Удалить</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default ChannelsList;

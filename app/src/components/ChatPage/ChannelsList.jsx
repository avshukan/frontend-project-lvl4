import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import filter from 'leo-profanity';
import { switchChannel } from '../../slices/dataSlice';
import ChannelMenu from './ChannelMenu';

function ChannelsList() {
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => state.data);

  const onSwitch = (id) => () => dispatch(switchChannel({ channelId: +id }));

  const getChannelVariant = (id) => (currentChannelId === id ? 'primary' : 'light');

  const getChannelsMenu = (id, name, removable) => (removable
    ? <ChannelMenu id={id} name={name} variant={getChannelVariant(id)} isActive={id === currentChannelId} />
    : null);

  return (
    <Nav
      as="ul"
      variant="pills"
      className="flex-column"
      activeKey={currentChannelId}
      onSelect={onSwitch}
    >
      {channels.map(({ id, name, removable }) => (
        <Nav.Item key={id} className="w-100">
          <Dropdown as={ButtonGroup} className="w-100">
            <Button variant={getChannelVariant(id)} className='text-truncate text-start' onClick={onSwitch(id)}>
              <span className="me-1">#</span>
              {filter.clean(name)}
            </Button>
            {getChannelsMenu(id, name, removable)}
          </Dropdown>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default ChannelsList;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import filter from 'leo-profanity';
import { switchChannel } from '../../slices/channelsSlice';
import ChannelMenu from './ChannelMenu';
import { channelsSelector, currentChannelIdSelector } from '../../slices';

function ChannelsList() {
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelector);

  const currentChannelId = useSelector(currentChannelIdSelector);

  const onSwitch = (id) => () => dispatch(switchChannel({ channelId: id }));

  const getChannelVariant = (id) => (currentChannelId === id ? 'primary' : 'light');

  const getChannelsMenu = (id, name, removable) => (removable
    ? <ChannelMenu id={id} name={name} variant={getChannelVariant(id)} />
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
            <Button variant={getChannelVariant(id)} className="text-truncate text-start" onClick={onSwitch(id)}>
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

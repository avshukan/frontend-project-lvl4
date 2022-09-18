import React from 'react';
import ChannelAdder from './ChannelAdder';
import ChannelsList from './ChannelsList';
import MessagesHeader from './MessagesHeader';
import MessagesList from './MessagesList';
import MessagesAdder from './MessagesAdder';

function MainPage() {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelAdder />
          <ChannelsList />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesHeader />
            <MessagesList />
            <MessagesAdder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

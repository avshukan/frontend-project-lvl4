import React from 'react';
import ChannelsAdder from './ChannelsAdder.jsx';
import ChannelsList from './ChannelsList.jsx';
import MessagesHeader from './MessagesHeader.jsx';
import MessagesList from './MessagesList.jsx';
import MessagesAdder from './MessagesAdder.jsx';

const MainPage = () => {
    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                    <ChannelsAdder />
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
};

export default MainPage;

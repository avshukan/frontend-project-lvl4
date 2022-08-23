import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";


const Messages = () => {
    const { messages } = useSelector(state => state.data.data);

    return (
        <Container className="d-flex flex-column h-100">
            <Container className="chat-messages overflow-auto px-5">
                {messages.map((message) => <div className="text-break mb-2" onClick={() => { alert('!')}}>{JSON.stringify(message)}</div> )}
            </Container>
        </Container>
    );
};

export default Messages;
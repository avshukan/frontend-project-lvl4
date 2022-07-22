import React from "react";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";

const Channels = () => {
    const { channels, currentChannelId } = useSelector(state => state.data.data);

    return (
        <Container className="d-flex flex-column mb-3">
            {channels.map(({ id, name, removable }) => <Button key={id} className="mt-3" onClick={() => { alert(id)}}>{name}</Button> )}
        </Container>
    );
};

export default Channels;

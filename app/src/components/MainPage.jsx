import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Channels from "./Channels";
import Messages from "./Messages";

const MainPage = () => {
    const data = useSelector(state => state.data.data);

    return (
        <Container>
            <Row>
                <Col xs="3" className="bg-light border">
                    <Channels />
                </Col>
                <Col xs="9" className="bg-light border">
                    <Messages />
                </Col>
            </Row>
            <Row>
                <Col ></Col>
                <Col>{JSON.stringify(data)}</Col>
                <Col>Right</Col>
            </Row>
        </Container>
    );
};

export default MainPage;

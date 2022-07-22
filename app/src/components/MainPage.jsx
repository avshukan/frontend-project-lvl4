import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const MainPage = () => {
    const data = useSelector(state => state.data);

    return (
        <Container>
          <Row>
            <Col>Left</Col>
            <Col>{JSON.stringify(data)}</Col>
            <Col>Right</Col>
          </Row>
        </Container>
    );
};

export default MainPage;

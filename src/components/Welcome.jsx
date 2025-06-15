import React, { use } from "react";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../AuthProvider";

function Welcome() {
  const { user } = useAuth();
  return (
    <div className="flex justify-center text-black text-xl ">
      <Container>
        <Row>
          <Col xs="12" xl="8" lg="4" className="mt-8">
            <h1>welcome {user}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Welcome;

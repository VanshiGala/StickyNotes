import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
function Home() {
  return (
    <Container fluid className=" flex justify-center  text-black">
      <Row className=" m-24">
        <Col xs="12">
          <h2 className="text-2xl font-semibold ">
            Please{" "}
            <Link to="/login" className="text-blue-600">
              {" "}
              login
            </Link>{" "}
            to continue
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

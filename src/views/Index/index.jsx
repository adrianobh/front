import React from "react";
import Menu from "./Menu/Menu";
import { Row, Col } from "react-bootstrap";
import Header from "./Header/Header";
import Body from "./Body/Body";
const Index = () => {
  return (
    <>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col
          xs={1}
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "inherit",
          }}
        >
          <Menu />
        </Col>
        <Col xs={11} style={{ padding: "8px" }}>
          <Body />
        </Col>
      </Row>
    </>
  );
};
export default Index;

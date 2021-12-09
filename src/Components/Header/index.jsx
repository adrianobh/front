import React from "react";

import { Row, Col, Button } from "react-bootstrap";
import styles from "./style.module.css";
import LargeModal from "../../Components/Modal/LargeModal";

const Header = ({ title, form, openModal, setOpenModal, disabled = false }) => {
  return (
    <>
      <Row className={styles.fistRow}>
        <Col xs="9">
          <h3>{title}</h3>
        </Col>
        <Col xs="3" className={styles.colButton}>
          <Button
            variant="success"
            onClick={() => setOpenModal(true)}
            disabled={disabled}
          >
            Novo {title}
          </Button>{" "}
        </Col>
      </Row>

      <LargeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={title}
        formulario={form}
      />
    </>
  );
};
export default Header;

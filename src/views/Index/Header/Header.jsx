import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, Col, Dropdown } from "react-bootstrap";
import logo from "../../../assets/img/logo.png";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { logoutAction } from "../../../store/ducks/auth";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

const Header = () => {
  const dispatch = useDispatch();

  function logout(data) {
    console.log("logout");
    dispatch(logoutAction());
    history.push("/");
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Col xs={1} style={{ display: "flex", justifyContent: "center" }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className={styles.a}>
            <Navbar.Brand href="#home" className={styles.center}>
              <Dropdown>
                <Dropdown.Toggle variant="light" drop={"down"}>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className={styles.icon}
                  />
                  Perfil
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ left: "-3rem" }}>
                  <Dropdown.Item>
                    <Link to="/home/meu-perfil" className={styles.center}>
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className={styles.icon}
                      />
                      <span className={styles.spanNav}>Meu perfil</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => logout()}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className={styles.icon}
                    />
                    <span className={styles.spanNav}>Sair</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;

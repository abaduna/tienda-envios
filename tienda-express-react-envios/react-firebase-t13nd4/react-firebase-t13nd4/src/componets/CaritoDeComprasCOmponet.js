//CaritoDeComprasCOmponet
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CaritoComprarContex } from "../contexts/carito";
import WhatsAppLink from "./WhatsAppLink "

function CaritoDeComprasCOmponet() {
  const { caritoDeCompras } = useContext(CaritoComprarContex);

  return (
    <Navbar expand="lg" className="bg-body-tertiary scroll-container">
      <Container className="black">
        <Navbar.Brand href="#home" className="white">
          {caritoDeCompras.length > 0 && (
            <h5 className="Conuter">
              {" "}
              <span>Cantida de elimentos comprados</span>{" "}
              {caritoDeCompras.length}
            </h5>
          )}
          {caritoDeCompras.length > 0 && (
            <WhatsAppLink caritoDeCompras={caritoDeCompras}></WhatsAppLink>
          )}
          Tienda de abaduna
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/pagina2" className="white">
              Home
            </Nav.Link>
            <Nav.Link className="white">
              <Link to="/login">Login</Link>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CaritoDeComprasCOmponet;

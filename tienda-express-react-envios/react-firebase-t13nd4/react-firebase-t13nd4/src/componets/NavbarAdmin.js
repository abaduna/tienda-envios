import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
function NavbarAdmin() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Panel adminstrativo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="navbarlink" to="/panelentrados">
                panelentrados
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navbarlink" to="/PanelDeenvieados">
                PanelDeenvieados
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navbarlink" to="/PanelDeCompras">
                Panel De Compras
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navbarlink" to="/PaguesEditProduct">
                Pagues Edit Product
              </Link>
            </Nav.Link>
            <Nav.Link className="white">
              <Link to="/subirProducto">subirProducto</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;
/*

<Nav.Link to="/panelentrados" className="white">
              Panel entregados
            </Nav.Link>
            <Nav.Link to="/PanelDeenvieados" className="white">
              Panel enviados
            </Nav.Link>
*/

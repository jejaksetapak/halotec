import React from 'react'
import './NavbarComponent.css';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Offcanvas, Image
} from 'react-bootstrap';
function NavbarComponent() {
  return (
    <Navbar expand="lg" className="mb-3 nav-bar-home">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/"><Image className="img-logo" src="http://halotec-indonesia.com/wp-content/themes/halotec/assets/images/halotec-logo-130x121.png" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <Image className="img-logo-canvas" src="http://halotec-indonesia.com/wp-content/themes/halotec/assets/images/halotec-logo-130x121.png" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
            </Nav>
          
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
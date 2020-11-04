import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LoginModal } from '../loginModal/loginModal'
import './navbarStyle.css';

export const NavbarComponent = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container className="navbar-container">
            <Navbar bg="white" variant="white" sticky="bottom" >
                <Navbar.Brand href="#home">SHOP LIST</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link onClick={handleShow}>
                        login
                    </Nav.Link>
                </Nav>

            </Navbar>
            <LoginModal show={show} handleClose={handleClose} />
        </Container>
    )
}
import { Navbar, Nav, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

const NavbarComponent = props => {
    return (
        <Container>
            <Navbar bg="white" variant="white" sticky="bottom" >
                <Navbar.Brand href="#home">SHOP LIST</Navbar.Brand>
                <Nav className="mr-auto"/>
                <Nav>
                    <Nav.Link className="text-right">
                        {props.user && props.user.name}
                    </Nav.Link>
                </Nav>

            </Navbar>
        </Container>
    )
}


const mapStateToProps = state => {
    return {
        user: state.session.user,
        sessionInfo: state.session.authenticated,
        checked: state.session.checked
    }
};

export default connect(mapStateToProps)(withRouter(NavbarComponent))
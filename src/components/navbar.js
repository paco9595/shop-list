import { Navbar, Nav, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Brand = styled(Link)`
    font-weight: bolder;
    font-size: 22px;
    margin-left: -15px;
    ${props => props.right ? 'margin-right: -15px;': ''}
    color: ${props => props.theme.textColor};
    margin-right: 1rem;
    &:visited, &:hover{
        color: ${props => props.theme.textColor};
        text-decoration: none;
    }
`;

const User = styled(Link)`
    margin-right:-15px;
    color: ${props => props.theme.textColorSecundary};
    margin-right: 1rem;
    &:visited, &:hover{
        color: ${props => props.theme.textColorSecundary};
        text-decoration: none;
    }
`;

const NavbarComponent = props => {
    return (
        <Container>
            <Navbar sticky="bottom" >
                <Brand to="/home">To Do List</Brand>
                <Nav className="mr-auto" />
                <Nav>
                    {props.user && <User to="#">
                        {props.user.name}
                    </User>}
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
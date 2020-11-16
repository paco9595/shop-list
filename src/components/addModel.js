import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Button } from 'react-bootstrap';

const ModalContainer = styled.div`
    background: ${props => props.theme.primaryBackgroundColor};
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100vh;
    width: 240px;
    transition: visibility 0.5s, opacity 0.5s linear;
    box-shadow: -22px 0px 44px 0px #c6c6c6bf;
    @media(max-width: 767px) {
        width: 100vw;
    }

    ${props => {
        if (props.toggle) {
            return `
                visibility: visible;
                opacity: 1;
            `
        }
        return `
            visibility: hidden;
            opacity: 0;
        `
    }}
`;

const ButtonModel = styled(Button)`
    margin: 10px 0;
`

export const AddModel = ({ show, cancel }) => {

    const findParent = element => {
        if (element.id == 'addModal'){
            return true;
        } else if(element.id == 'root'){
            return false;
        }
        return findParent(element.parentElement);
    }


    useEffect(() => {
        const clickHandler = event => {
            console.log('event test', typeof event.target, event.target)
            const r = findParent(event.target)
            console.log(r)
        }
        if (show) {
            window.addEventListener('click', clickHandler)
            return () => {
                window.removeEventListener('click', clickHandler);
            }
        }
    }, [show])

    return (
        <ModalContainer toggle={show} id='addModal' >
            <Container>
                <Row>
                    <Col>
                        <h4> Lista Nueva </h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonModel
                            variant="danger"
                            onClick={cancel}
                            size="lg"
                            block
                        > Cancelar</ButtonModel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonModel
                            variant="success"
                            onClick={cancel}
                            size="lg"
                            block
                        > Aceptar</ButtonModel>
                    </Col>
                </Row>
            </Container>
        </ModalContainer>
    )
};
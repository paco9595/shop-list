import React, { useRef, useState } from 'react'
import { Modal, Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import styled from 'styled-components';
import Trash from './../utilities/icons/trash.svg';

const TableElements = styled(Table)`
    margin: 20px 15px;
`;

const TrashIcon = styled.img`
    width: 20px;
    height:20px;
`;
const colorArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];
export const AddModel = ({ show, cancel, submit }) => {
    const nameInputRef = useRef(null);
    const elementosInputRef = useRef(null);
    const marcaInputRef = useRef(null);
    const cantidadInputRef = useRef(null);
    const [lista, setLista] = useState([]);
    const [isFocus, setFocus] = useState(false);
    const [color, setColor] = useState(colorArray[13]);
    const enterHandler = event => {
        console.log('ref', event)
        if (isFocus && event.keyCode === 13) {
            console.log('enter')
            const elemento = {
                name: elementosInputRef.current.value,
                marca: '',
                cantidad: 1,
            }
            setLista([...lista, elemento])
            elementosInputRef.current.value = ''
        }
    }
    const agregarElemento = event => {
        const { value: name } = elementosInputRef.current;
        const { value: marca } = marcaInputRef.current;
        const { value: cantidad } = cantidadInputRef.current;
        if (name.length) {
            const elemento = {
                name,
                marca,
                cantidad,
                checked: false,
                color

            }
            setLista([...lista, elemento]);
            elementosInputRef.current.value = ''
            marcaInputRef.current.value = ''
            cantidadInputRef.current.value = ''
        }
        elementosInputRef.current.focus();
        console.log('list', lista);
    }

    const removeItem = key => {
        const newList = lista.filter((i, j) => j !== key);
        setLista(newList);
    }
    const submitForm = () => {
        const { value: name } = nameInputRef.current;
        submit({
            name,
            items: lista,
            color
        });
    }


    return (
        <Modal
            show={show}
            onHide={cancel}
            keyboard={false}
        >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" ref={nameInputRef} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Color</Form.Label>
                                <CirclePicker
                                    color={color}
                                    width={'100%'}
                                    colors={colorArray}
                                    onChange={(event) => setColor(event.hex)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Elementos</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="elementos"
                                    ref={elementosInputRef}
                                    onKeyDown={enterHandler}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>marca</Form.Label>
                                <Form.Control type="text" placeholder="marca" ref={marcaInputRef} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>cantidad</Form.Label>
                                <Form.Control type="number" placeholder="cantidad" ref={cantidadInputRef} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-right'>
                            <Button onClick={agregarElemento} >agregar Elemento</Button>
                        </Col>
                    </Row>
                    <Row>
                        <TableElements striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>nombre</th>
                                    <th>marca</th>
                                    <th>cantidad</th>
                                    <th>borrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((i, key) => (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{i.name}</td>
                                        <td>{i.marca}</td>
                                        <td>{i.cantidad}</td>
                                        <td><TrashIcon src={Trash} onClick={() => removeItem(key)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableElements>
                    </Row>
                    <Row>
                        <Col className='text-right align-self-end'>
                            <Button variant="danger" onClick={cancel}>Cancelar</Button>
                        </Col>
                        <Col className='text-right align-self-end' >
                            <Button variant="success" onClick={submitForm}>Crear Lista</Button>
                        </Col>
                    </Row>

                </Container>
            </Modal.Body>
        </Modal >
    )
};
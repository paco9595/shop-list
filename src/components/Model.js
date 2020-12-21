import React, { useRef, useState, useEffect} from 'react'
import { Modal, Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import styled from 'styled-components';
import Trash from './../utilities/icons/trash.svg';
import { Theme } from '../utilities/themes';
const TableElements = styled(Table)`
    margin: 20px 15px;
`;

const TrashIcon = styled.img`
    width: 20px;
    height:20px;
`;
const trashContainer = styled.div`
    w
`;
// const colorArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];
export const Model = ({ show, cancel, submit, data, deleteList }) => {
    const nameInputRef = useRef();
    const elementosInputRef = useRef(null);
    const marcaInputRef = useRef(null);
    const cantidadInputRef = useRef(null);
    const [lista, setLista] = useState([]);
    const [isFocus, setFocus] = useState(false);
    const [color, setColor] = useState(Theme.colorlist[1]);
    useEffect(() => {
        if (data && data.name) {
            nameInputRef.current.value= data.name
            setLista(data.item)
            setColor(data.color);
        }
    }, [data])

    const enterHandler = event => {
        if (isFocus && event.keyCode === 13) {
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
                    {data && <Row>
                        <Col className="text-right">
                            <TrashIcon src={Trash} onClick={deleteList}/>
                        </Col>
                    </Row>}
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
                                    colors={Theme.colorlist}
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
                                    <th>nombre</th>
                                    <th>marca</th>
                                    <th>cantidad</th>
                                    <th>borrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((i, key) => (
                                    <tr key={key}>
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
                            <Button variant="success" onClick={submitForm}>{data? 'Editar Lista':'Crear Lista'}</Button>
                        </Col>
                    </Row>

                </Container>
            </Modal.Body>
        </Modal >
    )
};
import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { CheckBox } from './checkBox';
import { Row, Col, ListGroupItem } from 'react-bootstrap';
import { ConfitmationBlock } from './confirmationBlock';
import { Icon } from './Icon';
import Trash from './../utilities/icons/garbage.svg';

const DraggableContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius:5px;
`
const ItemContainer = styled.div`
    position: relative;
`;

export const ItemList = ({ item, checkHandeler, id, editMode, color:checkColor }) => {
    const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 })
    const [active, setActive] = useState(true);
    const [color, setColor] = useState('#f6f6f2')

    const stop = (event, data, id) => {
        if (data.x !== 0) {
            if (data.x >= data.node.scrollWidth / 1.75) {
                console.log('derecha', data.node.scrollWidth);
                item.checked = true;
                console.log(item, item.checked, id)
                checkHandeler(true, id)
            }
            else if (data.x + data.node.scrollWidth <= data.node.scrollWidth / 1.75) {
                console.log('izquierda', data.x, data.node.scrollWidth);
                item.checked = false;
                console.log(item, item.checked, id)
                checkHandeler(false, id)
            }
        }
        setControlledPosition({ x: 0, y: 0 })
        setColor('#fff')

    }
    const dragHandler = (event, data) => {
        if (data.x > 0) {
            setActive(true);
            setColor('#8bc34a');
        } else {
            setActive(false); 
            setColor('#e91e63')
        }
    }

    return <ItemContainer>
        <DraggableContainer>
            <Draggable
                position={controlledPosition}
                axis='x'
                defaultPositions={{ x: 190, y: 0 }}
                onStart={() => setControlledPosition({ x: 0, y: 0 })}
                onStop={(event, data) => stop(event, data, id)}
                onDrag={dragHandler}
                disabled={editMode}
            >
                <ListGroupItem>
                    <Row className="justify-content-between">
                        <Col>
                            <CheckBox 
                                checked={item.checked}
                                label={item.name}
                                color={checkColor}
                            />
                        </Col>
                        {item.marca && <Col>
                            {item.marca}
                        </Col>}
                        <Col xs={1} className="align-self-center">
                            {item.cantidad ? item.cantidad : null}
                        </Col>
                        {editMode && <Col xs={2} className="align-self-center text-right">
                            <Icon src={Trash} alt="remove item icon"/>
                        </Col>}

                    </Row>
                </ListGroupItem>
            </Draggable>
        </DraggableContainer>
        <ConfitmationBlock active={active} color={color}/>
    </ItemContainer>
}
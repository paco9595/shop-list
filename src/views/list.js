import React, { useEffect, useState } from 'react'
import { getFullList, updateItem } from "./../services";
import { connect } from 'react-redux';
import { deletList, deleteItem } from "./../services";
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { CheckBox, SearchBar } from './../components'
import styled from 'styled-components'
import trash from './../utilities/icons/trash.svg'
import { useToasts } from 'react-toast-notifications'

const FormContainer = styled(Row)`
    padding: 20px 0;
`

const TrashIcon = styled.img`
	width: 20px;
	height: 20px;
	fill: red;
`;
const TrashContainer = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center
`
const List = ({ match, user, history }) => {

    const { addToast } = useToasts();
    const [userList, setUserList] = useState({ item: [] })
    const { id: matchId } = match.params;

    useEffect(() => {
        if (user.id) {
            getFullList(user.id, matchId).then(data => {
                console.log('data', data);
                if (data.name) {
                    setUserList(data)
                    //setUserList({ ...data, item: [{ name: 'test' }] })
                } else {
                    history.goBack();
                }
            })
        }
    }, [user, matchId, history])

    const checkHandeler = (checked, id) => {
        const item = userList.item[id];
        const updateList = userList.item.map((i, j) => id === j ? { ...i, checked } : { ...i });
        setUserList({ ...userList, item: updateList });
        updateItem({
            ...item,
            checked
        }).then(({data}) => {
            console.log('endpoint test ', data);
        }).catch((data) => {
            console.log('error', data.message)
            addToast(data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }
    const searchChangeHandelr = value => {
        console.log('handelr value ', value)
    }
    const removeListHandler = () => {
        const { id: matchId } = match.params;
        deletList(user.id, matchId).then(res => history.goBack())
    };
    const removeItemHandler = item => {
        const updateList = userList.item.filter(i => item._id !== i._id);
        const { id: matchId } = match.params;
        setUserList({ ...userList, item: updateList });
        deleteItem(user.id, matchId, item._id).then(res => console.log('res', res));
    };
    
    return (
        <Container>
            <Row>
                <Col>
                    <h1>{userList.name}</h1>
                </Col>
                <TrashContainer xs={1}>
                    <TrashIcon src={trash} alt='remove icon' onClick={removeListHandler} />
                </TrashContainer>
            </Row>
            <FormContainer>
                <Col>
                    <SearchBar searchChangeHandelr={searchChangeHandelr} />
                </Col>
            </FormContainer>
            <Row>
                <Col >
                    agregar Elemento
                </Col>
            </Row>
            <ListGroup variant="flush">
                {userList.item.map((i, key) =>
                    <ListGroupItem key={key}>
                        <Row>
                            <Col>
                                <CheckBox checked={i.checked} label={i.name} change={value => checkHandeler(value, key)} />
                            </Col>
                            <Col>
                                {i.marca ? i.marca : null}
                            </Col>
                            <Col xs={1}>
                                {i.cantidad ? i.cantidad : null}
                            </Col>
                            <TrashContainer xs={1}>
                                <TrashIcon src={trash} alt='remove icon' onClick={() => removeItemHandler(i)} />
                            </TrashContainer>
                        </Row>
                    </ListGroupItem>
                )}
            </ListGroup >

        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.session.user
})

export default connect(mapStateToProps)(List)
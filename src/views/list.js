import React, { useEffect, useState } from 'react'
import { getFullList, updateItem, updateListService } from "./../services";
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { SearchBar, ItemList, Icon, Model } from './../components'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'
import Pencil from './../utilities/icons/editar.svg'

const FormContainer = styled(Row)`
    padding: 20px 0;
`

const ListContainer = styled(ListGroup)`
    overflow:hidden;
    margin-bottom: 30px;
`;

const Title = styled.h1`
    color:${props => props.color ? props.color : 'inherit'};
    text-transform: capitalize;
`;
const List = ({ match, user, history }) => {
    const { addToast } = useToasts();
    const [editMode, setEditMode] = useState(false);
    const [userList, setUserList] = useState({ item: [] })
    const { id: matchId } = match.params;
    useEffect(() => {
        if (user.id) {
            getFullList(user.id, matchId).then(data => {

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
        }).then(({ data }) => {
            addToast('update success', {
                appearance: 'success',
                autoDismiss: true,
            });
        }).catch((data) => {
            addToast(data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }
    const searchChangeHandelr = value => {
    }
    // const removeListHandler = () => {
    //     const { id: matchId } = match.params;
    //     deletList(user.id, matchId).then(res => history.goBack())
    // };
    // const removeItemHandler = item => {
    //     const updateList = userList.item.filter(i => item._id !== i._id);
    //     const { id: matchId } = match.params;
    //     setUserList({ ...userList, item: updateList });
    // };
    const editHandler = () => {
        setEditMode(true);
    }
    const submit = value => {
        console.log(value)
        updateListService(user.id,matchId, value).then(response => {
            //history.go(0);
            setUserList({
                ...value,
                item: value.items
            })
            addToast('update success', {
                appearance: 'success',
                autoDismiss: true,
            });
        }).catch((data) => {
            addToast(data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        });
        setEditMode(false)
    }
    return (
        <Container>
            <Row className="justify-content-between">
                <Col>
                    <Title color={userList.color}>{userList.name}</Title>
                </Col>
                {!editMode && <Col xs={2} className="align-self-center text-right">
                    <Icon src={Pencil} alt='edit icon' onClick={editHandler} />
                </Col>}
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
            <ListContainer variant="flush">
                {userList.item.map((i, key) =>
                    <ItemList
                        item={i}
                        id={key}
                        key={key}
                        checkHandeler={checkHandeler}
                        editMode={editMode}
                        color={userList.color}
                    />
                )}
            </ListContainer>
            {editMode && <Model show={editMode} data={userList} cancel={() => setEditMode(false)} submit={submit} />}
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.session.user
})

export default connect(mapStateToProps)(List)

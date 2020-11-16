import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchBar, AddModel } from './../components';
import { getList } from "./../services";
import { ListAction } from './../actions/listActions';
import addIcon from './../utilities/icons/plus.svg';
import styled from 'styled-components';

const Icon = styled.img`
	width: 10px;
	hight: 10px;
	margin-right: 5px;
`;
const ListRow = styled(Row)`
	margin-top: 10px;
	margin-bottom: 10px;
`;

const Home = ({ user }) => {
	//const [searchedWord, setSearcedhWord] = useState('');
	const [list, setList] = useState([{ name: 'test' }]);
	const [addModalFlag, setAddModalFlag] = useState(false);
	const modalHandelr = event => console.log('event', event)

	useEffect(() => {
		if (user) {
			console.log('props', user)
			getList(user.id).then(data => {
				console.log('component data', data);
				setList(data)
			})
		}

	}, [user]);

	const toggalAddFlag = () =>{
		console.log('flag', addModalFlag);
		setAddModalFlag(!addModalFlag)
	}
	const closeModal = ()=> {
		setAddModalFlag(false)
	}
	return (
		<Container>
			<Row>
				<Col>
					<SearchBar />
				</Col>
			</Row>
			<ListRow >
				<Col >
					LISTAS
				</Col>
				<Col className="text-right"  onClick={toggalAddFlag} >
					<Icon src={addIcon} alt="add button" />
					add list
				</Col>
			</ListRow>
			<Row>
				<Col>
					<ListGroup variant="flush">
						{list.map((i, key) => <ListGroupItem key={key}>{i.name}</ListGroupItem>)}
					</ListGroup>
				</Col>
			</Row>
			<AddModel show={addModalFlag} cancel={closeModal}/>
		</Container>
	);
}

const mapDispatchToProps = dispatch => ({
	lists: bindActionCreators({ ListAction }, dispatch)
})
const mapStateToProps = state => ({
	user: state.session.user,
	sessionInfo: state.session.authenticated,
	checked: state.session.checked
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
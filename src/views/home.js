import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SearchBar, AddModel, CirculeImage } from './../components';
import { getList, postList } from "./../services";
import styled from 'styled-components';
import AddIcon from './../utilities/icons/plus.svg';


const Icon = styled.img`
	width: 15px;
	height: 15px;
	margin-right: 5px;
	
`;

const ListRow = styled(Row)`
	margin-top: 10px;
	margin-bottom: 10px;
`;
const CardRow =styled(Row)`
	padding: 0 15px;
`
const CardContainer = styled(Col)`
	margin: 10px 0;
	min-height: 50px;
	background-color: ${props=> props.color || '#fdbf62d4'};
    	border-radius: 10px;
	padding-top: 15px;
	display: flex;
	justify-content: space-between;
`;

const Home = ({ user, history }) => {
	const [list, setList] = useState([]);
	const [addModalFlag, setAddModalFlag] = useState(false);
	
	useEffect(() => {
		if (user && user.id) {
			console.log('user', user);
			getList(user.id).then(data => {
				setList(data)
			});
		}

	}, [user]);

	const toggalAddFlag = () => {
		console.log('flag', addModalFlag);
		setAddModalFlag(!addModalFlag)
	}
	const closeModal = () => {
		setAddModalFlag(false)
	}
	const submit = value => {
		console.log('submit', value);
		postList(user.id, value).then(response => {
			history.push(`/list/${response._id}`)
		});
		closeModal()
	}
	const goToList = list => {
		console.log(list)
		history.push(`/list/${list._id}`)
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
				<Col className="text-right" onClick={toggalAddFlag} >
					<Icon src={AddIcon} alt="add button" />
					add list
				</Col>
			</ListRow>
			<CardRow>
				{list.map((i, key) =>
					<CardContainer
						key={key}
						xs={12}
						md={{ span: 4, offset: 1 }}
						color={i.color}
						onClick={() => goToList(i)}
					>
						{i.name}
						<CirculeImage src={user.picture}/>
					</CardContainer>
				)}
			</CardRow >
			<AddModel show={addModalFlag} cancel={closeModal} submit={submit} />
		</Container>
	);
}


const mapStateToProps = state => ({
	user: state.session.user,
	sessionInfo: state.session.authenticated,
	checked: state.session.checked
})

export default connect(mapStateToProps)(Home)

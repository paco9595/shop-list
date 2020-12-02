import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SearchBar, AddModel, CardItem } from './../components';
import { getList, postList } from "./../services";
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
const CardRow =styled(Row)`
	padding: 0 15px;
`
const CardContainer = styled(Col)`
	margin: 10px 0;
	min-height: 100px;
    background-color: #fdbf62d4;
    border-radius: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const Home = ({ user, history }) => {
	const [list, setList] = useState([]);
	const [addModalFlag, setAddModalFlag] = useState(false);
	
	useEffect(() => {
		if (user && user.id) {
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
			setList([...list, response]);
			console.log('post', response)
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
					<Icon src={addIcon} alt="add button" />
					add list
				</Col>
			</ListRow>
			<CardRow>
				{list.map((i, key) =>
					<CardContainer
						key={key}
						xs={12}
						md={{ span: 4, offset: 1 }}
						
						onClick={() => goToList(i)}
					>
						{i.name}
						{i.item.map((j, keyTwo) => (
							<CardItem
								id={keyTwo}
								key={keyTwo}
								checked={j.checked}
								name={j.name}
								checkHandeler={(value) => console.log(value)}
							/>
						))}
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
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SearchBar, Model, CirculeImage } from './../components';
import { getList, postList } from "./../services";
import styled from 'styled-components';
import AddIcon from './../utilities/icons/plus.svg';
import { useToasts } from 'react-toast-notifications'

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
	color: black;
`;

const Home = ({ user, history }) => {
	const [list, setList] = useState([]);
	const { addToast } = useToasts();
	const [addModalFlag, setAddModalFlag] = useState(false);
	useEffect(() => {
		if (user && user.id) {
			getList(user.id).then(data => {
				setList(data)
			});
		}

	}, [user]);

	const toggalAddFlag = () => {
		setAddModalFlag(!addModalFlag)
	}
	const closeModal = () => {
		setAddModalFlag(false)
	}
	const submit = value => {
		postList(user.id, value).then(response => {
			history.push(`/list/${response._id}`)
		}).catch(err=>{
			addToast(err.message, {
                appearance: 'error',
                autoDismiss: true,
            });
		}
		);
		closeModal()
	}
	const goToList = list => {
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
				{list && list.map((i, key) =>
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
			<Model show={addModalFlag} cancel={closeModal} submit={submit} />
		</Container>
	);
}


const mapStateToProps = state => ({
	user: state.session.user,
	sessionInfo: state.session.authenticated,
	checked: state.session.checked
})

export default connect(mapStateToProps)(Home)

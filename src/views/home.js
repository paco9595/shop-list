import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export const Home = () => {
	return (
		<Container>
			<Row>
				<Col>
					<Button variant="success" size="lg" block >
						<Link to="/login">Iniciar session</Link>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

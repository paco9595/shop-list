import React from 'react'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap'
import { googleAuth } from './../../services'
export const LoginModal = (props) => {
	const { show, handleClose } = props;
	const responseGoogle = async user => {
		const token = await googleAuth(user.tokenId);
		console.log('token', token)
	}
	const responseFacebook = user => {
		console.log('facebook', user)
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Body>
				<Container>
					<Row className="justify-content-md-center" >
						<Col xs lg="5">
							<Card >
								<Card.Body>
									<Row>
										<Col> INICIAR Session</Col>
									</Row>
									<Row >
										<Col xs={12}>
											<GoogleLogin
												clientId={'481268890134-i5s0fkblbv4m4ufpqptc036ve1a3ll22.apps.googleusercontent.com'}
												buttonText="Inicia Session"
												onSuccess={responseGoogle}
												onFailure={responseGoogle}
												cookiePolicy={'single_host_origin'}
											/>
										</Col>
										<Col>
											<FacebookLogin
												appId={'1533292150198885'}
												autoLoad={false}
												fields="name,email,picture"
												callback={responseFacebook} />
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}

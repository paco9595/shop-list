import React, { useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Container, Row, Col, Card } from 'react-bootstrap'
import * as LoginServices from './../actions/sessionActions';
import { LoginButton } from './../components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const LineContainer = styled.div`
	border-bottom: ${props => props.theme.primaryGray} solid 1px;
	width: 184px;
	margin: 0px 0px;
	margin-bottom: 24px
`
const Line = styled.div`
	position: relative;
	bottom: -13px;
	left: 80px;
	background-color: #fff;
	width: 26px;
`
const Title = styled.div`
	margin-bottom: 20px;
`

const Login = ({actions, history, sessionInfo}) => {
	useEffect(() => {
		if (sessionInfo) {
			history.push('/home')
		}
	}, [history, sessionInfo]);

	const responseGoogle = async user => {
		const { LoginService } = actions;
		LoginService('google', {
			idToken: user.tokenId
		}, history)
	}
	const responseFacebook = user => {
		console.log(user)
	}

	return <Container>
		<Row className="justify-content-md-center" >
			<Col xs lg="5">
				<Card>
					<Card.Body>
						<Container>
							<Row className="justify-content-md-center">
								<Col className="text-center">
									<Title>
										Login
										</Title>
								</Col>
							</Row>
							<Row className="justify-content-md-center" >
								<Col xs={12} className='d-flex justify-content-center'>
									<GoogleLogin
										clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
										buttonText="Inicia Session"
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
										cookiePolicy={'single_host_origin'}
										render={renderProps => (
											<LoginButton 
												type={'google'}
												title={'Sign in with google'}
												renderProps={renderProps}
											/>
										)}
									/>
								</Col>
							</Row >
							<Row className="justify-content-md-center">
								<Col xs={12} className='d-flex justify-content-center'>
									<LineContainer>
										<Line>OR</Line>
									</LineContainer>
								</Col>
							</Row>
							<Row className="justify-content-md-center">
								<Col xs={12} className='d-flex justify-content-center'>
									<FacebookLogin
										appId={process.env.REACT_APP_FACEBOOK_APP_ID}
										autoLoad={false}
										fields="name,email,picture"
										callback={responseFacebook}
										render={renderProps => (
											<LoginButton
												type={'facebook'}
												title={'Login with facebook'}
												renderProps={renderProps}
											/>
										)}
									/>
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</Container >
}

const mapDispatch = dispatch => ({
	actions: bindActionCreators(LoginServices, dispatch)
});

const mapStateToProps = state => {
	return {
		sessionInfo: state.session.authenticated,
		checked: state.session.checked
	}
};




export default connect(mapStateToProps, mapDispatch)(Login);
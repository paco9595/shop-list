import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Home, Login, List } from './views';
import { NavbarComponent, PrivateRoute, Toast} from './components';
import { ThemeProvider } from 'styled-components';
import { Theme } from './utilities/themes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createBrowserHistory } from "history";

const WrapContainer = styled.div`
	background-color: ${props => props.theme.background};
`;

export const App = ({ authenticated, checked }) => {
	const customHistory = createBrowserHistory();
	return (
		<ThemeProvider theme={Theme}>
			<ToastProvider
				autoDismiss={false}
				placement="top-right"
				autoDismissTimeout={2000}
				components={{ Toast }}
			>
				<WrapContainer>
					<Router history={customHistory }>
						<NavbarComponent />
						{checked &&
							<Switch>
								<PrivateRoute exact path="/home" component={Home} authenticated={authenticated} />
								<PrivateRoute exact path="/list/:id" component={List} authenticated={authenticated} />
								<Route path="/" component={Login} />
							</Switch>
						}
					</Router>
				</WrapContainer>
			</ToastProvider>
		</ThemeProvider>
	);
}

const { bool } = PropTypes;

App.propTypes = {
	authenticated: bool.isRequired,
	checked: bool.isRequired
};

const mapState = ({ session }) => ({
	checked: session.checked,
	authenticated: session.authenticated
});

export default connect(mapState)(App);

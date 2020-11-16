import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login } from './views'
import { NavbarComponent, PrivateRoute } from './components'
import { ThemeProvider } from 'styled-components';
import { Theme } from './utilities/themes'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



export const App = ({ authenticated, checked }) => {
	return (
		<ThemeProvider theme={Theme}>
			<Router>
				<NavbarComponent />
				{checked &&
					<Switch>
						<PrivateRoute exact path="/home" component={Home} authenticated={authenticated} />
						<Route path="/" component={Login} />
					</Switch>
				}
			</Router>
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

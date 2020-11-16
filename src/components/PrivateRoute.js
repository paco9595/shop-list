import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component, exact = false, path, authenticated }) => (
    <Route
        exact={exact}
        path={path}
        render={props => (
            authenticated ? (
                React.createElement(component, props)
            ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }} />
                )
        )}
    />
);
const { object, bool, string } = PropTypes;

PrivateRoute.propTypes = {
  exact: bool,
  path: string.isRequired,
  authenticated: bool.isRequired,
  location: object
};
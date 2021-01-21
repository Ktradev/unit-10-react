import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute ({ from, component: Component, ...rest }) {

    // Import user information from cookies.
    const authenticatedUser = Cookies.getJSON('authenticatedUser');
    const userCredentials = Cookies.getJSON('userCredentials');

    // Declare history variable.
    let location = useLocation();

    // Return either the desired component, or the signin route
    // based on whether a user is signed in.
    return (
        <Route {...rest}>
            {authenticatedUser ? (
                <Component authenticatedUser={authenticatedUser} userCredentials={userCredentials} />
                ) : (
                <Redirect to={{
                    pathname: '/signin',
                    state: { from: location.pathname }
                }} />)
            }
        </Route>
    )
}
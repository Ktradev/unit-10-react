import React from 'react';
import { Link } from 'react-router-dom';

export default function Header (props) {

    // Return different elements in the Header based on whether a user is signed in or not.
    return (
        <div className="header">
            <div className="bounds">
                <Link to="/" className="header--logo">Courses</Link>
                <nav>
                    {props.authenticatedUser ? (
                        <React.Fragment>
                            <span>Welcome, {props.authenticatedUser.firstName + " " + props.authenticatedUser.lastName}!</span>
                            <Link to="/signout">Sign Out</Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="/signup" className="signup">Sign Up</Link>
                            <Link to="/signin" className="signin">Sign In</Link>
                        </React.Fragment>
                    )}
                </nav>
            </div>
        </div>
    );
}

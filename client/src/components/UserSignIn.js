import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function UserSignIn (props) { 

    // Declare history variable.
    let history = useHistory();

    // Declare history variable.
    let location = useLocation();

    // Set State
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // Function that calls the handleSignIn function when the form is submitted.
    const submit = (event) => {
        event.preventDefault();
    
        props.handleSignIn(emailAddress, password)
            .then((user) => {
                if (!user) {
                    setErrors([ 'Sign-in was unsuccessful' ]);
                } else {
                    if (location.state) {
                        history.push(location.state.from);
                    } else {
                        history.goBack();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    }

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign In</h1>
                <div>
                    { errors !== [] && 
                        <ul className="validation--errors--label">{errors.map(error => { return <li key={'error' + error.index}><p>{error}</p></li> })}</ul>
                    }
                    <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={ e => setEmailAddress(e.target.value) } placeholder="Email Address"/></div>
                    <div><input id="password" name="password" type="password" className="" onChange={ e => setPassword(e.target.value) } placeholder="Password"/></div>
                    <div className="grid-100 pad-bottom"><button className="button" onClick={submit} type="submit">Sign In</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                    </form>
                </div>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>
    );
}
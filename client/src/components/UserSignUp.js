import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function UserSignUp (props) {

    // Declare history variable.
    let history = useHistory();

    // Set State
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationTitle, setValidationTitle] = useState([""]); // The Validation Errors text

    // Function that handles signing the user up via our api.
    const handleSignUp = async (e) => {

        e.preventDefault();

        // Reset errors to none.
        setErrors([]);

        if (password === confirmPassword) {
            axios.post(`http://localhost:5000/api/users`, {

                    firstName: firstName,
                    lastName: lastName,
                    emailAddress: emailAddress,
                    password: password
            }).then((response) => {
                if (response.status === 201) {
                    props.handleSignIn(emailAddress, password);
                    history.push("/");
                }
            })
            .catch((error) => {
                if (error.request.status === 400) {
                    setErrors(JSON.parse(error.request.response).errors)
                } else {
                    console.log(error);
                    history.push("/error");
                }
            })
        } else {
            setErrors([ 'Passwords must match.' ]);
        }
    }

    // The Validation Errors text only gets set if error(s) exist,
    // and this updates every time the errors object changes.
    useEffect(() => {
        if (errors.length > 0) {
            setValidationTitle("Validation errors");
        }
    },[errors]);

    return (
        <div>
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h2 className="validation--errors--label">{validationTitle}</h2>
                    { errors !== [] &&
                        <div className="validation-errors"><ul>{errors.map(error => { return <li key={error}><p>{error}</p></li> })}</ul></div>
                    }
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div><input id="firstName" name="firstName" type="text" className="" onChange={ e => setFirstName(e.target.value) } placeholder="First Name"/></div>
                            <div><input id="lastName" name="lastName" type="text" className="" onChange={ e => setLastName(e.target.value) } placeholder="Last Name"/></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={ e => setEmailAddress(e.target.value) } placeholder="Email Address"/></div>
                            <div><input id="password" name="password" type="password" className="" onChange={ e => setPassword(e.target.value) } placeholder="Password"/></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" onChange={ e => setConfirmPassword(e.target.value) } placeholder="Confirm Password"/></div>
                            <div className="grid-100 pad-bottom"><button className="button" onClick={e => handleSignUp(e)} type="submit">Sign Up</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                        </form>
                    </div>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        </div>
    );

}
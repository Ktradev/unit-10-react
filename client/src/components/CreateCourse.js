import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function CreateCourse (props) {

    // Declare history variable.
    let history = useHistory();

    // Set State
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ estimatedTime, setEstimatedTime ] = useState(null);
    const [ materialsNeeded, setMaterialsNeeded ] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationTitle, setValidationTitle] = useState([""]); // The Validation Errors text

    // Function that handles creating a course with our api.
    const handleCreation = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:5000/api/courses`,
            {
                title: title,
                description: description,
                userId: props.authenticatedUser.id,
                estimatedTime: estimatedTime,
                materialsNeeded: materialsNeeded
            },
            {headers: {
                Authorization: `Basic ${props.userCredentials}`
            }})
        .then((res) => {
            if (res.status === 201) {
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
        });
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
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                <div>
                    <h2 className="validation--errors--label">{validationTitle}</h2>
                    <div>
                        { errors !== [] && <h2 className="validation--errors--label">Validation errors</h2> &&
                            <div className="validation-errors"><ul>{errors.map(error => { return <li key={error}><p>{error}</p></li> })}</ul></div>
                        }
                    </div>
                </div>
                <form>
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={ e => setTitle(e.target.value) } placeholder="Course title..."/></div>
                        <p>By {props.authenticatedUser ? props.authenticatedUser.firstName + " " + props.authenticatedUser.lastName : ""}</p>
                    </div>
                    <div className="course--description">
                        <div><textarea source={description} id="description" name="description" className="" onChange={ e => setDescription(e.target.value) } placeholder="Course description..."></textarea></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={ e => setEstimatedTime(e.target.value) } placeholder="Hours"/></div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea source={materialsNeeded} id="materialsNeeded" name="materialsNeeded" className="" onChange={ e => setMaterialsNeeded(e.target.value) } placeholder="List materials..."></textarea></div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" onClick={e => handleCreation(e)} type="submit">Create Course</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                </form>
                </div>
            </div>
        </div>
    );
}
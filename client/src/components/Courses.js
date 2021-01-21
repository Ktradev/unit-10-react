import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Courses (props) {
    
    // Declare history variable.
    let history = useHistory();

    // Set the courses state variable.
    const [courses, setCourses] = useState([]);

    // Fetches the data as soon as the component mounts, then sets
    // the courses state equal to the course returned from the api.
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/api/courses')
                .then(res => {
                setCourses(res.data.courses);
                })
                .catch(error=>{
                console.log(error);
                history.push("/error");
            }).catch((error) => {
                console.log(error);
                history.push("/error");
            });
        }
        fetchData();
    }, [history]);

    return (
        <div className="bounds">
            {
                courses.map(course => {
                return <div className="grid-33" key={course.id}>
                    <Link to={`/courses/${course.id}`} className="course--module course--link">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{ course.title }</h3>
                    </Link>
                </div>})
            }
            <div className="grid-33">
                <Link to="/courses/create" className="course--module course--add--module">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link>
            </div>
        </div>
    );
}

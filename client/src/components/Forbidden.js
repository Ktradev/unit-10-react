import React from 'react';
import { Link } from 'react-router-dom';

export default function Forbidden () {

    return(
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Uh oh! You can't access this page.</p>
            <p>Click <Link to="/">here</Link> to return to the home page.</p>
        </div>
    )
}
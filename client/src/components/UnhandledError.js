import React from 'react';
import { Link } from 'react-router-dom';

export default function UnhandledError () {

    return(
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <p>Click <Link to="/">here</Link> to return to the home page.</p>
        </div>
    )

}
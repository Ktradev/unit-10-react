import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function UserSignOut (props) {

    // Declare history variable.
    let history = useHistory();

    // Signs out the user when the component mounts.
    useEffect(() => {
        props.handleSignOut();
        history.push("/")
    });

    
    return (
        null
    );
}
import React from 'react';
import {useAuth} from "../../hooks/useAuth";

const MyComponent = () => {
    const {user, setUser} = useAuth()

    return (
        user
        ? (<>
            <h2>Welcome, {user.name}!</h2>
            <button className={'btn'} onClick={() => setUser(null)}>Logout</button>
        </>)
        : <button className={'btn'} onClick={() => setUser({
            name: 'Vladyslav'
        })}>Login</button>
    );
};

export default MyComponent;

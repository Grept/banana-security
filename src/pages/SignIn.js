import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../components/AuthContext";

function SignIn() {

    const {loginFunction} = useContext(AuthContext);

    function handleSubmit(e) {
        // console.log(e.target[0].value);
        loginFunction(e.target[0].value);
        e.preventDefault()
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <input type="email"/>
                <input type="password"/>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
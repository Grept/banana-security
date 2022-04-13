import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../components/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";


function SignIn() {

    const {loginFunction} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function requestLogin(data) {
        try {
            const {data: {accessToken: jwtToken}} = await axios.post("http://localhost:3000/login", {
                email: data.email,
                password: data.password
            });

            loginFunction(jwtToken);

        } catch (e) {
            console.error(e);
        }


        // loginFunction(data.target[0].value);
        // data.preventDefault()
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(requestLogin)}>
                <input
                    type="email"
                    placeholder="email address"
                    {...register("email", {required: true})}
                />
                {errors.email && <p>Please enter an email address</p>}

                <input
                    type="password"
                    placeholder="password"
                    {...register("password", {required: true})}
                />
                {errors.password && <p>Please enter a password</p>}

                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const history = useHistory();

    async function registerUser(userData) {
        console.log(userData)
        try {
            const {data} = await axios.post("http://localhost:3000/register", userData)
            console.log(data);
            history.push("/signin");

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit(registerUser)}>

                <input
                    type="text"
                    placeholder="username"
                    {...register("username", {required: true})}
                />
                {errors.username && <p>Please enter a username</p>}

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

                <input type="submit"/>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
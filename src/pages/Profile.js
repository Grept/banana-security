import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../components/AuthContext";
import axios from "axios";

function Profile() {

    const [secretContent, setSecretContent] = useState({secretTitle: null, secretContent: null});
    const {user} = useContext(AuthContext);

    useEffect(()=> {
        getSecretContent();
    }, [])

    async function getSecretContent() {
        try{
            const {data: {title, content}} = await axios.get("http://localhost:3000/660/private-content", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setSecretContent({
                secretTitle: title,
                secretContent: content
            })

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>{secretContent.secretTitle}</h2>
                <p>{secretContent.secretContent}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;
import React, {createContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import tokenValidator from "../helpers/TokenValidator";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    /*
    * Voeg extra key "status" toe aan de state. Deze staat standaard op "pending"
    * */

    const [userAuth, setUserAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    })


    /*
    * useEffect(() => {}, [])
    * is er een token aanwezig in de localStorage?
    * JA? haal de gebruikersdata opnieuw op en zet in de state. Zet status op "done"
    *
    * NEE? Zet status op "done"
    * */
    useEffect(() => { // Check of er al een token in local staat
        const token = localStorage.getItem("token");
        const source = axios.CancelToken.source()

        if (tokenValidator(token)) {
            getUserData(token, source)
        } else {
            setUserAuth({
                ...userAuth,
                status: "done",
            });
        }

        return function cleanup() {
            console.log("Cleaning...")
            source.cancel();
        }

    }, [])

    const history = useHistory();

    async function getUserData(jwtToken, cancelToken) {
        const {sub: userId} = jwtDecode(jwtToken);

        try {
            const {data: userDetails} = await axios.get(`http://localhost:3000/600/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                },
                // Asl er een canceltoken is vul hem in; vul anders null in.
                cancelToken: cancelToken ? cancelToken.token : null
            })

            setUserAuth({
                ...userAuth,
                isAuth: true,
                user: {
                    username: userDetails.username,
                    email: userDetails.email,
                    id: userDetails.id,
                },
                status: "done"
            });

            console.log("Gebruiker is ingelogd");
            history.push("/profile");

        } catch (e) {
            console.log(e);
        }
    }

    function logIn(jwtToken) {
        localStorage.setItem("token", jwtToken);
        getUserData(localStorage.getItem("token"));
    }

    function logOut() {
        localStorage.removeItem("token");
        setUserAuth({
            ...userAuth,
            isAuth: false,
            user: null,
            status: "done"
        });
        console.log("Gebruiker is uitgelogd");
        history.push("/");
    }

    const data = {
        auth: userAuth.isAuth,
        user: userAuth.user,
        loginFunction: logIn,
        logoutFunction: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {/* Check wat de status is voordat App.js geladen wordt.*/}
            {userAuth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
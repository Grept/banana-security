import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const history = useHistory();

    const [userAuth, setUserAuth] = useState({
        isAuth: false,
        user: null,
    })


    async function logIn(jwtToken) {
        localStorage.setItem("token", jwtToken);
        const {sub: userId} = jwtDecode(jwtToken);

        try {
            const {data: userDetails} = await axios.get(`http://localhost:3000/600/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setUserAuth({
                isAuth: true,
                user: {
                    username: userDetails.username,
                    email: userDetails.email,
                    id: userDetails.id,
                },
            });
            console.log("Gebruiker is ingelogd");
            history.push("/profile");

        } catch (e) {
            console.log(e);
        }

    }

    function logOut() {
        setUserAuth({isAuth: false, user: null})
        console.log("Gebruiker is uitgelogd");
        history.push("/");
    }

    const data = {
        auth: userAuth.isAuth,
        user: userAuth.user,
        loginFunction: logIn,
        logoutFunction: logOut,
        myNumber: 6,
        myString: "Tom",
        myBool: false,
        myList: [1, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
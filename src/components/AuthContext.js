import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const history = useHistory();

    const [userAuth, setUserAuth] = useState({isAuth: false, user: ""})


    function logIn(userEmail) {
        setUserAuth({isAuth: true, user: userEmail});
        console.log("Gebruiker is ingelogd");
        history.push("/profile");
    }

    function logOut() {
        setUserAuth({isAuth: false, user: ""})
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

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
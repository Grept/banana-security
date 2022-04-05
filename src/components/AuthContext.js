import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const history = useHistory();
    const [isAuth, toggleIsAuth] = useState(false);

    function logIn() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd");
        history.push("/profile");
    }

    function logOut() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd");
        history.push("/");
    }

    const data = {
        auth: isAuth,
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
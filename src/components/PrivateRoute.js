import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "./AuthContext";


function PrivateRoute({children, ...rest}) {

    const {auth} = useContext(AuthContext);

    return(
        <Route {...rest}>
            {auth ? children : <Redirect to="/signin" />}
        </Route>
    )
}

export default PrivateRoute;
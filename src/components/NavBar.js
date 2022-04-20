import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from "./AuthContext";

function NavBar() {
    const history = useHistory();

    const {auth, logoutFunction, user} = useContext(AuthContext);

    return (
        <nav>
            <Link exact to="/">
                <span className="logo-container">
                    <img src={logo} alt="logo"/>
                    <h3>
                        Banana Security
                    </h3>
                </span>
            </Link>

            {user !== null && <h3>{user.username} / {user.email}</h3>}

            {!auth
                ?
                <div>
                    <button
                        type="button"
                        onClick={() => history.push('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        Registreren
                    </button>
                </div>
                :
                <div>
                    <button
                        type="button"
                        onClick={logoutFunction}
                    >
                        Log out
                    </button>
                </div>
            }
        </nav>
    );
}

export default NavBar;
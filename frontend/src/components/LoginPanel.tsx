import {useContext} from "react";

import type {UserContextType} from "../types/types.ts";
import {UserContext} from "../context/helper/userContexthelper.tsx";


const LoginPanel = () => {
    const {loading, userLoggedIn, user, setLoading} = useContext<UserContextType>(UserContext)

    const getText = () => {
        if(loading)  return "Loading..."
        if(userLoggedIn) return "Logout"
        return "Login"
    }
    const loginToggle = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

        if(userLoggedIn) {
            setLoading(true)
            window.open(host + '/logout', '_self')
        }else{
            setLoading(true)
            window.open(host + '/oauth2/authorization/github', '_self')
        }
    }


    return(
        <div className="loginPanel">
            <span className="welcome-note">{userLoggedIn && "Welcome " + user?.name}</span>
            <button className="btn" onClick={() => loginToggle()}>{getText()}</button>
        </div>
    )
}
export default LoginPanel
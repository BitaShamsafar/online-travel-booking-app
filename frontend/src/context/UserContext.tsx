import {useEffect, useMemo, useState} from "react";
import axios from 'axios'

import type {User, UserContextProps, UserContextType} from "../types/types.ts";
import { UserContext } from "./helper/contexthelper.tsx";


const UserContextProvider = ({children}: UserContextProps) => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<User | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        axios.get("/api/auth/check").then(response => {
            setUser({email: "", name: response.data.name})
            setUserLoggedIn(true)
        }).catch(() => {
            setUser(undefined)
            setUserLoggedIn(false)
        }).finally(() => {
            setLoading(false)
        });
    }, []);

    const contextValue: UserContextType = useMemo(() => {
        return (
            {user, userLoggedIn, loading, setLoading}
        )
    } ,[user, userLoggedIn, loading])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
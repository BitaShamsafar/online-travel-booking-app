import {createContext} from "react";
import type {UserContextType} from "../../types/types.ts";

export const UserContext = createContext<UserContextType>({
    user: undefined,
    userLoggedIn: false,
    loading: true,
    setLoading: () => undefined

})

import type {ReactElement} from "react";

export type UserContextProps = {
    children: ReactElement
}
export type User = {
    email: string,
    name: string,
}
export type UserContextType = {
    user?: User,
    userLoggedIn: boolean,
    loading: boolean,
    setLoading: (val: boolean) => void
}
export type ModalType = 'destination' | 'calendar' | 'ppl' | undefined

export type City = {
    id: string,
    name: string,
    conutry: string,
    subcountry: string,
    geonameid: number

}
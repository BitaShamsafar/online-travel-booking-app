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
    country: string,
    subcountry: string,
    geonameid: number

}
export type Source = 'hotels' | 'topHotels' | 'tours' | 'topTours' | 'hotelSearch'
export type HotelSearchParamsType = {
    destination: string,
    checkin: string,
    checkout: string,
    occupancy: {
        adults: number,
        children: number,
        room: number
    }
}
export type HotelSearch = {
    searchParams?: HotelSearchParamsType,
    setSearchParams?: (state: HotelSearchParamsType) => void

}
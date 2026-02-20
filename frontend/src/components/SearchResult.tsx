import {useContext, useState} from "react";
import useFetch from "../hooks/useFetch.tsx";
import {useSearchParams} from "react-router-dom";
import CardView from "./CardView.tsx";

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const allHotels = useFetch("hotelSearch", destination)
    return <div className="hotels-wrapper">
        {allHotels ? allHotels?.map(hotel =>

            <CardView key={hotel.id} item={hotel} />
        ) : <div>Loading...</div>}
    </div>
}
export default SearchResult
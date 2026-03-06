import useFetch from "../hooks/useFetch.tsx";
import CardView from "./CardView.tsx";
import Filters from "./Filters.tsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


const Hotels = () => {
    const [searchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const allHotels = useFetch( destination ? "hotelSearch" : "hotels", destination)
    const [filteredHotels, setFilteredHotels] = useState(allHotels)
    const [filters, setFilters] = useState({
        priceRange: "0 - 5000",
        rating: [],
        facilities: []
    })

    useEffect(() => {
        setFilteredHotels(allHotels)
    }, [allHotels]);

    useEffect(() => {
        let hotels = allHotels
        if(filters.priceRange) {
            const [min, max] = filters.priceRange.split(" - ").map(Number)
            hotels = hotels?.filter(hotel => hotel.pricePerNight >= min && hotel.pricePerNight <= max)
        }
        if(filters.rating.length > 0) {
            hotels = hotels?.filter(hotel => filters.rating.includes(Math.round(hotel.rating)))
        }
        if(filters.facilities.length > 0) {
            hotels = hotels?.filter(hotel => filters.facilities.every(facility => hotel.facilities.includes(facility)))
        }
        setFilteredHotels(hotels)

    }, [filters]);

    const allFacilities = () => {
        const facilitiesSet = new Set<string>()
        allHotels?.forEach(hotel => hotel.facilities.forEach((facility: string) => facilitiesSet.add(facility)))
        return Array.from(facilitiesSet)
    }

    return(
        <div className="hotels-page">
            <h2>Hotels to discover</h2>
            <Filters allFacilities={allFacilities} filters={filters} setFilters={setFilters} />
            <div className="hotels-wrapper">
                {allHotels ? filteredHotels?.map(hotel =>

                    <CardView key={hotel.id} item={hotel} />
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}
export default Hotels;
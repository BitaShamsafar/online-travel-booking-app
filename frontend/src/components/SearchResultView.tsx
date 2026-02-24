
import useFetch from "../hooks/useFetch.tsx";
import {useSearchParams} from "react-router-dom";
import CardView from "./CardView.tsx";
import Filters from "./Filters.tsx";

const SearchResultView = () => {
    const [searchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const allHotels = useFetch("hotelSearch", destination)
    return <div className="search-view">

            <Filters />
        <div className="results">
        {allHotels ? allHotels?.map(hotel =>
            <CardView key={hotel.id} item={hotel} />
        ) : <div>Loading...</div>

    }</div>
    </div>
}
export default SearchResultView
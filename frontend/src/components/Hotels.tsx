import useFetch from "../hooks/useFetch.tsx";
import CardView from "./CardView.tsx";


const Hotels = () => {
    const allHotels = useFetch("hotels")

    return(
        <div className="hotels-page">
            <h2>Hotels to discover</h2>
            <div className="hotels-wrapper">
                {allHotels ? allHotels?.map(hotel =>

                    <CardView key={hotel.id} item={hotel} />
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}
export default Hotels
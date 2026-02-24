import useFetch from "../hooks/useFetch.tsx";
import CardView from "./CardView.tsx";


const Tours = () => {
    const allTours = useFetch("tours")
    return(
        <div className="hotels-page">
            <h2>Tours to discover</h2>
            <div className="hotels-wrapper">
                {allTours ? allTours?.map(tour =>

                    <CardView key={tour.id} item={tour} />
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}
export default Tours;
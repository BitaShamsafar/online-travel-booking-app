import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch.tsx";
import FlightSerach from "./FlightSerach.tsx";

const HotelDetailsView = () => {
    const { hotelId } = useParams();
    const hotel =  useFetch('hotel', hotelId)
    const random = Math.ceil(Math.random() * 10);
    return (
        <div className="hotel-detail">
            <h2>Don't miss to book your flight </h2>
            <div className="search-box">

                <FlightSerach />
            </div>
            <div className="hotel-detail-container">
                {hotel ? <>

                    <div className="image-gallery">
                        <img src={"/images/hotel"+ random + ".jpg"} alt={hotel.name} className="main-image" />
                        <div className="thumbnail-row">
                            {hotel.images.map((img, index) => {
                                const random = Math.ceil(Math.random() * 10);
                                return <img key={index} src={"/images/hotel"+ random + ".jpg"} alt="Hotel view" />
                            })}
                        </div>
                    </div>

                    {/* Hotel Info */}
                    <div className="hotel-info">
                        <div className="header">
                            <h1>{hotel.name}</h1>
                            <span className="rating">⭐ {hotel.rating}</span>
                        </div>

                        <p className="location">📍 {hotel.location}</p>

                        <div className="price-box">
                            <span className="price">${hotel.pricePerNight}</span>
                            <span className="per-night"> / night</span>
                        </div>

                        <p className="description">{hotel.description}</p>

                        {/* Facilities */}
                        <div className="facilities">
                            <h3>Facilities</h3>
                            <ul>
                                {hotel.facilities.map((facility, index) => (
                                    <li key={index}>✔ {facility}</li>
                                ))}
                            </ul>
                        </div>

                        <button className="book-now-btn">Book Now</button>
                    </div>
                </> : <div>Loading...</div>}
            </div>

        </div>
    );
}

export default HotelDetailsView;
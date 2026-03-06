import {useParams, useSearchParams} from "react-router-dom";
import useFetch from "../hooks/useFetch.tsx";
import FlightSearch from "./FlightSerach.tsx";
import {normalizeParam, useSearchData} from "../hooks/useSearchData.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faCircleCheck, faStar} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import HotelSearch from "./HotelSearch.tsx";
import {UserContext} from "../context/helper/contexthelper.tsx";
import {ShoppingCartContext} from "../context/ShoppingCartContext.tsx";

const HotelDetailsView = () => {
    const { hotelId } = useParams();
    const hotel =  useFetch('hotel', hotelId)
    const random = Math.ceil(Math.random() * 10);
    const params = useSearchData()
    const {rooms, adults, children} = params
    const { addToCart } = useContext(ShoppingCartContext)
    const [occupancyDetails, setOccupancyDetails] = useState({
        adults: normalizeParam(adults) ? adults : 2,
        children: normalizeParam(children) ? children : 0,
        room: normalizeParam(rooms) ? rooms : 1
    })


    const [nights, setNights] = useState<number | undefined>(0)
    const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)

    useEffect(() => {
        const { adults, children } = occupancyDetails;
        const totalGuests = parseInt(adults) + (parseInt(children) * 0.5);
        if(hotel?.pricePerNight && nights){

           setTotalPrice(totalGuests * hotel.pricePerNight * nights)
        }
    }, [hotel, nights, occupancyDetails])

    const handleAddToCart = () => {

        addToCart({
            type: 'hotel',
            id: hotel.id,
            name: hotel.name,
            price: totalPrice,
            checkindate: params.checkin,
            checkoutdate: params.checkout,
            details: {
                nights,
                occupancy: occupancyDetails
            }
        })
    }

    return (
        <div className="hotel-detail">
            <h2>Don't miss to book your flight </h2>
            <div className="search-box">
                <FlightSearch params={params} />
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
                            <span className="rating">   {hotel.rating} <FontAwesomeIcon color="#FDCC0D" icon={faStar}/></span>
                        </div>

                        <p className="location">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {hotel.location}</p>

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
                                    <li key={index}><FontAwesomeIcon icon={faCircleCheck} />{ '  ' + facility}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="booking-request">
                            <div className="search-box" >
                                <HotelSearch seachParams={params} noSearch={true} updateNights={ (nights) => setNights(nights)} setOccupancy={(prop) => setOccupancyDetails(prop)}/>
                            </div>
                            This Hotel will be reserved as below:   <br/>
                            {`${occupancyDetails.adults} adults, ${occupancyDetails.children} children and ${occupancyDetails.room} room(s)`}<br/>
                            { totalPrice ? 'Total price for ' + nights + ' Nights is ' +  totalPrice + ' Euro' : <span style={{color: "red"}}>Select your dates</span>}<br/>
                            book now to secure this price!
                        </div>

                        <button disabled={!totalPrice} className="book-now-btn" onClick={() => handleAddToCart()} >Reserve Now</button>
                    </div>
                </> : <div>Loading...</div>}
            </div>

        </div>
    );
}

export default HotelDetailsView;
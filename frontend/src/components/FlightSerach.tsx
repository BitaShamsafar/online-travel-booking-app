import {useCallback, useEffect, useRef, useState} from "react";
import type {City, ModalType} from "../types/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import RoomSelector from "./RoomSelector.tsx";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const FlightSearch = () => {

    const [tripType, setTripType] = useState("roundTrip");
    const [openModalId, setOpenModalId] = useState<ModalType>(undefined)
    const [destination, setDestination] = useState<string | undefined>()
    const [source, setSource] = useState<string | undefined>()
    const [cities, setCities] = useState<City[] | undefined>(undefined)
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
    const [occupancyDetails, setOccupancyDetails] = useState({
        adults: 2,
        children: 0,
    })

    const modalRefDest = useRef<HTMLDivElement>(undefined)
    const modalRefDate = useRef<HTMLDivElement>(undefined)
    const modalRefPpl = useRef<HTMLDivElement>(undefined)

    const checkOutsideClick = (e) => {
        if(openModalId && !(modalRefDest.current?.contains(e.target) || modalRefDate.current?.contains(e.target) || modalRefPpl.current?.contains(e.target))){
            setOpenModalId(undefined)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', checkOutsideClick)
    });
    useEffect(() => {
        if(destination == null) {
            return
        }
        const debounce = setTimeout(() => {
            axios.get(`api/cities/${destination}`)
                .then(res => setCities(res.data))
                .catch(err => console.log('ERR', err)
                )
        }, 500)
        return () => clearTimeout(debounce)
    }, [destination])
    useEffect(() => {
        if(source == null) {
            return
        }
        const debounce = setTimeout(() => {
            axios.get(`api/cities/${source}`)
                .then(res => setCities(res.data))
                .catch(err => console.log('ERR', err)
                )
        }, 500)
        return () => clearTimeout(debounce)
    }, [source])


    const getDatePlaceholder = useCallback((): string => {
        const checkInString = checkInDate ? ` ${checkInDate.getDate()}.${checkInDate.getMonth()}.${checkInDate.getFullYear()}  ` : 'outbound '
        const checkoutString = checkOutDate ? ` - ${checkOutDate.getDate()}.${checkOutDate.getMonth()}.${checkOutDate.getFullYear()}` : '- Return Date'
        return checkInString + (tripType === 'roundTrip' ? checkoutString : 'Date')
    }, [checkOutDate, checkInDate, tripType])

    const navigate = useNavigate();

    const handleSearch = () => {
        if (!destination || !checkInDate || (tripType == 'roundTrip' && !checkOutDate)) {
            alert("Please fill all search fields");
            return;
        }

        navigate({
            pathname: "/search/flights",
            search: new URLSearchParams({
                destination,
                checkin: checkInDate,
                checkout: checkOutDate,
                occupancy: occupancyDetails,
            }).toString(),
        });
    };


        return (
            <div className="flight-search-form" >
                <div className="trip-type">
                    <label>
                        <input
                            type="radio"
                            name="tripType"
                            value="roundTrip"
                            checked={tripType === "roundTrip"}
                            onChange={() => setTripType("roundTrip")}
                        />
                        Round Trip
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tripType"
                            value="oneway"
                            checked={tripType === "oneWay"}
                            onChange={() => setTripType("oneWay")}
                        />
                        One Way
                    </label>
                </div>
                <div className="search-fields">

                        <div ref={modalRefDest}>
                            <input autoComplete="off"
                                   className="search-box-input"
                                   type="text"
                                   name="source"
                                   value={source}
                                   onFocus={() => setOpenModalId(undefined)}
                                   onChange={(e) => {
                                       const value = e.target.value;
                                       setSource(value);
                                       if (value) {
                                           setOpenModalId("source")
                                       } else {
                                           setOpenModalId(undefined);
                                       }
                                   }}
                                   placeholder="Leaving from"/>
                            <div
                                style={{display: openModalId === 'source' ? 'block' : 'none'}}
                                className="modal">
                                {cities?.length > 0 ? cities?.map((city:City) => {
                                        return (
                                            <div key={city.id}
                                                 className="search-result"
                                                 onClick={() => {
                                                     setOpenModalId(undefined)
                                                     setSource(city.name)
                                                 }}>
                                                <div>
                                                    <FontAwesomeIcon  icon={faLocationDot} />
                                                </div>
                                                <div >
                                                    {city.name} , {city.country}
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    <div> No result found </div>}
                            </div>
                        </div>
                    <div ref={modalRefDest}>
                        <input autoComplete="off"
                               className="search-box-input"
                               type="text"
                               name="destination"
                               value={destination}
                               onFocus={() => setOpenModalId(undefined)}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setDestination(value);
                                   if (value) {
                                       setOpenModalId("destination")
                                   } else {
                                       setOpenModalId(undefined);
                                   }
                               }}
                               placeholder="Destination"/>
                        <div
                            style={{display: openModalId === 'destination' ? 'block' : 'none'}}
                            className="modal">
                            {cities?.length > 0 ? cities?.map((city:City) => {
                                    return (
                                        <div key={city.id}
                                             className="search-result"
                                             onClick={() => {
                                                 setOpenModalId(undefined)
                                                 setDestination(city.name)
                                             }}>
                                            <div>
                                                <FontAwesomeIcon  icon={faLocationDot} />
                                            </div>
                                            <div >
                                                {city.name} , {city.country}
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div> No result found </div>}
                        </div>
                    </div>

                        <div ref={modalRefDate}  className="modalWrap">
                            <input
                                autoComplete="off"
                                onFocus={() => setOpenModalId("calendar")}
                                className="search-box-input"
                                type="text"
                                name="date"
                                readOnly
                                value={getDatePlaceholder()}
                               />
                            <div
                                style={{display: openModalId === 'calendar' ? 'block' : 'none'}}
                                className="modal calendar">
                                <div className="calender-wrapper-checkin">
                                    <p>Select outbound flight date </p>
                                    <Calendar
                                        onChange={setCheckInDate}
                                        value={checkInDate}
                                    />
                                </div>
                                <div style={{display: tripType === 'roundTrip' ? 'block' : ' none'}} className="calender-wrapper-checkout">
                                    <p>Select return flight date </p>
                                    <Calendar
                                        onChange={setCheckOutDate}
                                        value={checkOutDate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div ref={modalRefPpl}>
                            <input
                                autoComplete="off"
                                onFocus={() => setOpenModalId("ppl")}
                                className="search-box-input"
                                type="search"
                                name="ppl"
                                readOnly
                                value={`${occupancyDetails.adults + occupancyDetails.children} Passengers`}
                                placeholder="2 adults - 0 children - 1 room"/>
                            <div
                                style={{display: openModalId === 'ppl' ? 'block' : 'none'}}
                                className="modal">
                                <RoomSelector props={{occupancyDetails,
                                    setOccupancyDetails,
                                    isHotel: false}} />
                            </div>
                        </div>


                <button className="flight-search-btn search-btn btn" onClick={handleSearch}>
                    Search
                </button> </div>
            </div>
        );

}
export default FlightSearch;
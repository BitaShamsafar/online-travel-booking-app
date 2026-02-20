import {useCallback, useEffect, useRef, useState} from "react";
import type {City, ModalType} from "../types/types.ts";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import RoomSelector from "./RoomSelector.tsx";
import { useNavigate } from "react-router-dom";


const SearchPanel = () => {
    const [openModalId, setOpenModalId] = useState<ModalType>(undefined)
    const [destination, setDestination] = useState<string | undefined>()
    const [cities, setCities] = useState<City[] | undefined>(undefined)
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
    const [occupancyDetails, setOccupancyDetails] = useState({
        adults: 2,
        children: 0,
        room: 1
    })
    const modalRefDest = useRef<HTMLDivElement>()
    const modalRefDate = useRef<HTMLDivElement>()
    const modalRefPpl = useRef<HTMLDivElement>()

    const checkOutsideClick = (e) => {
       if(openModalId && !(modalRefDest.current.contains(e.target) || modalRefDate.current.contains(e.target) || modalRefPpl.current.contains(e.target))){
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


    const getDatePlaceholder = useCallback((): string => {
        const checkInString = checkInDate ? ` ${checkInDate.getDate()}.${checkInDate.getMonth()}.${checkInDate.getFullYear()} - ` : 'Checkin Date - '
        const checkoutString = checkOutDate ? `${checkOutDate.getDate()}.${checkOutDate.getMonth()}.${checkOutDate.getFullYear()}` : 'Checkout Date'
        return checkInString + checkoutString
    }, [checkOutDate, checkInDate])
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!destination || !checkInDate || !checkOutDate) {
            alert("Please fill all search fields");
            return;
        }

        navigate({
            pathname: "/search/hotels",
            search: new URLSearchParams({
                destination,
                checkin: checkInDate,
                checkout: checkOutDate,
                occupancy: occupancyDetails,
            }).toString(),
        });
    };


    return(
        <div className="search-box-wrapper">
            <div className="header">Find your next destination</div>
            <div className="search-tab">
                <div className="tab">Hotels</div>
                <div className="tab">Flights</div>
            </div>
            <div className="search-box">
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
                        placeholder="Check in - Check out"/>
                    <div
                        style={{display: openModalId === 'calendar' ? 'block' : 'none'}}
                        className="modal calendar">
                        <div className="calender-wrapper-checkin">
                            <p>Select check-in date </p>
                            <Calendar
                                onChange={setCheckInDate}
                                value={checkInDate}
                            />
                        </div>
                        <div className="calender-wrapper-checkout">
                            <p>Select check-out date </p>
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
                        value={`${occupancyDetails.adults} adults - ${occupancyDetails.children} children - ${occupancyDetails.room} room`}
                        placeholder="2 adults - 0 children - 1 room"/>
                    <div
                        style={{display: openModalId === 'ppl' ? 'block' : 'none'}}
                        className="modal">
                        <RoomSelector props={{occupancyDetails, setOccupancyDetails}} />
                    </div>
                </div>
                <button className="search-btn btn" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchPanel
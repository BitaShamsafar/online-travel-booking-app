import {useEffect, useRef, useState} from "react";
import type {City, ModalType} from "../types/types.ts";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import useOutsideClick from "../hooks/useOutsideClick.tsx";


const SearchPanel = () => {
    const [openModalId, setOpenModalId] = useState<ModalType>(undefined)
    const [destination, setDestination] = useState<string | undefined>(undefined)
    const [cities, setCities] = useState<City[] | undefined>(undefined)
    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkOutDate, setCheckOutDate] = useState(new Date())
    const ref = useRef()

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




    return(

        <div className="search-box-wrapper">
            <div className="header">Find your next destination</div>
            <div className="search-box">
                <div>
                    <input autoComplete="off"
                           className="search-box-input"
                           type="text"
                           name="destination"
                           ref={ref}
                           onMouseDown={useOutsideClick(ref, () => setOpenModalId(undefined))}
                           value={destination}
                           onFocus={() => setOpenModalId(undefined)}
                           onChange={(e) => {
                               const value = e.target.value;
                               setDestination(value);
                               if (!value) {
                                   setOpenModalId(undefined);
                               } else {
                                   setOpenModalId("destination");
                               }
                           }}
                           placeholder="Destination"/>
                    <div
                        style={{display: openModalId === 'destination' ? 'block' : 'none'}}
                        className="modal">
                        {cities?.length > 0 ? cities?.map(city => {
                            return (
                                <div key={city.id}
                                     className="search-result"
                                     onClick={() => {
                                         setOpenModalId(undefined)
                                         setDestination(city.name)
                                     }}
                                >
                                    <div>
                                        <FontAwesomeIcon  icon={faLocationDot} />
                                    </div>
                                    <div >
                                        {city.name} , {city.subcountry}
                                    </div>
                                </div>
                            )

                        }) : <div> No result found </div>}
                    </div>
                </div>
                <div>
                    <input
                        autoComplete="off"
                        onFocus={() => setOpenModalId("calendar")}
                        className="search-box-input"
                        type="text"
                        name="date"
                        value={` ${checkInDate.getDate()}.${checkInDate.getMonth()}.${checkInDate.getFullYear()} - ${checkOutDate.getDate()}.${checkOutDate.getMonth()}.${checkOutDate.getFullYear()}`}
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
                <div>
                    <input
                        autoComplete="off"
                        onFocus={() => setOpenModalId("ppl")}
                        className="search-box-input"
                        type="text"
                        name="ppl"
                        placeholder="2 adults - 0 children - 1 room"/>
                    <div
                        style={{display: openModalId === 'ppl' ? 'block' : 'none'}}
                        className="modal">
                    </div>
                </div>
                <button className="search-btn btn">Search</button>
            </div>
        </div>
    )
}

export default SearchPanel
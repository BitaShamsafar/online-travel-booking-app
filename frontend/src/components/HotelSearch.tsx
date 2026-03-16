import type {City, ModalType} from "../types/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import RoomSelector from "./RoomSelector.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {normalizeParam} from "../hooks/useSearchData.tsx";
type HotelSearchProps = {
    noSearch?: boolean,
    updateNights?: (nights: number) => void
    setOccupancy?: () => void,
    seachParams?: {
        destination?: string,
        checkin?: string,
        checkout?: string,
        adults?: number,
        children?: number,
        rooms?: number
    }
}

const HotelSearch = (props : HotelSearchProps) => {
    const [openModalId, setOpenModalId] = useState<ModalType>(undefined)
    const [destination, setDestination] = useState<string | undefined>()
    console.log('search params', props.seachParams)
    const [cities, setCities] = useState<City[] | undefined>(undefined)
    const checkindefault = props.seachParams && normalizeParam(props.seachParams?.checkin) !== null ? new Date(props.seachParams.checkin) : undefined
    const checkoutdefault = props.seachParams && normalizeParam(props.seachParams?.checkout) !== null ? new Date(props.seachParams.checkout) : undefined
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(checkindefault)
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(checkoutdefault)
    const [occupancyDetails, setOccupancyDetails] = useState({
        adults: normalizeParam(props.seachParams?.adults) || 2,
        children: normalizeParam(props.seachParams?.children) || 0,
        room: normalizeParam(props.seachParams?.rooms) || 1
    })
    const {noSearch, updateNights, setOccupancy} = props
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
        return () => {
            document.removeEventListener('mousedown', checkOutsideClick);
        };
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
        if (checkInDate && checkOutDate && updateNights) {
            const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
            const calculatedNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            updateNights(calculatedNights);
        }
    }, [checkInDate, checkOutDate, updateNights]);

    useEffect(() => {

        if(setOccupancy){

            setOccupancy(occupancyDetails)
        }

    }, [occupancyDetails]);

    const getDatePlaceholder = useCallback((): string => {
        const checkInString = checkInDate ? ` ${checkInDate.getDate()}.${checkInDate.getMonth()}.${checkInDate.getFullYear()} - ` : 'Checkin Date - '
        const checkoutString = checkOutDate ? `${checkOutDate.getDate()}.${checkOutDate.getMonth()}.${checkOutDate.getFullYear()}` : 'Checkout Date'
        return checkInString + checkoutString
    }, [checkInDate, checkOutDate])

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
                adults: occupancyDetails.adults,
                children: occupancyDetails.children,
                rooms: occupancyDetails.room
            }).toString(),
        });
    };

return(
    <>
    <div ref={modalRefDest}>
        <input autoComplete="off"
               className="search-box-input"
               type="text"
               name="destination"
               style={{display: noSearch ? 'none' : undefined}}
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
    <button className="search-btn btn" onClick={() => handleSearch()}  style={{display: noSearch ? 'none' : undefined}}>
        Search
    </button>
        </>)
}
export default HotelSearch;
import {useState} from "react";
import HotelSearch from "./HotelSearch.tsx";
import FlightSerach from "./FlightSerach.tsx";


const SearchPanel = () => {
    const [activeTab, setActiveTab] = useState('hotel')
    return(
        <div className="search-box-wrapper">
            <div className="header">Find your next destination</div>
            <div className="search-tab">
                <button
                    onClick={() => setActiveTab('hotel')}
                    className="tab">
                    Hotels
                </button>
                <button
                    onClick={() => setActiveTab('flight')}
                    className="tab">
                    Flights
                </button>
            </div>
            <div className="search-box" style={{display: activeTab == 'hotel' ? 'block flex' : 'none'}}>
                <HotelSearch />
            </div>
            <div className="search-box" style={{display: activeTab == 'flight' ? 'block flex' : 'none'}}>
                <FlightSerach/>
            </div>
        </div>
    )
}

export default SearchPanel
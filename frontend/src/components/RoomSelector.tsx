
const RoomSelector = ({props}) => {
    const {occupancyDetails, setOccupancyDetails, isHotel = true} = props
    return(
        <div className="occupancy-wrapper">
            <div className="row">
                <div className="column">Adults</div>
                <div className="counter-column">
                    <button
                        disabled={occupancyDetails.adults == 0}
                        onClick={() => setOccupancyDetails({...occupancyDetails, adults: occupancyDetails.adults-1})}>
                        −
                    </button>
                    <span>{occupancyDetails.adults}</span>
                    <button
                        onClick={() => setOccupancyDetails({...occupancyDetails, adults: occupancyDetails.adults+1})}>
                        +
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="column">Children</div>
                <div className="counter-column">
                    <button
                        disabled={occupancyDetails.children == 0}
                        onClick={() => setOccupancyDetails({...occupancyDetails, children: occupancyDetails.children-1})}>
                        −
                    </button>
                    <span>{occupancyDetails.children}</span>
                    <button onClick={() => setOccupancyDetails({...occupancyDetails, children: occupancyDetails.children+1})}>
                        +
                    </button>
                </div>
            </div>
            <div className="row" style={{display: isHotel ? 'block' : 'none'}}>
                <div className="column">Rooms</div>
                <div className="counter-column">
                    <button
                        disabled={occupancyDetails.room == 0}
                        onClick={() => setOccupancyDetails({...occupancyDetails, room: occupancyDetails.room-1})}>
                        −
                    </button>
                    <span>{occupancyDetails.room}</span>
                    <button onClick={() => setOccupancyDetails({...occupancyDetails, room: occupancyDetails.room+1})}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoomSelector;
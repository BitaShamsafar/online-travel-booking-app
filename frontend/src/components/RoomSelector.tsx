import {useEffect} from "react";

const RoomSelector = ({props}) => {
    const {occupancyDetails, setOccupancyDetails, isHotel = true} = props
    const { adults, children, room } = occupancyDetails
    useEffect(() => {
        if(adults > 3 || children > 2){
            setOccupancyDetails({...occupancyDetails, room: Math.ceil(adults/2)})
        }
        if(adults < 3){
            setOccupancyDetails({...occupancyDetails, room: 1})
        }
    }, [adults, children]);
    return(
        <div className="occupancy-wrapper">
            <div className="row">
                <div className="column">Adults</div>
                <div className="counter-column">
                    <button
                        disabled={adults == 0}
                        onClick={() => setOccupancyDetails({...occupancyDetails, adults: adults-1})}>
                        −
                    </button>
                    <span>{adults}</span>
                    <button
                        onClick={() => setOccupancyDetails({...occupancyDetails, adults: adults+1})}>
                        +
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="column">Children</div>
                <div className="counter-column">
                    <button
                        disabled={children == 0}
                        onClick={() => setOccupancyDetails({...occupancyDetails, children: children-1})}>
                        −
                    </button>
                    <span>{children}</span>
                    <button onClick={() => setOccupancyDetails({...occupancyDetails, children: children+1})}>
                        +
                    </button>
                </div>
            </div>
            <div className="row" style={{display: isHotel ? undefined : 'none'}}>
                <div className="column">Rooms</div>
                <div className="counter-column">
                    <button
                        disabled={room == 0}
                        onClick={() => setOccupancyDetails({...occupancyDetails, room: room-1})}>
                        −
                    </button>
                    <span>{room}</span>
                    <button onClick={() => setOccupancyDetails({...occupancyDetails, room: room+1})}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoomSelector;
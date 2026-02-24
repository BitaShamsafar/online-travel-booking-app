import {Link} from "react-router-dom";

const TopMenu = () => {
    return(
        <div className="navbar-links">
            <Link to={'/'} >Home</Link>
            <Link to={'/hotels'} >Hotels</Link>
            <Link to={'/flights'} >Flights</Link>
            <Link to={'/tours'} >Tours</Link>
            <Link to={'/bookings'} >Your bookings</Link>

        </div>
    )
}

export default TopMenu;
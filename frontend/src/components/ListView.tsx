import CardView from "./CardView.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
const ListView = ({header, data}: {
    header: string,
    data: any[]
}) => {

    return(
        <div className="list-wrapper">
            <h2>{header}</h2>
            <div className="listView">
                {data ? data.map(item => <CardView key={item.id} item={item} />) : <div>loading....</div>}
            </div>
            <Link style={{margin:"auto"}} to={header.includes('Hotel') ? '/hotels' : '/tours'} >
            <button className="btn">View More <FontAwesomeIcon icon={faAngleDoubleRight} /></button></Link>
        </div>

    )
}

export default ListView;
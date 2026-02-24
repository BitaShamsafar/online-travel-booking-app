import {type ReactElement, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faStar} from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';

const CardView = ({item}) => {

    const numRef = useRef<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string>()
    useEffect(() => {

        numRef.current = Math.ceil(Math.random() * 10);
        const imageUrl = item.name?.includes('Hotel') ? 'hotel'+ numRef.current : 'tour'+ numRef.current
        setImageUrl(imageUrl)
    }, [item.id, item.name]);
    const getStars = () => {
        const isHalf = item.rating % 1 == 0.5
        const rounded = isHalf ? item.rating - 0.5 : Math.round(item.rating)
        let starsDesign: ReactElement[] = []
        let i = 0
        while(i<rounded){
            starsDesign = [...starsDesign, <FontAwesomeIcon key={i} color="#FDCC0D" icon={faStar}/>]
            i++
        }
        if(isHalf){
            const halfDesign = <span className="half-star"><FontAwesomeIcon className="half-star-active" key={item.name} color="#FDCC0D" icon={faStarHalf}/><FontAwesomeIcon className="half-star-inactive" key={item.name+1} color="#BEBEBE" icon={faStar}/></span>
            starsDesign = [...starsDesign, halfDesign]
        }
        let restStarsNum = isHalf ? rounded + 1 : rounded
        while(restStarsNum < 5){
            starsDesign = [...starsDesign, <FontAwesomeIcon key={restStarsNum} color="#BEBEBE" icon={faStar}/>]
            restStarsNum++
        }
        return starsDesign

    }
    return(
            <div className="card-wrapper">
                <Link to={'/hotel/'+item.id}>
                    {numRef.current ? <img alt="pic" src={`/images/${imageUrl}.jpg`}/> : 'Loading...'}
                <div className="details">
                    <h3>{item.name}</h3>
                    <div className="location">{item.location}</div>
                    <div className="rating">

                        {getStars().map(star => star)}
                        <span className="info"> {item.rating}</span>
                    </div>
                    <div className="price">$ {item.pricePerNight || item.price } <span className="info">{item.price ? "All inclusive" :" per night"}</span></div>
                    <div className="details-btn btn"> Check availability <FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                </Link>
            </div>

    )
}
export default CardView
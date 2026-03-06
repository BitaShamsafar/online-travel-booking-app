import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';

const Filters = ({allFacilities, filters, setFilters})=> {
    const [sortBy, setSortBy] = useState("");

    const handleFilter = (filterType, value) => {
        const newVal = () => {
            if( filterType === "priceRange") {
                return value
            }
            if(filters[filterType].includes(value)) {
                return filters[filterType].filter((filterValue) => filterValue !== value)
            }
            return[...filters[filterType], value]
        }
            setFilters(prestate => ({...prestate, [filterType]: newVal() }))

    }

    if (sortBy === "price") {
        // filteredHotels.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "rating") {
        // filteredHotels.sort((a, b) => b.rating - a.rating);
    }

    return (

            <aside className="filter-panel">
                <h3>Filters</h3>

                <div className="filter-group">
                    <h4>Price</h4>
                    <label>{filters.priceRange}</label>
                    <input type="range" defaultValue={0} min={0} max={5000} onChange={(e) => handleFilter('priceRange', e.target.value)} />
                </div>

                <div className="filter-group">
                    <h4>Rating</h4>
                    <label><input type="checkbox" onChange={() => handleFilter('rating', 1)} /> 1 <FontAwesomeIcon color="#FDCC0D" icon={faStar} /></label>
                    <label><input type="checkbox" onChange={() => handleFilter('rating', 2)} /> 2 <FontAwesomeIcon color="#FDCC0D" icon={faStar} /></label>
                    <label><input type="checkbox" onChange={() => handleFilter('rating', 3)} /> 3 <FontAwesomeIcon color="#FDCC0D" icon={faStar} /></label>
                    <label><input type="checkbox" onChange={() => handleFilter('rating', 4)} /> 4 <FontAwesomeIcon color="#FDCC0D" icon={faStar} /></label>
                    <label><input type="checkbox" onChange={() => handleFilter('rating', 5)} /> 5 <FontAwesomeIcon color="#FDCC0D" icon={faStar} /></label>
                </div>

                <div className="filter-group">
                    <h4>Facilities</h4>
                    {allFacilities()?.map((facility) => (
                    <label key={facility}>
                        <input type="checkbox" onChange={() => handleFilter('facilities', facility)} /> {facility}
                    </label>
                    ))}
                </div>

                <div className="filter-group">
                    <h4>Sort By Price</h4>
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">None</option>
                        <option value="price">Ascending</option>
                        <option value="rating">Descending</option>
                    </select>
                </div>
                <div className="filter-group">
                    <h4>Sort By Rating</h4>
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">None</option>
                        <option value="price">Ascending</option>
                        <option value="rating">Descending</option>
                    </select>
                </div>
            </aside>

    );
}
export default Filters;
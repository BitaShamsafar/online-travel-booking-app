import {useState} from "react";

const Filters = ()=> {
    const [priceRange, setPriceRange] = useState("0 - 5000");
    const [ratings, setRatings] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const handleCheckbox = (value, state, setState) => {
        setState(
            state.includes(value)
                ? state.filter(v => v !== value)
                : [...state, value]
        );
    };


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
                    <label>{priceRange}</label>
                    <input type="range" defaultValue={0} min={0} max={5000} onChange={(e) => setPriceRange(e.target.value)} />
                </div>

                <div className="filter-group">
                    <h4>Rating</h4>
                    <label><input type="checkbox" onChange={() => handleCheckbox(3, ratings, setRatings)} /> 3+</label>
                    <label><input type="checkbox" onChange={() => handleCheckbox(4, ratings, setRatings)} /> 4+</label>
                    <label><input type="checkbox" onChange={() => handleCheckbox(5, ratings, setRatings)} /> 5</label>
                </div>

                <div className="filter-group">
                    <h4>Facilities</h4>
                    <label><input type="checkbox" onChange={() => handleCheckbox("wifi", facilities, setFacilities)} /> Wifi</label>
                    <label><input type="checkbox" onChange={() => handleCheckbox("pool", facilities, setFacilities)} /> Pool</label>
                    <label><input type="checkbox" onChange={() => handleCheckbox("gym", facilities, setFacilities)} /> Gym</label>
                    <label><input type="checkbox" onChange={() => handleCheckbox("spa", facilities, setFacilities)} /> Spa</label>
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
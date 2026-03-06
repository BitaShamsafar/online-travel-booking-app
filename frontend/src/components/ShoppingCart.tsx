import {useCallback, useContext, useState} from "react";
import {ShoppingCartContext} from "../context/ShoppingCartContext.tsx";

import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ShoppingCart = () => {
    const { cartItems, removeFromCart } = useContext(ShoppingCartContext)
    const [isOpen, setIsOpen] = useState(false)
    const getDatePlaceholder = useCallback((checkInDate, checkOutDate): string => {
        const checkInString = checkInDate ? ` ${checkInDate.getDate()}.${checkInDate.getMonth()}.${checkInDate.getFullYear()} - ` : 'Checkin Date - '
        const checkoutString = checkOutDate ? `${checkOutDate.getDate()}.${checkOutDate.getMonth()}.${checkOutDate.getFullYear()}` : 'Checkout Date'
        return checkInString + checkoutString
    }, [])
    const removeItem = (id) => {
        removeFromCart(id)
    }
    return (<>
        <button onClick={() => setIsOpen(prevState => !prevState)} className="btn">Cart {cartItems?.length == 0 ? '' : cartItems.length}</button>
        <div style={{display: isOpen ? 'block' : 'none'}} className="shoppingCartModal">
            {
                cartItems.length == 0 ?
                    <div className="empty-cart">Your cart is empty</div>
                    :
                    cartItems.map((item, index) => {
                        return <div key={index} className="cart-item">
                            <h4>{item.name}</h4>
                            <p>Total Price: {item.price}$</p>
                            {item.date && <p>Date: {getDatePlaceholder(item.checkindate, item.checkindate)}</p>}
                            {item.details.nights && <p>Nights: {item.details.nights}</p>}
                            {item.details.occupancy && <p>Occupancy: <br/>{item.details.occupancy.adults} adults, {item.details.occupancy.children} children, {item.details.occupancy.room} room</p>}
                           <div style={{textAlign:"right", cursor: 'pointer'}}> <FontAwesomeIcon color="red" onClick={() => removeItem(item.id)} className="remove-item" icon={faTrash} /></div>
                        </div>

                })

            }
            {cartItems.length>0 && <button className="book-now-btn">checkout</button>}
        </div>
    </>)
}

export default ShoppingCart;
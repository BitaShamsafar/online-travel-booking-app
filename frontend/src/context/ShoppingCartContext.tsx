import {createContext, useState} from "react";
type CartItem = {
    type: 'hotel' | 'tour',
    id: string,
    name: string,
    price: number,
    checkindate?: string,
    checkoutdate?: string,
    details: {
        nights?: number,
        occupancy?: {
            adults: number,
            children: number,
            room: number
        },
    }
}
type ShoppingCartContextType = {
    cartItems: CartItem[] | [],
    addToCart: (item: CartItem) => void,
    removeFromCart: (itemId: string) => void
}
export const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined)

const ShoppingCartProvider = (props) => {
    const [cartItems, setCartItems] = useState<CartItem[] | []>([]);

    const addToCart = (item : CartItem) => {
        setCartItems([...cartItems, item]);
    }

    const removeFromCart = (itemId: string) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    }

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {props.children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;
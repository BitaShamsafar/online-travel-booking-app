import TopMenu from "./TopMenu.tsx";
import LoginPanel from "./LoginPanel.tsx";
import ShoppingCart from "./ShoppingCart.tsx";

const Navbar = () => {

    return(
        <div className="navbar">

            <TopMenu />
            <div className="right-menu">
                <LoginPanel />
                <ShoppingCart />
            </div>

        </div>

    )

}

export default Navbar;
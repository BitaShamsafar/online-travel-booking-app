import SearchPanel from "./SearchPanel.tsx";
import ListView from "./ListView.tsx";
import useFetch from "../hooks/useFetch.tsx";
import Footer from "./Footer.tsx";

const Home = () => {
    const topHotels = useFetch('topHotels')
    const topTours = useFetch('topTours')
    return(
        <div className="home">
            <SearchPanel />
            <ListView header="Featured Hotels" data={topHotels} />
            <ListView header="Featured Tours" data={topTours} />
            <Footer />
        </div>
    )
}

export default Home
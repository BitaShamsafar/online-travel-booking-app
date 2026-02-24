import './App.css'
import UserContextProvider from "./context/UserContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./components/Home.tsx";
import "react-calendar/dist/Calendar.css";
import Hotels from "./components/Hotels.tsx";
import Tours from "./components/Tours.tsx";
import SearchResultView from "./components/SearchResultView.tsx";
import HotelDetailsView from "./components/HotelDetailsView.tsx";

function App() {

  return (
      <BrowserRouter>
          <UserContextProvider>

                  <>
                      <Navbar />
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/hotels" element={<Hotels />} />
                          <Route path="/tours" element={<Tours />} />
                          <Route path="/hotel/:hotelId" element={<HotelDetailsView />} />
                          <Route path="/search/hotels" element={<SearchResultView />} />
                          {/*<Route path="/user/:userId" />*/}
                      </Routes>
                  </>

          </UserContextProvider>
      </BrowserRouter>




  )
}

export default App

import './App.css'
import UserContextProvider from "./context/UserContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./components/Home.tsx";
import "react-calendar/dist/Calendar.css";
import Hotels from "./components/Hotels.tsx";
import Tours from "./components/Tours.tsx";
import SearchResult from "./components/SearchResult.tsx";

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
                          <Route path="/search/hotels" element={<SearchResult />} />
                          {/*<Route path="/user/:userId" />*/}
                      </Routes>
                  </>

          </UserContextProvider>
      </BrowserRouter>




  )
}

export default App

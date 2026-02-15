import './App.css'
import UserContextProvider from "./context/UserContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./components/Home.tsx";

function App() {

  return (
      <BrowserRouter>
          <UserContextProvider>
              <>
                  <Navbar />
                  <Routes>
                      <Route path="/" element={<Home />} />
                  </Routes>
              </>
          </UserContextProvider>
      </BrowserRouter>




  )
}

export default App

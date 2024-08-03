import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Components/Home"
import Calculate from './Components/Calculate';
import Contact from './Components/Contact';



function App() {





  return (
    <>

      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={
            <>
              <Home />
            </>
          } />

          <Route exact path="/calculate" element={
            <>
              <Calculate />
            </>
          } />

          <Route exact path="/contact" element={
            <>
              <Contact />
            </>
          } />



        </Routes>
      </Router>
    </>
  );
}

export default App;

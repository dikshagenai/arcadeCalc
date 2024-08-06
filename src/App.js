import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Updates from "./Components/Updates"
import Calculate from './Components/Calculate';
import Contact from './Components/Contact';
import Home from './Components/Home'



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


          <Route exact path="/updates" element={
            <>
              <Updates />
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

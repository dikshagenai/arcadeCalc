import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePage from './Pages/HomePage';
import UpdatesPage from './Pages/UpdatesPage';
import CalculatePage from './Pages/CalculatePage';
import ContactPage from './Pages/ContactPage';
import NotFound from './Pages/NotFound';


function App() {

  return (
    <>

      <Router>

        <Routes>
          <Route exact path="/" element={
            <>
              <HomePage />
            </>
          } />


          <Route exact path="/updates" element={
            <>
              <UpdatesPage />
            </>
          } />

          <Route exact path="/calculate" element={
            <>
              <CalculatePage />
            </>
          } />

          <Route exact path="/contact" element={
            <>
              <ContactPage />
            </>
          } />

          {/* 404 Not Found Error */}
          <Route path="*" element={
            <>
              <NotFound />
            </>
          } />



        </Routes>
      </Router>
    </>
  );
}

export default App;

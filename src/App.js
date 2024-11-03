import './App.css';
import CreateBlankCard from '../../containers/card-customization/CardCustomization';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ContactInformation from '../../pages/ContactInformation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/card-customize"
            element={<CreateBlankCard/>}
          />
          <Route  
            path="/contact-information"
            element={<ContactInformation/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

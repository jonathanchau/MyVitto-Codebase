// import './App.css';
// import CreateBlankCard from './pages/Card-Customization/Card-Customization/CardCustomization';
// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import ContactInformation from './pages/Contact-Information/Contact-Information-Output/ContactInformationOutput';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/card-customize"
//             element={<CreateBlankCard/>}
//           />
//           <Route  
//             path="/contact-information"
//             element={<ContactInformation/>}
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext.js";
import PrivateRoute from "./services/PrivateRoute.js";
import HomePage from "./pages/Home/Home-Page/HomePage.js";
import LoginPage from "./pages/Login/LoginPage.js";
import RegistrationPage from "./pages/Registration/RegistrationPage.js";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard.js";
import ForgotPassword from "./pages/Forgot-Password/ForgotPassword.js";
import ContactUs from "./pages/Contact-Us/ContactUs.js";
import ResetPassword from "./pages/Reset-Password/ResetPassword.js";
import SettingsPage from "./pages/Settings/Settings/SettingsPage.js";
import GoogleWalletButton from "./pages/Dashboard/GoogleWalletButton/GoogleWalletButton.js"
import CreateBlankCard from './pages/Card-Customization/Card-Customization/CardCustomization';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="Contact-Us" element={<ContactUs />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="Sign-Up" element={<RegistrationPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="Dashboard/:user" element={<PrivateRoute />}>
              <Route exact path="" element={<Dashboard />} />
              <Route exact path="card-customize" element={<CreateBlankCard />} />
              <Route exact path="googlewalletbutton" element={<GoogleWalletButton />} />
              <Route exact path="settings" element={<SettingsPage />} />
            </Route>
            {/* <Route path="*" element={NotFound} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

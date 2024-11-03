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

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "../../services/AuthContext.js"
// import PrivateRoute from "../../services/PrivateRoute.js";
// import HomePage from "../../containers/home-page/HomePage.js";
// import LoginPage from "../../containers/login-page/LoginPage.js";
// import RegistrationPage from "../../containers/registration-page/RegistrationPage.js";
// import Dashboard from "../../containers/dashboard-page/Dashboard.js";
// import ForgotPassword from "../../containers/forgot-password-page/ForgotPassword.js";
// import ContactUs from "../../containers/contact-us-page/ContactUs.js";
// import ResetPassword from "../../containers/reset-password-page/ResetPassword.js";
// import SettingsPage from "../../containers/settings-page/SettingsPage.js";


// function App() {
//   return (
//     <div className="App">
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/" element={<HomePage />} />
//             <Route path="Contact-Us" element={<ContactUs />} />
//             <Route path="Login" element={<LoginPage />} />
//             <Route path="Sign-Up" element={<RegistrationPage />} />
//             <Route path="forgot-password" element={<ForgotPassword />} />
//             <Route path="reset-password" element={<ResetPassword />} />
//             <Route path="Dashboard/:user" element={<PrivateRoute />}>
//               <Route exact path="" element={<Dashboard />} />
//               <Route exact path="settings" element={<SettingsPage />} />
//             </Route>
//             <Route path="*" element={NotFound} />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </div>
//   );
// }

export default App;

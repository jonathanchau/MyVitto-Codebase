import { createContext, useContext, useState } from 'react';
import Axios from "axios";

const AuthContext = createContext(); /* */

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginStatus, setLoginStatus] = useState(""); // used to show if wrong login credentials
  const [user, setUser] = useState(""); // used to pass username info to the dashboard
  const [usernameRequirement, setUsernameRequirement] = useState("");
  const [emailRequirement, setEmailRequirement] = useState("");
  const [passwordRequirement, setpasswordRequirement] = useState("");
  const [confirmPasswordRequirement, setConfirmPasswordRequirement] = useState("");

  Axios.defaults.withCredentials = true;

  // posts username/email and password from the fields to the backend
  const login = async (usernameOrEmail, password, rememberMe) => {
    const response = await Axios.post("http://localhost:3001/login", {
      usernameOrEmail: usernameOrEmail,
      password: password,
      rememberMe: rememberMe
    })

    if (response.data.message) { // fail
      console.log(response.data.message);
      setLoginStatus(response.data.message);
    } else { // success
      // console.log(response.data)
      setLoginStatus(response.data[0]); // information of the user
      setAuthenticated(true); // authenticates the user
      setUser(response.data[0].username); // used in redirect
    }
  }

  // cookie that allows a person to login if they have already logged in 
  const rememberLogin = async () => {
    const response = await Axios.get("http://localhost:3001/login")
    console.log(response)
    
    if (response.data.loggedIn === true) {
      setAuthenticated(true);
      setLoginStatus(response.data.userInfo.username);
      setUser(response.data.userInfo.username); // used in redirect
    }
  }

  // posts the username, password, and email to the backend
  const register = async (emailReg, usernameReg, passwordReg, confirmPasswordReg) => {
    if (passwordReg === confirmPasswordReg) {
      const response = await Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
        email: emailReg
      })
      
      setEmailRequirement(response.data.invalidEmail); // changes state of requirements if it's invalid
      setUsernameRequirement(response.data.invalidUserName);
      setpasswordRequirement(response.data.invalidPassword);
      if (response.data.username) { // success
        setUser(response.data.username)
        setAuthenticated(true);
      }
        
    } else {
      setConfirmPasswordRequirement("Password fields do not match");
    }
  }

  // login/signup with google
  const googleAuthentication = () => {
    window.location.href = 'http://localhost:3001/authenticateWithGoogle'; // force open the endpoint
  }

  // logout (duh)
  const logout = async () => {
    // Perform logout logic
    const response = await Axios.get("http://localhost:3001/logout")

    if (response.data.logout) {
      setAuthenticated(false);
      window.location.href = 'http://localhost:3000/'; // redirect to home after logout
    }
  };

  return (
    <AuthContext.Provider value={{
      authenticated, user, loginStatus, usernameRequirement, emailRequirement, passwordRequirement, confirmPasswordRequirement,
      login, logout, rememberLogin, register, googleAuthentication
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

import React from 'react';
import './RegistrationPage.css';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react'
import Axios from "axios";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext.js';
import Vitto_Logo from "../../assets/Home-Pages/Vitto_Logo.png"

const RegistrationPage = () => {
    // const [user, setUser] = useState("");
    // const [authenticated, setAuthenticated] = useState(false);
    const [emailReg, setEmailReg] = useState("");
    // const [emailRequirement, setEmailRequirement] = useState("");
    const [usernameReg, setUserNameReg] = useState("");
    // const [usernameRequirement, setUsernameRequirement] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    // const [passwordRequirement, setpasswordRequirement] = useState("");
    const [confirmPasswordReg, setConfirmPasswordReg] = useState("");

    Axios.defaults.withCredentials = true;

    const { authenticated, user, register, rememberLogin, usernameRequirement, emailRequirement, passwordRequirement, confirmPasswordRequirement, googleAuthentication } = useAuth();

    const handleRegister = () => {
        register(emailReg, usernameReg, passwordReg, confirmPasswordReg);
    }

    const handleGoogleLogin = () => {
        googleAuthentication();
    }

    useEffect(() => {
        rememberLogin();
    }, [rememberLogin])

    if (authenticated) {
        return <Navigate to={`/Dashboard/${user}`} />
    }

    return (
        <div className="registrationContainer">

            <div className="sign-up-top-nav">
                {/* <a href="/">
                    <p className="backText">&lt; BACK</p>
                </a> */}
                <a href="/" className="backText">← BACK</a>
                <a href="/login">
                    <p className="loginText">Login</p>
                </a>
            </div>

            <img src={Vitto_Logo} alt="Logo" />

            <div className="registrationCover">

                <head>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
                    </style>
                </head>

                <h1>Create an Account</h1>

                <div className="emailText">
                    <h4>Email</h4>
                </div>
                {/* email input field */}
                <input type="email" placeholder="myvittocard@gmail.com" onChange={(e) => { setEmailReg(e.target.value.trim()) }} />

                <div className="emailError">
                    <p>{emailRequirement}</p>
                </div>

                <div className="usernameText">
                    <h4>Username</h4>
                </div>
                {/* username input field */}
                <input type="username" placeholder="myvittocard145" onChange={(e) => { setUserNameReg(e.target.value.trim()) }} />

                <div className="usernameError">
                    <p>{usernameRequirement}</p>
                </div>

                <div className="passwordText">
                    <h4>Password</h4>
                </div>

                {/* password input field */}
                <input type="password" placeholder="myvittocard1234" onChange={(e) => { setPasswordReg(e.target.value.trim()) }} />

                <div className="passwordError">
                    <p>{passwordRequirement}</p>
                </div>

                <div className="confirmPasswordText">
                    <h4>Confirm Password</h4>
                </div>
                {/* confirm password input field */}
                <input type="password" placeholder="myvittocard1234" onChange={(e) => { setConfirmPasswordReg(e.target.value.trim()) }} />
                <div className="confirmPasswordError">
                    <p>{confirmPasswordRequirement}</p>
                </div>

                {/* Sign Up button */}
                <button className="sign-up-button" onClick={handleRegister}>Register</button>

                <p className="alt-sign-up-text">Or</p>

                {/* continue with google field */}
                <div className="alt-sign-up">
                    <GoogleOAuthProvider clientId="177875372001-29cpo0hudr5mu5dv2bi7lteaeln9rss9.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                                handleGoogleLogin();
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;


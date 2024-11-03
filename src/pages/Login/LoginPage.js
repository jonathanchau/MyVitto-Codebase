import React from 'react';
import './LoginPage.css';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from "react";
import Axios from "axios";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import Vitto_Logo from "../../images/Vitto_Logo.png"

const LoginPage = () => {
    // const [user, setUser] = useState(""); // used to pass username info to the dashboard
    const [usernameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loginStatus, setLoginStatus] = useState(""); // used to show if wrong login credentials
    // const [authenticated, setAuthenticated] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { authenticated, user, loginStatus, login, rememberLogin, googleAuthentication } = useAuth();

    Axios.defaults.withCredentials = true;

    const handleLogin = () => {
        login(usernameOrEmail, password, rememberMe);
    }

    const handleGoogleLogin = () => {
        googleAuthentication();
    }

    useEffect(() => {
        rememberLogin();
    }, [rememberLogin])

    // brings user to dashboard if authenticated
    if (authenticated){
        return <Navigate to={`/Dashboard/${user}`} />
    }

    return (
        <div className="loginContainer">

            <div className="login-top-nav">
                {/* <a href="/">
                    <p className="backText">&lt; BACK</p>
                </a> */}
                <a href="/" className="backText">← BACK</a>
                <a href="/sign-up">
                    <p className="signUpText">Create Account </p>
                </a>
            </div>

            <img src={Vitto_Logo} alt="Logo" />

            <div className="loginCover">

                <head>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
                    </style>
                </head>

                <h1>Log In</h1>

                <div className="nameemail">
                    <h4>Username or Email</h4>
                </div>

                {/* username/email input field */}
                <input type="text" placeholder="myvittocard@gmail.com" onChange={(e) => { setUserNameOrEmail(e.target.value.trim()) }} />
                <div className="password">
                    <h4>Password</h4>
                </div>

                {/* password input field */}
                <input type="password" placeholder="myvittocard1234" onChange={(e) => { setPassword(e.target.value.trim()) }} />

                {/* login button */}
                <button className="login-button" onClick = { handleLogin }>
                    Login
                </button>

                <div className="forgotpassword">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>

                {/* checkbox for remember me */}

                <div className="remember-me">
                    <input type="checkbox" name="remember-me" onChange={() => {setRememberMe(!rememberMe)}}/>
                    <h4 style={{ fontSize: 15, whiteSpace: "nowrap" }}>Remember Me</h4>
                </div>

                <p className="status">{ loginStatus }</p>

                <div className="alt-login-text">
                    Or
                </div>

                {/* continue with google field */}
                <div className="alt-login">
                    <div className="google">
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
        </div>
    )
}

export default LoginPage;

import React from 'react';
import './ForgotPassword.css';
import { useState } from "react";
import Axios from "axios";
import Vitto_Logo from "../../images/Vitto_Logo.png"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [verificationStatus, setVerificationStatus] = useState("");
    const [sentVerification, setSentVerification] = useState(false);

    const sendVerification = async () => {
        const response = await Axios.post("http://localhost:3001/forgot-password", {
            email: email
        })

        if (response.data.message) { // fail
            setVerificationStatus("Email does not exist");
            console.log(response.data);
        } else { // success
            setVerificationStatus("");
            setSentVerification(true);
            console.log(response.data);
        }
    }

    return (
        <div className="forgotContainer">

            <div className="forgot-top-nav">
                <a href="/login" className="backText">← BACK</a>
            </div>

            <img src={Vitto_Logo} alt="Logo" />

            <div className="forgotCover">
                <h1>Forgot Password</h1>

                <div className={sentVerification ? "forgot-password-hide" : "forgot-password-initial"}>
                    <div className="forgot-email-text">
                        <p>Enter your Email</p>
                    </div>

                    <input type="forgot-email" placeholder="ex. myemail@gmail.com" onChange={(e) => { setEmail(e.target.value) }} />

                    <button className="verification-button" onClick={ sendVerification }>
                        Verify
                    </button>

                    <div className="forgot-status">
                        <p>{verificationStatus}</p>
                    </div>
                </div>

                {}
                <div className={sentVerification ? "forgot-password-final" : "forgot-password-hide"}>
                    <div className="reset-password-text">
                        <p>The link to reset your password has been sent to your email</p>
                    </div>

                    <div className="resend-forgot-password-link">
                        <p>If you did not get a link</p>
                    </div>

                    <button className="resend-forgot-password-button"onClick={ sendVerification }>Resend Email</button>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword;

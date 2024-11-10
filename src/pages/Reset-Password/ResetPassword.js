import './ResetPassword.css';
import { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Vitto_Logo from "../../assets/Home-Pages/Vitto_Logo.png"

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationStatus, setVerificationStatus] = useState("");
    const [sentVerification, setSentVerification] = useState(false)
    const [shouldRenderPage, setShouldRenderPage] = useState(true);
    const emailParam = useRef();
    const tokenParam = useRef();
    const navigate = useNavigate();

    // gets token and email data from URL
    useEffect(() => {
        // Function to parse email and token from the URL
        const getUrlParams = () => {
            const params = new URLSearchParams(window.location.search);
            const emailURL = params.get('email');
            const tokenURL = params.get('token');
            emailParam.current = emailURL;
            tokenParam.current = tokenURL;
        };

        getUrlParams();

        // GET request to redirect user if token does not exist
        const fetchData = async () => {
            const response = await Axios.get("http://localhost:3001/reset-password", {
                params: {
                    email: emailParam.current,
                    token: tokenParam.current
                }
            })

            if (response.data.info.length === 0) { // length will be 0 if no results
                setShouldRenderPage(false);
                setTimeout(() => { // redirects user to login after 5 seconds
                    navigate('/login');
                }, 5000);
            }
        }

        fetchData();
    }, [navigate]);

    /**
     * requests a POST request to update the password of the user
     */
    const updatePassword = async () => {
        const response = await Axios.post("http://localhost:3001/reset-password", { password1: newPassword, password2: confirmPassword }, { params: { email: emailParam.current, token: tokenParam.current } })
            
        if (response.data.message) { // fail
            setVerificationStatus(response.data.message);
            console.log(response.data);
        } else { // success
            setVerificationStatus("");
            setSentVerification(true);
            console.log(response.data);
        }
    }

    if (shouldRenderPage) { // renders page if token isn't expired or used
        return (
            <div className="resetPasswordContainer">

                <img src={Vitto_Logo} alt="Logo" />

                <div className="resetPasswordCover">

                    <h1>Reset Password</h1>

                    <div className={sentVerification ? "reset-password-hide" : "reset-password-initial"}>

                        <p className="reset-password-text1"> Password </p>
                        <input type="reset-password-input1" placeholder="ex. P@ssword1" onChange={(e) => { setNewPassword(e.target.value.trim()) }} />

                        <p className="reset-password-text2"> Confirm Password </p>
                        <input type="reset-password-input2" placeholder="ex. P@ssword1" onChange={(e) => { setConfirmPassword(e.target.value.trim()) }} />

                        <button className="reset-password-button" onClick={updatePassword}>
                            Update
                        </button>

                        <div className="reset-status">
                            <p>{verificationStatus}</p>
                        </div>

                    </div>

                    <div className={sentVerification ? "reset-password-final" : "reset-password-hide"}>

                        <p className="reset-password-text1-final"> Your password has been updated </p>
                        <a className="reset-password-text2-final" href="/login"> Log in Here </a>

                    </div>

                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>Your token has expired. Please go back to login to reset your password</p>
            </div>
        )
    }
}


export default ResetPassword


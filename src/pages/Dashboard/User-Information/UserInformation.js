import "./UserInformation.css"
import { useContext, useState } from 'react'
import Axios from "axios"
import { useAuth } from '../../services/AuthContext';

function UserInformation() {
    const [emailReg, setEmailReg] = useState("");
    const [usernameReg, setUserNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [changeStatus, setChangeStatus] = useState("");

    const { logout } = useAuth(); 

    // logout user
    const handleLogOut = () => {
        logout();
    }

    // Updates the user's information
    const changeInformation = async () => {
        const getUrlParams = () => { // gets the username from the url
            var str = window.location.href;
            return str.split("/")[4]; // username
        };

        try {
            const name = getUrlParams()
            const response = await Axios.post(`http://localhost:3001/Dashboard/${name}/settings`, {
                email: emailReg,
                username: usernameReg,
                password: passwordReg
            })

            setChangeStatus(response.data.updated | response.data.error)
            handleLogOut(); // logs out user to avoid any mishaps
            
        } catch (err){
            console.log(err)
        }
        
    }

    return (
        <div className="user-information-container">
            <h1 className="user-information-title">User Information</h1>

            <p>Email</p>
            <input type="email" placeholder="" onChange={(e) => { setEmailReg(e.target.value.trim()) }} />

            <p>Username</p>
            <input type="username" placeholder="" onChange={(e) => { setUserNameReg(e.target.value.trim()) }} />

            <p>Password</p>
            <input type="password" placeholder="" onChange={(e) => { setPasswordReg(e.target.value.trim()) }} />

            <button className="user-information-button" onClick={changeInformation}>Update</button>
            <p>{changeStatus}</p>
        </div>
    )
}

export default UserInformation
import { useState } from 'react'
import { useAuth } from '../../services/AuthContext.js';
import "./Profile.css";

function Profile(props) {
    const [showDropDownMenu, toggleDropDownMenu] = useState(false);
    const currentURL = window.location.href;

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="profile-icon-container">
            <div className="profile-icon-circle" onClick={() => { toggleDropDownMenu(!showDropDownMenu) }} style={{ backgroundColor: props.profileColor }}>
                {props.user_initials}
            </div>
            <div className="drop-down-container">
                <div className={showDropDownMenu ? "profile-icon-dropdown-show" : "profile-icon-dropdown-hide"}>
                    <a className="profile-settings" href={currentURL + '/settings'}>Settings</a>
                    <button className="log-out-button" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;

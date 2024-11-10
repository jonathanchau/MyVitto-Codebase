import React, { useEffect, useState, useRef } from "react";
import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import Axios from "axios";
import Profile from "../Profile/Profile.js";

function Dashboard() {
  const [profileColor, setProfileColor] = useState("#4285f4"); // Default color or any other fallback color
  const username = useRef("P"); // username, P is a placeholder
  const user_initials = useRef("P"); // first intial of username, P is a placeholder

  useEffect(() => {
    const getUrlParams = () => { // gets the username from the url
      var str = window.location.href;
      return str.split("/")[4]; // username
    };

    const fetchData = async () => {
      username.current = getUrlParams();
      user_initials.current = username.current[0]; // intitials of the uername
  
      try {
        const response = await Axios.get(`http://localhost:3001/Dashboard/${username.current}`, {
          params: { profileColor: profileColor }
        })
        if (response){
          setProfileColor(response.data.profile_color);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
  }, [profileColor]);

  return (
    <div className="dashboard">
      {/* Dashboard header */}
      <div className="dashboard-header">
        {/* Dashboard title */}
        <div className="dashboard-title">
          {/* Top left text with border */}
          <div className="dashboard-title-border">Dashboard</div>
        </div>
        {/* Profile icon container */}
        {/* <div className="profile-icon-container"> */}
          {/* Profile icon */}
          {/* <div className="profile-icon-circle" style={{ backgroundColor: profileColor }}>
            {user_initials.current}
          </div> */}
        <Profile profileColor={profileColor} user_initials={user_initials.current}/>
        {/* </div> */}
        {/* Divider line */}
        <hr className="dashboard-divider" />
      </div>
      {/* The content that goes here inside the dashboard*/}
      <div className="dashboard-content">
        {/* Content title */}
        <div className="content-title">My Cards</div>
        {/* Create New Card button */}
        <button className="plus-button">+</button>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;

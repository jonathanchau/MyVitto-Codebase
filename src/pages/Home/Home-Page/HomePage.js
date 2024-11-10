import React from 'react';
import './HomePage.css';
import Navbar from "../Nav-Bar/Navbar.js";
import Text from "../../../assets/Home-Pages/Text.png";
import JellyFishImagePage1 from "../../../assets/Home-Pages/JellyFishImagePage1.png";
import Vittotext2 from "../../../assets/Home-Pages/Vittotext2.png";
import VittoSplashBackground2 from "../../../assets/Home-Pages/VittoSplashBackground2.png";
import SoHowDoesVittoWork from "../../../assets/Home-Pages/SoHowDoesVittoWork.png";
import Bubble1 from "../../../assets/Home-Pages/Bubble1.png";
import Bubble2 from "../../../assets/Home-Pages/Bubble2.png";
import Bubble3 from "../../../assets/Home-Pages/Bubble3.png";
import Bubble4 from "../../../assets/Home-Pages/Bubble4.png";

// import img1 from './images/JellyFishImagePage1.png'


function HomePage() {
  return (
    <div>
      <Navbar />
      {/* Top Part */}
      <div className="section1">
        <div className="gridContainer">
          <div className="topLeftText">
            <img src={Text} alt="" className="textStyle" /> {/* Networking Simplified with Vitto */}
            <button className="buttonStyle">Get Started</button>
          </div>
          <div className="topJellyFish">
            <img src={JellyFishImagePage1} alt="" className="image1Style" />
          </div>
          <div className="bottomRightText">
            <img src={Vittotext2} alt="" className="textStyle2" />
          </div>
        </div>
        {/* <div className="getStartedButton">
        </div> */}
        <div className="splashImage">
          <img src={VittoSplashBackground2} alt="" className="image2Style" />
        </div>
      </div>
      
      <div className="section1-transition"></div>

      {/* Middle Part */}
      <div className="section2">
        <img src={SoHowDoesVittoWork} alt="" className="textStyleSection2" />

        <div className="bubbleContainer">
          <img src={Bubble1} alt="" className="bubbleStyle" />
          <img src={Bubble2} alt="" className="bubbleStyle" />
          <img src={Bubble3} alt="" className="bubbleStyle" />
          <img src={Bubble4} alt="" className="bubbleStyle" />
        </div>
      </div>

      <div className="section2-transition"></div>

      {/* Bottom Part */}
      <div className="section3">
      
      </div>

    </div>
  );
}

export default HomePage;

import CreateTextboxButton from '../Textbox/Create-Textbox-Button/CreateTextboxButton.js';
import CreateImageButton from '../Image/Create-Image-Button/CreateImageButton.js';
import BackgroundButton from '../Background/Background-Button/BackgroundButton.js';
import GoogleWalletButton from '../../Dashboard/GoogleWalletButton/GoogleWalletButton.js'
import React, {useState, useRef} from 'react';
import QrButton from '../Qr-Code/Qr-Button/QrButton.js';
import './SideBar.css';

const SideBar = ({backgroundRef, backgroundImageIsActive, setBackgroundImageIsActive, setSelectedBackgroundImage,
                 setQrGeneratorIsDisplayed, qrGeneratorIsDisplayed, setCardItemsArray}) => {
                
    const [isExpanded, setIsExpanded] = useState(true);
    const sideBarRef = useRef();

    const handleClickSideBarButton = () => {
        if (isExpanded) {
            setIsExpanded(false);
        }
        else {
            setIsExpanded(true);
        }

    }

    return ( 
    <div className="side-bar-container side-bar-container--size">
        <div 
            className={isExpanded ? "side-bar expand" : "side-bar collapse"}
            useRef={sideBarRef}
        >
            <div className = "buttons">
                
                <BackgroundButton 
                    backgroundRef={backgroundRef}
                    backgroundImageIsActive={backgroundImageIsActive}
                    setBackgroundImageIsActive={setBackgroundImageIsActive}
                    setSelectedBackgroundImage={setSelectedBackgroundImage}
                />
                <CreateTextboxButton 
                    setCardItemsArray={setCardItemsArray}
                />
                <CreateImageButton 
                    setCardItemsArray={setCardItemsArray}
                />
                <QrButton 
                    setQrGeneratorIsDisplayed={setQrGeneratorIsDisplayed}
                    qrGeneratorIsDisplayed={qrGeneratorIsDisplayed}
                />
                <GoogleWalletButton />
            </div>
        </div>
        <div 
            className="side-bar-button"
            onClick={handleClickSideBarButton}
        />
      </div>
    );
}
 
export default SideBar;

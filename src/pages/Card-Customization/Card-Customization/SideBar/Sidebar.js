import CreateTextboxButton from '../textbox/create-textbox-button/CreateTextboxButton.js';
import CreateImageButton from '../image/create-image-button/CreateImageButton.js';
import BackgroundButton from '../background/background-button/BackgroundButton.js';
import React, {useState, useRef} from 'react';
import QrButton from '../qr-code/qr-button/QrButton.js';
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

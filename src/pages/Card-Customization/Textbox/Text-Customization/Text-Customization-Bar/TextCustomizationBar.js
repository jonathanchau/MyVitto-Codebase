import React, { useState } from 'react';
import './TextCustomizationBar.css';
import BoldButton from '../Bold-Button/BoldButton';
import ItalicizeButton from '../Italicize-Button/ItalicizeButton';
import FontColorButton from '../Font-Color-Button/Button/FontColorButton';
import FontStyleButton from '../Font-Style-Button/Button/FontStyleButton';
import FontSizeInput from '../Font-Size-Input/Input-Area/FontSizeInput';

const TextCustomizationBar = ({textboxRef, isHoveringOverCustomizationBar, setIsHoveringOverCustomizationBar, setDisplayCustomizationBar, isHoveringOverTextbox, 
                                fontSize, setFontSize}) => {

    const [colorOptionsAreDisplayed, setColorOptionsAreDisplayed] = useState(false);
    const [styleOptionsAreDisplayed, setStyleOptionsAreDisplayed] = useState(false);

    const handleMouseEnterCustomizationBar = () => {
        setIsHoveringOverCustomizationBar(true);
    }

    const handleMouseLeaveCustomizationBar = () => {
        setIsHoveringOverCustomizationBar(false);
    }

    const handleBlurCustomizationBar = () => {
        if (!isHoveringOverTextbox && !isHoveringOverCustomizationBar) {
            setDisplayCustomizationBar(false);
        }
    }

    return ( 
        <div 
            className='customization-container'
            tabIndex={"1"}
            onBlur={handleBlurCustomizationBar}
        >
            <div 
                className='customization-bar'
                onMouseEnter={handleMouseEnterCustomizationBar}
                onMouseLeave={handleMouseLeaveCustomizationBar}
            >
                <BoldButton
                    textboxRef={textboxRef}
                />
                <ItalicizeButton
                    textboxRef={textboxRef}
                />
                <FontColorButton
                    textboxRef={textboxRef}
                    colorOptionsAreDisplayed={colorOptionsAreDisplayed}
                    setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
                />
                <FontStyleButton
                    styleOptionsAreDisplayed={styleOptionsAreDisplayed}
                    setStyleOptionsAreDisplayed={setStyleOptionsAreDisplayed}
                    textboxRef={textboxRef}
                />
                <FontSizeInput
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    textboxRef={textboxRef}
                />
            </div>
        </div>
    );
}
 
export default TextCustomizationBar;

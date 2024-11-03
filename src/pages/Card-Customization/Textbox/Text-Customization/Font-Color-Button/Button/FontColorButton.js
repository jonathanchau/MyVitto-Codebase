import {useState} from 'react';
import './FontColorButton.css';
import FontColorOptions from './FontColorOptions/FontColorOptions';

const FontColorButton = ({textboxRef, colorOptionsAreDisplayed, setColorOptionsAreDisplayed}) => {

    const [isHoveringOverFontColorButton, setIsHoveringOverFontColorButton] = useState(null);

    //function deals with user's interaction with the font color button
    const handleClickFontColorButton = () => {

        if (!colorOptionsAreDisplayed) {
            setColorOptionsAreDisplayed(true);
        }
        else {
            setColorOptionsAreDisplayed(false);
        }
    }

    //function indicates that the cursor is hovering over the font color button
    const handleMouseEnterFontColorButton = () => {
        setIsHoveringOverFontColorButton(true);
    }
    
    //function indicates that the cursor is not hovering over the font color button
    const handleMouseLeaveFontColorButton = () => { 
        setIsHoveringOverFontColorButton(false);
    }

    return (  
        <div className="font-color-button-container">
            <button 
                className="font-color-button"
                onClick={handleClickFontColorButton}
                onMouseEnter={handleMouseEnterFontColorButton}
                onMouseLeave={handleMouseLeaveFontColorButton}
            >
                A
            </button>
            {colorOptionsAreDisplayed && (
                <FontColorOptions 
                    textboxRef={textboxRef}
                    setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
                    isHoveringOverFontColorButton={isHoveringOverFontColorButton}
                />
            )}
        </div>
    );
}
 
export default FontColorButton;
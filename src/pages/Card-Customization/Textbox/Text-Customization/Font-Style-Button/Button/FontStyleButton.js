import {useState, useEffect} from "react";
import FontStyleOptions from "./FontStyleOptions/FontStyleOptions";
import './FontStyleButton.css';

const FontStyleButton = ({styleOptionsAreDisplayed, setStyleOptionsAreDisplayed, textboxRef}) => {

    const [fontStyleName, setFontStyleName] = useState("");
    const [isHoveringOverFontStyleButton, setIsHoveringOverFontStyleButton] = useState(null);

    useEffect(() => {
        const fontFamilyName = textboxRef.current.style.fontFamily;
        setFontStyleName(fontFamilyName.replace(/[\\\"]/g, ""));
    }, [textboxRef])

    //function deals with user's interaction with the font style button
    const handleClickFontStyleButton = () => {

        if (!styleOptionsAreDisplayed) {
            setStyleOptionsAreDisplayed(true);
        }
        else {
            setStyleOptionsAreDisplayed(false);
        }
    }

    //function indicates that the cursor is hovering over the font color button
    const handleMouseEnterFontStyleButton = () => {
        setIsHoveringOverFontStyleButton(true);
    }
    
    //function indicates that the cursor is not hovering over the font color button
    const handleMouseLeaveFontStyleButton = () => { 
        setIsHoveringOverFontStyleButton(false);
    }

    return (  
        <div className="font-style-button-container">
            <button 
                className="font-style-button"
                onClick={handleClickFontStyleButton}
                onMouseEnter={handleMouseEnterFontStyleButton}
                onMouseLeave={handleMouseLeaveFontStyleButton}
            >
                {fontStyleName}
            </button>
            {styleOptionsAreDisplayed && (
                <FontStyleOptions 
                    textboxRef={textboxRef} 
                    setStyleOptionsAreDisplayed={setStyleOptionsAreDisplayed}
                    setFontStyleName={setFontStyleName}
                    isHoveringOverFontStyleButton={isHoveringOverFontStyleButton}
                />    
            )}
        </div>
    );
}
 
export default FontStyleButton;
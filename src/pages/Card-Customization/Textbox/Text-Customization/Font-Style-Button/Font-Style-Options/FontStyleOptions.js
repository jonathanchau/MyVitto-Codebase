import OneFontStyleOption from "../One-Font-Style-Option/OneFontStyleOption";
import './FontStyleOptions.css';
import {useState, useEffect} from "react";

const FontStyleOptions = ({textboxRef, setStyleOptionsAreDisplayed, setFontStyleName, isHoveringOverFontStyleButton}) => {

    const [isHoveringOverStyleOptions, setIsHoveringOverStyleOptions] = useState(null);

    const handleMouseEnterStyleOptions = () => {
        setIsHoveringOverStyleOptions(true);
    }

    const handleMouseLeaveStyleOptions = () => {
        setIsHoveringOverStyleOptions(false);
    }

    useEffect(() => {
        const handleClick = () => {
            if (!isHoveringOverStyleOptions && !isHoveringOverFontStyleButton) {
                setStyleOptionsAreDisplayed(false);
            }
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        }

    }, [isHoveringOverStyleOptions, isHoveringOverFontStyleButton])
    return ( 
        <div 
            className="font-style-options-container"
            onMouseEnter={handleMouseEnterStyleOptions}
            onMouseLeave={handleMouseLeaveStyleOptions}
        >
            <OneFontStyleOption 
                textboxRef={textboxRef}
                fontStyle={'Times New Roman'}
                top={'0px'}
                bottomBorderColor={'1px solid #ddd'}
                setStyleOptionsAreDisplayed={setStyleOptionsAreDisplayed}
                setFontStyleName={setFontStyleName}
            />
            <OneFontStyleOption 
                textboxRef={textboxRef}
                fontStyle={'Arial'}
                top={'30px'}
                bottomBorderColor={'1px solid #ddd'}
                setStyleOptionsAreDisplayed={setStyleOptionsAreDisplayed}
                setFontStyleName={setFontStyleName}
            />
            <OneFontStyleOption 
                textboxRef={textboxRef}
                fontStyle={'Georgia'}
                top={'60px'}
                bottomBorderColor={'1px solid #ddd'}
                setStyleOptionsAreDisplayed={setStyleOptionsAreDisplayed}
                setFontStyleName={setFontStyleName}
            />
            <OneFontStyleOption 
                textboxRef={textboxRef}
                fontStyle={'Lora'}
                top={'90px'}
                setStyleOptionsAreDisplayed={setStyleOptionsAreDisplayed}
                setFontStyleName={setFontStyleName}
            />
        </div>
    );
}
 
export default FontStyleOptions;

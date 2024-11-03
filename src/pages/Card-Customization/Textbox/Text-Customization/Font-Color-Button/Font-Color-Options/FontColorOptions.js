import OneFontColorOption from "./OneFontColorOption/OneFontColorOption";
import './FontColorOptions.css';
import {useEffect, useState} from "react";

const FontColorOptions = ({textboxRef, setColorOptionsAreDisplayed, isHoveringOverFontColorButton}) => {

    const [isHoveringOverColorOptions, setIsHoveringOverColorOptions] = useState(null);

    const handleMouseEnterColorOptions = () => {
        setIsHoveringOverColorOptions(true);
    }

    const handleMouseLeaveColorOptions = () => {
        setIsHoveringOverColorOptions(false);
    }

    useEffect(() => {
        const handleClick = () => {
            if (!isHoveringOverColorOptions && !isHoveringOverFontColorButton) {
                setColorOptionsAreDisplayed(false);
            }
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        }

    }, [isHoveringOverColorOptions, isHoveringOverFontColorButton])

    return ( 
        <div className="color-options-container"
            onMouseEnter={handleMouseEnterColorOptions}
            onMouseLeave={handleMouseLeaveColorOptions}
        >
            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'brown'}
                left={'0px'}
                top={'0px'}
                topLeftBorderRadius={'8px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'red'}
                left={'30px'}
                top={'0px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'orange'}
                left={'60px'}
                top={'0px'}
                topRightBorderRadius={'8px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'yellow'}
                left={'0px'}
                top={'30px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'lightgreen'}
                left={'30px'}
                top={'30px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'green'}
                left={'60px'}
                top={'30px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'lightblue'}
                left={'0px'}
                top={'60px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'blue'}
                left={'30px'}
                top={'60px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'purple'}
                left={'60px'}
                top={'60px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'pink'}
                left={'0px'}
                top={'90px'}
                bottomLeftBorderRadius={'8px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'black'}
                left={'30px'}
                top={'90px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <OneFontColorOption 
                textboxRef={textboxRef}
                fontColor={'white'}
                left={'60px'}
                top={'90px'}
                bottomRightBorderRadius={'8px'}
                setColorOptionsAreDisplayed={setColorOptionsAreDisplayed}
            />

            <div className="bottom-arrow"/>

        </div>
     );
}
 
export default FontColorOptions;

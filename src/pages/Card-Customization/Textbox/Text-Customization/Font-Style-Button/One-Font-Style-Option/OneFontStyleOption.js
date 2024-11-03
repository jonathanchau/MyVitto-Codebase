import './OneFontStyleOption.css';

const OneFontStyleOption = ({textboxRef, fontStyle, top, bottomBorderColor, setStyleOptionsAreDisplayed, setFontStyleName}) => {

    const handleChangeFontStyle = () => {
        textboxRef.current.style.fontFamily = fontStyle;
        setFontStyleName(fontStyle);
        setStyleOptionsAreDisplayed(false);
    }
    return ( 
        <div 
            className="font-style-option"
            onClick={handleChangeFontStyle}
            style={{
                top: top,
                fontFamily: fontStyle,
                borderBottom: bottomBorderColor
            }}
        >
            {fontStyle}
        </div>
    );
}
 
export default OneFontStyleOption;

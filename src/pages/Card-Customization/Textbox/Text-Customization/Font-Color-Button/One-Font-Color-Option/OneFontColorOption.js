import './OneFontColorOption.css';

const OneFontColorOption = ({textboxRef, fontColor, left, top, topLeftBorderRadius, topRightBorderRadius, bottomLeftBorderRadius, bottomRightBorderRadius, setColorOptionsAreDisplayed}) => {

    const handleChangeFontColor = () => {
        textboxRef.current.style.color = fontColor;
        setColorOptionsAreDisplayed(false);
    }

    return ( 
        <div 
            className="color-option"
            onClick={handleChangeFontColor}
            style={{
                backgroundColor: fontColor,
                left: left,
                top: top,
                borderTopLeftRadius: topLeftBorderRadius,
                borderTopRightRadius: topRightBorderRadius,
                borderBottomLeftRadius: bottomLeftBorderRadius,
                borderBottomRightRadius: bottomRightBorderRadius
            }}
        >

        </div>
    );
}
 
export default OneFontColorOption;

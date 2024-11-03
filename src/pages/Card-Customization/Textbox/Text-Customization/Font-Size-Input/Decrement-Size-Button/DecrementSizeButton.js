import './DecrementSizeButton.css';

const DecrementSizeButton = ({textboxRef, fontSize, setFontSize}) => {

    const handleClickDecrementSize = () => {
        if (fontSize > 0) {
            textboxRef.current.style.fontSize = `${fontSize - 1}px`;
            setFontSize(fontSize - 1);
        }
    }

    return (  
        <div className="decrement-button-container">
            <button 
                className="decrement-button"
                onClick={handleClickDecrementSize}
            >
                -
            </button>
        </div>
    );
}
 
export default DecrementSizeButton;
import './IncrementSizeButton.css';

const IncrementSizeButton = ({textboxRef, fontSize, setFontSize}) => {

    const handleClickIncrementSize = () => {
        textboxRef.current.style.fontSize = `${fontSize + 1}px`;
        setFontSize(fontSize + 1);
    }

    return (  
        <div className="increment-button-container">
            <button 
                className="increment-button"
                onClick={handleClickIncrementSize}
            >
                +
            </button>
        </div>
    );
}
 
export default IncrementSizeButton;
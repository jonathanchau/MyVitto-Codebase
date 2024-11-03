import './DoneButton.css';

const DoneButton = ({setQrCodeIsOnScreen}) => {

    const handleClickDoneButton = () => {
        setQrCodeIsOnScreen(true);
    }

    return (  
        <div className="done-button-container">
            <button 
                className="done-button"
                onClick={handleClickDoneButton}
            >
                Done
            </button>
        </div>
    );
}
 
export default DoneButton;
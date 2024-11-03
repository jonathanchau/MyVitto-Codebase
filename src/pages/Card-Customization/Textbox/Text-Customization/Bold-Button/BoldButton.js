import './BoldButton.css';

const BoldButton = ({textboxRef}) => {

    //function deals with whether the text is bolded in the textbox
    const handleClickBoldButton = () => {        
        if (textboxRef.current.style.fontWeight === "bold") {
            textboxRef.current.style.fontWeight = "normal";
        }
        else {
            textboxRef.current.style.fontWeight = "bold";
        }
    }

    return (  
        <div className="bold-button-container">
            <button 
                className="bold-button"
                onClick={handleClickBoldButton}
            >
                B
            </button>
        </div>
    );
}
 
export default BoldButton;
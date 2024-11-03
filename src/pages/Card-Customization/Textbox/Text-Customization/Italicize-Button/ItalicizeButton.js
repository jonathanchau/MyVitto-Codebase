import './ItalicizeButton.css';

const ItalicizeButton = ({textboxRef}) => {
    //function deals with whether the text is italicized in the textbox
    const handleClickItalicizeButton = () => {
        const textboxItem = textboxRef.current;

        if (textboxRef.current.style.fontStyle === "italic") { 
            textboxItem.style.fontStyle = 'normal';
        }
        else { 
            textboxItem.style.fontStyle = 'italic';
        }
    }

    return (  
        <div className="italicize-button-container">
            <button 
                className="italicize-button"
                onClick={handleClickItalicizeButton}
            >
                I
            </button>
        </div>
    );
}
 
export default ItalicizeButton;
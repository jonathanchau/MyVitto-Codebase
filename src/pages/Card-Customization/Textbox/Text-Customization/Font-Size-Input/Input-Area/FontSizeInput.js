import {useEffect} from 'react';
import './FontSizeInput.css';
import IncrementSizeButton from '../Increment-Size-Button/IncrementSizeButton';
import DecrementSizeButton from '../Decrement-Size-Button/DecrementSizeButton';

const FontSizeInput = ({fontSize, setFontSize, textboxRef}) => {

    // Sets the font size in the font size input in the textarea when a textbox is selected
    useEffect(() => {
        const unconvertedSize = textboxRef.current.style.fontSize;
        const numericalConvertedSize = parseInt(unconvertedSize.replace("px", ""));
        setFontSize(numericalConvertedSize);
    }, [textboxRef])


    // Changes the font size based on user input
    const handleChangeFontSize = (event) => {
        const unconvertedSize = event.target.value.replace(/[^0-9]/g, '');
        const numericalConvertedSize = parseInt(unconvertedSize);
        if (isNaN(numericalConvertedSize)) {
            setFontSize(0);
            textboxRef.current.style.fontSize = '0px';
        }
        else {
            setFontSize(numericalConvertedSize);
            textboxRef.current.style.fontSize = `${numericalConvertedSize}px`;
        }
    }

    return (  
        <div className="font-size-input-container">
            <DecrementSizeButton
                textboxRef={textboxRef}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
            <textarea 
                className="font-size-input"
                value={fontSize}
                onChange={handleChangeFontSize}
            />
            <IncrementSizeButton
                textboxRef={textboxRef}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
        </div>
    );
}
 
export default FontSizeInput;
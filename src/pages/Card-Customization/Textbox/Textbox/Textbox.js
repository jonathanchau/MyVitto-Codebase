import React, {useState, useEffect} from 'react';
import './Textbox.css';

const Textbox = React.forwardRef(({borderRef, topPositionCoordinate, leftPositionCoordinate, setTopPositionCoordinate, setLeftPositionCoordinate, 
                                            setBottomPositionCoordinate, setRightPositionCoordinate}, textboxRef) => {

    const [textboxInput, setTextboxInput] = useState('');
    const [textSize, setTextSize] = useState(12);

    useEffect(() => {
        setTopPositionCoordinate(445.5);
        setLeftPositionCoordinate(151.5)
        setBottomPositionCoordinate(480.5);
        setRightPositionCoordinate(298.5);
    }, [])

    //handles changing the height of the textbox based on the content in the textbox
    const handleTextboxHeightChange = (event) => {
        if (event) {
            const target = event.target ? event.target : event;
            target.style.height = `0px`;
            target.style.height = `${target.scrollHeight}px`;
            borderRef.current.style.height = `${target.scrollHeight + 2}px`;
            
            //stores the new coordinates of the resizing vertices at the bottom of the textbox when the textbox changes size due to the user typing content into the textbox
            setBottomPositionCoordinate(topPositionCoordinate + target.scrollHeight - 3);
        }
    }

    //whenever user changes the input in the text, handleChange changes the value of textboxInput which is what saves the textbox input
    const handleTextboxContentChange = (event) => {
        setTextboxInput(event.target.value);
    }


    return (
        <div className="textbox-container">
            <textarea
                className="textbox" 
                value={textboxInput} 
                ref={textboxRef}
                onChange={handleTextboxContentChange}
                onInput={handleTextboxHeightChange}
                style={{
                    top: topPositionCoordinate, 
                    left: leftPositionCoordinate,
                    fontSize: textSize,
                }}
            />
        </div>
    );
})
 
export default Textbox;

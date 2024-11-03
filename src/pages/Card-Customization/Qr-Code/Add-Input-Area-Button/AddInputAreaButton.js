import './AddInputAreaButton.css';
import {v4 as uuidv4} from 'uuid';

const AddInputAreaButton = ({arrayOfInputAreas, setArrayOfInputAreas}) => {

    const handleClickAddInputArea = () => {
        if (arrayOfInputAreas.length < 3) {
            const inputAreaItem = {
                id: uuidv4()
            }
            setArrayOfInputAreas(prevArray => [...prevArray, inputAreaItem]);
        }
    }

    return (  
        <div className="add-input-area-container">
            <button 
                className="add-input-area-button"
                onClick={handleClickAddInputArea}
            >
                +
            </button>
            <div className="input-area-display"/>
        </div>
    );
}
 
export default AddInputAreaButton;
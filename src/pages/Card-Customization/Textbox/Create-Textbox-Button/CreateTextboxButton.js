import {v4 as uuidv4} from 'uuid';
import './CreateTextboxButton.css';

const CreateTextboxButton = ({setCardItemsArray}) => {

  //creates a new textbox by adding a new element to the array
  const handleAddTextbox = () => {
    const textboxItem = {
      id: uuidv4()
    }
    setCardItemsArray(prevArray => [...prevArray, textboxItem]);
  }
  
return (   
  <div className="textbox-button-container">   
    <div 
      className="textbox-button" 
      onClick={handleAddTextbox}>
        <div className='textbox-symbol'>T</div>
    </div> 
    <div className='textbox-label'>Textbox</div>
  </div>  
  );
}
 
export default CreateTextboxButton;

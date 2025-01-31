import {v4 as uuidv4} from 'uuid';
import {useRef} from 'react';
import './CreateImageButton.css';
import imageCompression from 'browser-image-compression';
import imageSelectionSymbol from '../../../../assets/Card-Customization/imageSelectionSymbol.png'

const CreateImageButton = ({setCardItemsArray}) => {

const imageInputRef = useRef(null);
  const handleCreateFileChangeForImage = async (event) => {
    // Get file objects from the input
    const fileObjs = event.target.files;

    // Get original image file
    const imageFile = event.target.files[0];

    // Convert file objects to an array
    const filesArray = Array.from(fileObjs);

    // Establish new characteristics of compressed image
    const options = {
      maxSizeMB: 0.01,
      useWebWorker: true
    }

  const compressedImage = await imageCompression(imageFile, options);

  let imageData = filesArray.map(_ => ({
    id: uuidv4(),
    file: compressedImage
  }));

  imageInputRef.current.value = null;

  setCardItemsArray(prevArray => [...prevArray, ...imageData])
};

    return ( 
      <div className="image-button-container">
          <div className='image-button'>
            <label 
              htmlFor="image-input">
              <div className="image-symbol-container">
                <img 
                  className="image-symbol"
                  src={imageSelectionSymbol}
                />
              </div>
                <input
                  id='image-input'
                  ref={imageInputRef}
                  type="file"
                  // We only want png, jpg, and jpeg since these are images
                  accept=".png, .jpg, .jpeg"
                  multiple
                  onChange={handleCreateFileChangeForImage}
                  style={{display: 'none'}}
              />
            </label>
          </div>
          <div className="image-label">
            Image
          </div>
        </div>
    );
}
 
export default CreateImageButton;

import './BackgroundButton.css';

const BackgroundButton = ({backgroundRef, backgroundImageIsActive, setBackgroundImageIsActive, setSelectedBackgroundImage}) => {

  const handleFileChangeForBackground = event => {
    // stores the selected image into setSelectedBackgroundImage
    setSelectedBackgroundImage(event.target.files[0]);
    //voodoo update magic
    backgroundRef.current.value = null;
    setBackgroundImageIsActive(true);
  };

  // Deletes all images
  const resetInputForBackground = () => {
    // Reset the file input value to null
    backgroundRef.current.value = null;
    // Clear selectedBackgroundImage state by setting it to an empty array
    setSelectedBackgroundImage(null);
    setBackgroundImageIsActive(false);
  };
  
  return ( 
      <div className="background-button-container">
            {/* Deal with background image reset button */}
            <div className='reset-button-container'>
              {backgroundImageIsActive && (
                <button 
                  className="background-reset-button"
                  onClick={resetInputForBackground}>
                    Reset Background
                </button>
               )}
            </div>
          <div className='background-button'>
              <label htmlFor="background-input">
                  <div className="background-symbol-container">
                    <img 
                      className="background-symbol"
                      src="backgroundImageSymbol.png" 
                    />
                  </div>
                  <input
                    id='background-input'
                    ref={backgroundRef}
                    type="file"
                    // We only want png, jpg, and jpeg since these are images
                    accept=".png, .jpg, .jpeg"
                    multiple
                    onChange={handleFileChangeForBackground}
                    style={{display: 'none'}}
                  />
              </label>
          </div>

          <div className='background-label'>
              Background
          </div>
        </div>
    );
}
 
export default BackgroundButton;

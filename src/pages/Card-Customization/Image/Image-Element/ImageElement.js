import React, {useEffect, useState, useRef} from 'react';
import './ImageElement.css'

const ImageElement = React.forwardRef(({imageFile, setLeftPositionCoordinate, setRightPositionCoordinate, setTopPositionCoordinate, setBottomPositionCoordinate, borderRef}, imageContainerRef) => {
    const [cardBorder] = useState({left: 0, top: 0, right: 358.4, bottom: 740})
    const imageRef = useRef();
        
    useEffect(() => {
      let imageIsNotLoaded = true;

      const handleSetImageDimensions = (newMaxSize, divideHeight, divideWidth, returnHeight, returnWidth, naturalHeight, naturalWidth) => {
        //calculates the new width and height of the image to fit in the card
        let numberToDivideCurrentWidthAndHeight = 1;
        if (divideHeight) {
            numberToDivideCurrentWidthAndHeight = naturalHeight / newMaxSize;
        }
        else if (divideWidth) {
            numberToDivideCurrentWidthAndHeight = naturalWidth / newMaxSize;
        }
        
        const widthAdjustment = naturalWidth / numberToDivideCurrentWidthAndHeight
        const heightAdjustment = naturalHeight / numberToDivideCurrentWidthAndHeight

        //stores the new width and height of the image in the div container that contains the image
        imageContainerRef.current.style.width = `${widthAdjustment}px`
        imageContainerRef.current.style.height = `${heightAdjustment}px`
        borderRef.current.style.width = `${widthAdjustment + 10}px`
        borderRef.current.style.height = `${heightAdjustment + 10}px`

        //establishes the position of the resizing vertices and the position of the image
        setLeftPositionCoordinate(((cardBorder.right - cardBorder.left) / 2) - (widthAdjustment / 2))
        setRightPositionCoordinate(((cardBorder.right - cardBorder.left) / 2) + (widthAdjustment / 2) + 5)
        setTopPositionCoordinate(((cardBorder.bottom - cardBorder.top) / 2) - (heightAdjustment / 2))
        setBottomPositionCoordinate(((cardBorder.bottom - cardBorder.top) / 2) + (heightAdjustment / 2) + 5)

        if (returnHeight) {
            return heightAdjustment;
        }
        else if (returnWidth) {
            return widthAdjustment;
        }
      }

      //functions deals with the dimensions of the image and makes any necessary adjustments
      const handleProvidingImageDimensions = () => {
          if(imageIsNotLoaded) {
      
          //stores the original height and width of the image stored in the file
          const naturalHeight = imageRef.current.naturalHeight;
          const naturalWidth = imageRef.current.naturalWidth;
            
          //runs true if the original height is greater than 722 pixels and if the image's original height is greater than its original width, preventing the image from appearing larger than the card
          if ((naturalHeight >= 722) && (naturalHeight >= naturalWidth)) {     
              const widthAdjustment = handleSetImageDimensions(642, false, true, false, true, naturalHeight, naturalWidth);
              //runs true if the original width is greater than 340 pixels and if the image's original width is greater than its original height, preventing the image from appearing larger than the card
              if (widthAdjustment >= 340) {         
                handleSetImageDimensions(260, false, true, false, false, naturalHeight, naturalWidth);
              }
          }
          //runs true if the original width is greater than 340 pixels and if the image's original width is greater than its original height, preventing the image from appearing larger than the card
          else if ((naturalWidth >= 340) && ((naturalWidth >= naturalHeight) || (naturalHeight))) {         
            handleSetImageDimensions(260, false, true, false, false, naturalHeight, naturalWidth);
          }
          //runs true if the original width of the image does not exceed the width of the card and if the original height of the image does not exceed the height of the card
          else {  
            handleSetImageDimensions(-1, false, false, false, false, naturalHeight, naturalWidth);
          }
          imageIsNotLoaded = false;
          borderRef.current.style.opacity = '1';
      }
  }

  const userImage = imageRef.current;
  userImage.addEventListener('load', handleProvidingImageDimensions);
  return () => {
      userImage.removeEventListener('load', handleProvidingImageDimensions);
  };
  }, [])

    return (
        <div 
            className="image-container"
            ref={imageContainerRef}
            tabIndex={"1"}
        >
            <img
                ref={imageRef}
                draggable={false}
                alt={"not found"}
                width={"100%"}
                height={"100%"}
                src={URL.createObjectURL(imageFile)}
            />
        </div>

    )
  })

  export default ImageElement;
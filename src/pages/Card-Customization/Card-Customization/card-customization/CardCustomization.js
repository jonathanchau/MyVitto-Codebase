import React, {useState, useRef, useEffect} from 'react';
import './CardCustomization.css';
import '../../app/card-editor/App.css';
import SideBar from '../../components/sidebar/Sidebar.js';
import QrGenerator from '../../components/qr-code/qr-generator/QrGenerator.js';
import DraggableBorderContainer from '../../components/draggable/DraggableBorderContainer.js';
import TextFieldElement from '../../components/textbox/textbox/Textbox.js';
import ResizeableContainer from '../../components/resizable/resizable-container/ResizeableContainer.js';
import DraggableContainer from '../../components/draggable/DraggableContainer.js';
import ImageElement from '../../components/image/image-element/ImageElement.js';
import Background from '../../components/background/background/Background.js';
import TextCustomizationBar from '../../components/textbox/text-customization/text-customization-bar/TextCustomizationBar.js';
import ResizableQrContainer from '../../components/resizable/resizable-container/ResizeableQrContainer.js';

export default function CreateBlankCard() {
  const cardRef = useRef();
  const backgroundRef = useRef(null);
  const [cardItemsArray, setCardItemsArray] = useState([]);
  const [qrGeneratorIsDisplayed, setQrGeneratorIsDisplayed] = useState(false);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
  const [backgroundImageIsActive, setBackgroundImageIsActive] = useState(false);
  const [textboxRef, setTextboxRef] = useState(null);
  const [textboxBorderRef, setTextboxBorderRef] = useState(null);
  const [displayCustomizationBar, setDisplayCustomizationBar] = useState(false);
  const [isHoveringOverCustomizationBar, setIsHoveringOverCustomizationBar] = useState(null);
  const [isHoveringOverTextbox, setIsHoveringOverTextbox] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [qrCodeIsOnScreen, setQrCodeIsOnScreen] = useState(false);
  const [resizingVertices, setResizingVertices] = useState({topLeft: null, topMiddle: null, topRight: null,
                                                            rightMiddle: null, rightBottom: null, bottomMiddle: null,
                                                            bottomLeft: null, leftMiddle: null});

  useEffect(() => {
    if ((resizingVertices.topLeft && resizingVertices.topLeft.current) && (resizingVertices.topMiddle && resizingVertices.topMiddle.current) && 
      (resizingVertices.topRight && resizingVertices.topRight.current) && (resizingVertices.rightMiddle && resizingVertices.rightMiddle.current) && 
      (resizingVertices.rightBottom && resizingVertices.rightBottom.current) && (resizingVertices.bottomMiddle && resizingVertices.bottomMiddle.current) && 
      (resizingVertices.bottomLeft && resizingVertices.bottomLeft.current) && (resizingVertices.leftMiddle && resizingVertices.leftMiddle.current)) {
      
      if (displayCustomizationBar) {
        resizingVertices.topLeft.current.style.opacity = "1";
        resizingVertices.topMiddle.current.style.opacity = "1";
        resizingVertices.topRight.current.style.opacity = "1";
        resizingVertices.rightMiddle.current.style.opacity = "1";
        resizingVertices.rightBottom.current.style.opacity = "1";
        resizingVertices.bottomMiddle.current.style.opacity = "1";
        resizingVertices.bottomLeft.current.style.opacity = "1";
        resizingVertices.leftMiddle.current.style.opacity = "1";
      }
      else {
        resizingVertices.topLeft.current.style.opacity = "0";
        resizingVertices.topMiddle.current.style.opacity = "0";
        resizingVertices.topRight.current.style.opacity = "0";
        resizingVertices.rightMiddle.current.style.opacity = "0";
        resizingVertices.rightBottom.current.style.opacity = "0";
        resizingVertices.bottomMiddle.current.style.opacity = "0";
        resizingVertices.bottomLeft.current.style.opacity = "0";
        resizingVertices.leftMiddle.current.style.opacity = "0";
      }
    }

  }, [displayCustomizationBar, resizingVertices])


  const handleKeyDownDeleteItem = (event, id) => {
    if ((event.key === 'Delete') || (event.key === 'Backspace')) {
      const newCardItemsArray = cardItemsArray.filter((item) => item.id !== id);
      setCardItemsArray(newCardItemsArray);
      setDisplayCustomizationBar(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log("window width", width);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, [])

  return (
    <div className = "customization">
      <div className = "card-wrapper">
          {qrGeneratorIsDisplayed && (
            <QrGenerator 
              setQrGeneratorIsDisplayed={setQrGeneratorIsDisplayed}
              qrGeneratorIsDisplayed={qrGeneratorIsDisplayed}
              setQrCodeIsOnScreen={setQrCodeIsOnScreen}
            />
          )}

          {displayCustomizationBar &&
            <TextCustomizationBar
              textboxRef={textboxRef}
              setDisplayCustomizationBar={setDisplayCustomizationBar}
              isHoveringOverTextbox={isHoveringOverTextbox}
              isHoveringOverCustomizationBar={isHoveringOverCustomizationBar}
              setIsHoveringOverCustomizationBar={setIsHoveringOverCustomizationBar}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          }

          <div 
            className = "card card--size"
            ref={cardRef}
          >

            {selectedBackgroundImage && (
              <Background
                selectedBackgroundImage={selectedBackgroundImage}
              />
            )}

            {cardItemsArray.map((item) => (
              item.file ? (
                <ResizeableContainer
                  type={"image"}
                  key={item.id}
                  id={item.id}
                  imageFile={item.file}
                  DraggableWrapper={DraggableContainer}
                  WrappedComponent={ImageElement}
                  setTextboxRef={setTextboxRef}
                  setTextboxBorderRef={setTextboxBorderRef}
                  setDisplayCustomizationBar={setDisplayCustomizationBar}
                  handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
              ) : (
                <ResizeableContainer
                  type={"textbox"}
                  key={item.id}
                  id={item.id}
                  DraggableWrapper={DraggableBorderContainer}
                  WrappedComponent={TextFieldElement}
                  setTextboxRef={setTextboxRef}
                  textboxBorderRef={textboxBorderRef}
                  setTextboxBorderRef={setTextboxBorderRef}
                  displayCustomizationBar={displayCustomizationBar}
                  setDisplayCustomizationBar={setDisplayCustomizationBar}
                  isHoveringOverCustomizationBar={isHoveringOverCustomizationBar}
                  handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                  resizingVertices={resizingVertices}
                  setResizingVertices={setResizingVertices}
                  setIsHoveringOverResizableContainer={setIsHoveringOverTextbox}
                />
              )
            ))}
            {(qrCodeIsOnScreen) &&
              <ResizableQrContainer
                setTextboxRef={setTextboxRef}
                setTextboxBorderRef={setTextboxBorderRef}
                setDisplayCustomizationBar={setDisplayCustomizationBar}
              />
            }
          </div>
          <SideBar
            backgroundRef={backgroundRef}
            backgroundImageIsActive={backgroundImageIsActive}
            setBackgroundImageIsActive={setBackgroundImageIsActive}
            setSelectedBackgroundImage={setSelectedBackgroundImage}
            setQrGeneratorIsDisplayed={setQrGeneratorIsDisplayed}
            qrGeneratorIsDisplayed={qrGeneratorIsDisplayed}
            setCardItemsArray={setCardItemsArray}
          />
      </div>
    </div>
  );
}


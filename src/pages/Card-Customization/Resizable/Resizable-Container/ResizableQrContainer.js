import {useEffect, useRef, useState} from "react";
import ResizingVertex from "../Resizing-Vertex/ResizingVertex";
import DraggableContainer from "../../Draggable/DraggableContainer";
import QRCode from "react-qr-code";

const ResizableQrContainer = ({setTextboxRef, setTextboxBorderRef, setDisplayCustomizationBar}) => {

    const qrCodeRef = useRef(null);

    //initialization of reference to the border of the component
    const borderRef = useRef(null); 

    const borderAppearanceRef = useRef(null);

    //initialization of references to each of the 4 resizing vertices that appear on the border; references will allow direct access to the properties of each resizing vertex
    const topLeftCorner = useRef(null);
    const topRightCorner = useRef(null);
    const bottomLeftCorner = useRef(null);
    const bottomRightCorner = useRef(null);

    //stores x and y coordinates of each side of the component
    const [bottomPositionCoordinate, setBottomPositionCoordinate] = useState(null);
    const [leftPositionCoordinate, setLeftPositionCoordinate] = useState(null);
    const [rightPositionCoordinate, setRightPositionCoordinate] = useState(null);
    const [topPositionCoordinate, setTopPositionCoordinate] = useState(null);

    useEffect(() => {
        setTopPositionCoordinate(445.5);
        setLeftPositionCoordinate(151.5)
        setBottomPositionCoordinate(697);
        setRightPositionCoordinate(403);
    }, [])
//251.5
    const handleFocusContainer = () => {
        setTextboxRef(null);
        setTextboxBorderRef(null);
        setDisplayCustomizationBar(null);

        borderRef.current.style.border = "1.5px dashed gray";
        topLeftCorner.current.style.opacity = "1";
        topRightCorner.current.style.opacity = "1";
        bottomLeftCorner.current.style.opacity = "1";
        bottomRightCorner.current.style.opacity = "1";
    }

    const handleBlurContainer = () => {
        borderRef.current.style.border = "transparent";
        topLeftCorner.current.style.opacity = "0";
        topRightCorner.current.style.opacity = "0";
        bottomLeftCorner.current.style.opacity = "0";
        bottomRightCorner.current.style.opacity = "0";
    }

    useEffect(() => {
        const qrCodeItem = qrCodeRef.current;
        const qrCodeProperties = window.getComputedStyle(qrCodeItem);

        let measure = parseInt(qrCodeProperties.width);

        let x = 0;

        const handleDrag = (event, vertexNumber) => {
            const changeInPosition = event.clientX - x;
            x = event.clientX;

            if (vertexNumber === 1) {
                measure = measure - changeInPosition;
                setLeftPositionCoordinate(rightPositionCoordinate - measure + 2);
                setTopPositionCoordinate(bottomPositionCoordinate - measure + 2);
            }
            else if (vertexNumber === 2) {
                measure = measure + changeInPosition;
                setRightPositionCoordinate(leftPositionCoordinate + measure);
                setTopPositionCoordinate(bottomPositionCoordinate - measure + 2);
            }
            else if (vertexNumber === 3) {
                measure = measure + changeInPosition;
                setRightPositionCoordinate(leftPositionCoordinate + measure);
                setBottomPositionCoordinate(topPositionCoordinate + measure);
            }
            else if (vertexNumber === 4) {
                measure = measure - changeInPosition;
                setLeftPositionCoordinate(rightPositionCoordinate - measure + 2);
                setBottomPositionCoordinate(topPositionCoordinate + measure);
            }

            qrCodeItem.style.width = `${measure}px`;
            qrCodeItem.style.height = `${measure}px`;

            borderRef.current.style.width = `${measure + 5}px`;
            borderRef.current.style.height = `${measure + 5}px`;
        }

        const handleMouseDown = (event, mouseMoveFunction) => {
            x = event.clientX;
            document.addEventListener("mousemove", mouseMoveFunction);
            document.addEventListener("mouseup", () => handleMouseUp(mouseMoveFunction));
        }

        const handleMouseUp = (mouseMoveFunction) => {
            document.removeEventListener("mousemove", mouseMoveFunction);
        }

        let topLeftVertexDrag;
        const handleMouseDownTopLeftCorner = (event) => {
            topLeftVertexDrag = (event) => handleDrag(event, 1);
            handleMouseDown(event, topLeftVertexDrag);
        }

        let topRightVertexDrag;
        const handleMouseDownTopRightCorner = (event) => {
            topRightVertexDrag = (event) => handleDrag(event, 2);
            handleMouseDown(event, topRightVertexDrag);
        }

        let bottomRightVertexDrag;
        const handleMouseDownBottomRightCorner = (event) => {
            bottomRightVertexDrag = (event) => handleDrag(event, 3);
            handleMouseDown(event, bottomRightVertexDrag);
        }

        let bottomLeftVertexDrag;
        const handleMouseDownBottomLeftCorner = (event) => {
            bottomLeftVertexDrag = (event) => handleDrag(event, 4);
            handleMouseDown(event, bottomLeftVertexDrag);
        }

        if (topLeftCorner.current && topRightCorner.current && bottomRightCorner.current && bottomLeftCorner.current) {
            topLeftCorner.current.addEventListener("mousedown", handleMouseDownTopLeftCorner);
            topRightCorner.current.addEventListener("mousedown", handleMouseDownTopRightCorner);
            bottomRightCorner.current.addEventListener("mousedown", handleMouseDownBottomRightCorner);
            bottomLeftCorner.current.addEventListener("mousedown", handleMouseDownBottomLeftCorner);
        }
        return () => {
            if (topLeftCorner.current && topRightCorner.current && bottomRightCorner.current && bottomLeftCorner.current) {
                topLeftCorner.current.removeEventListener("mousedown", handleMouseDownTopLeftCorner);
                topRightCorner.current.removeEventListener("mousedown", handleMouseDownTopRightCorner);
                bottomRightCorner.current.removeEventListener("mousedown", handleMouseDownBottomRightCorner);
                bottomLeftCorner.current.removeEventListener("mousedown", handleMouseDownBottomLeftCorner);        
            }
        }
    }, [bottomPositionCoordinate, leftPositionCoordinate, rightPositionCoordinate, topPositionCoordinate])

    const QrCodeContainer = () => {
        return (
            <QRCode
                ref={qrCodeRef}
                value="https://www.google.com"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        )
    }

    return (  
        <div 
            className="resizable-qr-container"
            tabIndex={"1"}
            onFocus={handleFocusContainer}
            onBlur={handleBlurContainer}
        >
            
            <DraggableContainer
                WrappedComponent={QrCodeContainer}
                borderRef={borderRef}
                topPositionCoordinate={topPositionCoordinate}
                setTopPositionCoordinate={setTopPositionCoordinate}
                leftPositionCoordinate={leftPositionCoordinate}
                setLeftPositionCoordinate={setLeftPositionCoordinate}
                bottomPositionCoordinate={bottomPositionCoordinate}
                setBottomPositionCoordinate={setBottomPositionCoordinate}
                rightPositionCoordinate={rightPositionCoordinate}
                setRightPositionCoordinate={setRightPositionCoordinate}
                isQrCode={true}
            />
            <ResizingVertex 
                vertexRef={topLeftCorner} 
                cursorType='nw-resize'
                xCoordinate={leftPositionCoordinate - 2}
                yCoordinate={topPositionCoordinate - 2}
            />
            <ResizingVertex
                vertexRef={topRightCorner} 
                cursorType='ne-resize'
                xCoordinate={rightPositionCoordinate + 4}
                yCoordinate={topPositionCoordinate - 2}
            />
            <ResizingVertex
                vertexRef={bottomRightCorner} 
                cursorType='se-resize'
                xCoordinate={rightPositionCoordinate + 4} 
                yCoordinate={bottomPositionCoordinate + 4}
            />
            <ResizingVertex
                vertexRef={bottomLeftCorner} 
                cursorType='sw-resize'
                xCoordinate={leftPositionCoordinate - 2}
                yCoordinate={bottomPositionCoordinate + 4}
            />
        </div>
    );
}
 
export default ResizableQrContainer;

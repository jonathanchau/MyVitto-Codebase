import React, {useState, useRef, useEffect} from 'react';
import ResizingVertex from '../resizing-vertex/ResizingVertex';


const ResizeableContainer = ({type, DraggableWrapper, WrappedComponent, id, handleKeyDownDeleteItem, imageFile,
                            setTextboxRef, textboxBorderRef, setTextboxBorderRef, displayCustomizationBar, setDisplayCustomizationBar,
                            isHoveringOverCustomizationBar, resizingVertices, setResizingVertices, setIsHoveringOverResizableContainer}) => {
    //initilaization of reference to the wrapped component
    const componentRef = useRef(null);

    //initialization of reference to the border of the component
    const borderRef = useRef(null); 

    //initialization of references to each of the 8 resizing vertices that appear on the border; references will allow direct access to the properties of each resizing vertex
    const componentTopLeftCorner = useRef(null);
    const componentTopRightCorner = useRef(null);
    const componentBottomLeftCorner = useRef(null);
    const componentBottomRightCorner = useRef(null);
    const componentBottomMiddle = useRef(null);
    const componentLeftMiddle = useRef(null);
    const componentRightMiddle = useRef(null);
    const componentTopMiddle = useRef(null);

    //stores x and y coordinates of each side of the component
    const [bottomPositionCoordinate, setBottomPositionCoordinate] = useState(null);
    const [leftPositionCoordinate, setLeftPositionCoordinate] = useState(null);
    const [rightPositionCoordinate, setRightPositionCoordinate] = useState(null);
    const [topPositionCoordinate, setTopPositionCoordinate] = useState(null);

    const [height, setHeight] = useState(bottomPositionCoordinate - topPositionCoordinate);
    const [width, setWidth] = useState(rightPositionCoordinate - leftPositionCoordinate);

    //displays the component's border and resizing vertices on screen
    const handleOnFocusWrapper = () => {
        borderRef.current.style.border='1.5px dashed gray';

        if (type === "textbox") {
            setTextboxRef(componentRef);
            setDisplayCustomizationBar(true);
            setTextboxBorderRef(borderRef);

            if ((resizingVertices.topLeft && resizingVertices.topLeft.current) && (resizingVertices.topMiddle && resizingVertices.topMiddle.current) && 
                (resizingVertices.topRight && resizingVertices.topRight.current) && (resizingVertices.rightMiddle && resizingVertices.rightMiddle.current) && 
                (resizingVertices.rightBottom && resizingVertices.rightBottom.current) && (resizingVertices.bottomMiddle && resizingVertices.bottomMiddle.current) && 
                (resizingVertices.bottomLeft && resizingVertices.bottomLeft.current) && (resizingVertices.leftMiddle && resizingVertices.leftMiddle.current)) {
                
                resizingVertices.topLeft.current.style.opacity = "0";
                resizingVertices.topMiddle.current.style.opacity = "0";
                resizingVertices.topRight.current.style.opacity = "0";
                resizingVertices.rightMiddle.current.style.opacity = "0";
                resizingVertices.rightBottom.current.style.opacity = "0";
                resizingVertices.bottomMiddle.current.style.opacity = "0";
                resizingVertices.bottomLeft.current.style.opacity = "0";
                resizingVertices.leftMiddle.current.style.opacity = "0";
                setResizingVertices({topLeft: componentTopLeftCorner, topMiddle: componentTopMiddle, topRight: componentTopRightCorner,
                                    rightMiddle: componentRightMiddle, rightBottom: componentBottomRightCorner, bottomMiddle: componentBottomMiddle,
                                    bottomLeft: componentBottomLeftCorner, leftMiddle: componentLeftMiddle});
            }
            else {
                setResizingVertices({topLeft: componentTopLeftCorner, topMiddle: componentTopMiddle, topRight: componentTopRightCorner,
                    rightMiddle: componentRightMiddle, rightBottom: componentBottomRightCorner, bottomMiddle: componentBottomMiddle,
                    bottomLeft: componentBottomLeftCorner, leftMiddle: componentLeftMiddle});
            }
        }
        else {
            setTextboxRef(null);
            setTextboxBorderRef(null);
            setDisplayCustomizationBar(false);
        }
        componentTopLeftCorner.current.style.opacity = "1";
        componentTopMiddle.current.style.opacity = "1";
        componentTopRightCorner.current.style.opacity = "1";
        componentRightMiddle.current.style.opacity = "1";
        componentBottomRightCorner.current.style.opacity = "1";
        componentBottomMiddle.current.style.opacity = "1";
        componentBottomLeftCorner.current.style.opacity = "1";
        componentLeftMiddle.current.style.opacity = "1";
    }

    //hides the component's border and resizing vertices
    const handleOnBlurWrapper = () => {
        // If the wrapped component is a textbox, the border and resizing vertices stay on screen
        if (type === "image") {
            borderRef.current.style.borderColor='transparent';

            componentTopLeftCorner.current.style.opacity = "0";
            componentTopMiddle.current.style.opacity = "0";
            componentTopRightCorner.current.style.opacity = "0";
            componentRightMiddle.current.style.opacity = "0";
            componentBottomRightCorner.current.style.opacity = "0";
            componentBottomMiddle.current.style.opacity = "0";
            componentBottomLeftCorner.current.style.opacity = "0";
            componentLeftMiddle.current.style.opacity = "0";
        }
        
        if (type === "textbox") {
            if (!isHoveringOverCustomizationBar) {
                setDisplayCustomizationBar(false)
                borderRef.current.style.borderColor='transparent';

                componentTopLeftCorner.current.style.opacity = "0";
                componentTopMiddle.current.style.opacity = "0";
                componentTopRightCorner.current.style.opacity = "0";
                componentRightMiddle.current.style.opacity = "0";
                componentBottomRightCorner.current.style.opacity = "0";
                componentBottomMiddle.current.style.opacity = "0";
                componentBottomLeftCorner.current.style.opacity = "0";
                componentLeftMiddle.current.style.opacity = "0";
            }
        }
    }

    const handleMouseEnterContainer = () => {
        if (setIsHoveringOverResizableContainer) {
            setIsHoveringOverResizableContainer(true);
        }
    }

    const handleMouseLeaveContainer = () => {
        if (setIsHoveringOverResizableContainer) {
            setIsHoveringOverResizableContainer(false);
        }
    }

    useEffect(() => {
        if (imageFile) {
            borderRef.current.style.opacity = '0';
        }
        //causes the component to be automatically selected when it is created
        componentRef.current.focus(); 
    }, [])

    useEffect(() => {
        //prevents the component from highlighting whenever the user drags
        const handlePreventHighlightingComponent = (event) => {
            event.preventDefault();
        }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///---------------------------------------------Handles the horizontal and vertical movement of each vertex----------------------------------------------///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const componentItem = componentRef.current; 
        const componentProperties = window.getComputedStyle(componentItem);

        let width = parseInt(componentProperties.width); 
        let height = parseInt(componentProperties.height);

        let x = 0;
        let y = 0;

        /*
            Vertex number indicates which vertex is calling the function. This allows the function to determine whether the 
            resizing vertex should be allowed to move horizontally or vertically or both.

            What each vertex number represents:
            --------------------
            1 = top left vertex
            2 = top middle vertex
            3 = top right vertex
            4 = right middle vertex
            5 = bottom right vertex
            6 = bottom middle vertex
            7 = bottom left vertex
            8 = left middle vertex 
        */

        // Moves vertex horizontally in accordance with the cursor's horizontal movement
        const handleHorizontalDrag = (event, vertexNumber) => {
            // changeInPosition takes the previous x coordinate of the cursor and subtracts the current x coordinate by it
            const changeInPosition = event.clientX - x;
            x = event.clientX;

            if (vertexNumber === 3 || vertexNumber === 4 || vertexNumber === 5) {
                width = width + changeInPosition;
                setRightPositionCoordinate(leftPositionCoordinate + width + 5);
            }
            else if (vertexNumber === 7 || vertexNumber === 8 || vertexNumber === 1) {
                width = width - changeInPosition;
                setLeftPositionCoordinate(rightPositionCoordinate - width - 5);
            } 

            componentItem.style.width = `${width}px`;
            borderRef.current.style.width = `${width + 10}px`;

            // Sets minimum width
            if (width <= 30) {
                componentItem.style.width = '30px';
                borderRef.current.style.width = '40px';

                if (vertexNumber === 3 || vertexNumber === 4 || vertexNumber === 5) {
                    setRightPositionCoordinate(leftPositionCoordinate + 35);
                }
                else if (vertexNumber === 7 || vertexNumber === 8 || vertexNumber === 1) {
                    setLeftPositionCoordinate(rightPositionCoordinate - 35);
                }
            }
        }


        // Activates event listeners required for vertex to continue or stop moving horizontally
        const handleMouseDownHorizontalMovingVertex = (event, mouseMoveFunction) => {
            x = event.clientX;
            document.addEventListener("mousemove", mouseMoveFunction);  
            document.addEventListener("mouseup", () => handleMouseUpHorizontalMovingVertex(mouseMoveFunction));
        }

        // Deactivates event listener that horizontally moves the vertex in accordance to the cursor
        const handleMouseUpHorizontalMovingVertex = (mouseMoveFunction) => {
            document.removeEventListener("mousemove", mouseMoveFunction);
            setWidth(width);
        }


        
        // Moves vertex vertically in accordance with the cursor's horizontal movement
        const handleVerticalDrag = (event, vertexNumber) => {
            // changeInPosition takes the previous y coordinate of the cursor and subtracts the current y coordinate by it
            const changeInPosition = event.clientY - y;
            y = event.clientY;

            if (vertexNumber === 1 || vertexNumber === 2 || vertexNumber === 3) {
                height = height - changeInPosition;
                setTopPositionCoordinate(bottomPositionCoordinate - height - 5);
            }
            else if (vertexNumber === 5 || vertexNumber === 6 || vertexNumber === 7) {
                height = height + changeInPosition;
                setBottomPositionCoordinate(topPositionCoordinate + height + 5);
            }    
            componentItem.style.height = `${height}px`;
            borderRef.current.style.height = `${height + 10}px`;

            // sets minimum height
            if (height <= 30) {
                componentItem.style.height = '30px';
                borderRef.current.style.height = '40px';
                if (vertexNumber === 1 || vertexNumber === 2 || vertexNumber === 3) {
                    setTopPositionCoordinate(bottomPositionCoordinate - 35);
                }
                else if (vertexNumber === 5 || vertexNumber === 6 || vertexNumber === 7) {
                    setBottomPositionCoordinate(topPositionCoordinate + 35);
                }
            }
        }

        // Activates event listeners required for vertex to continue or stop moving vertically
        const handleMouseDownVerticalMovingVertex = (event, mouseMoveFunction) => {
            y = event.clientY;
            document.addEventListener("mousemove", mouseMoveFunction);  
            document.addEventListener("mouseup", () => handleMouseUpVerticalMovingVertex(mouseMoveFunction));
        }

        // Deactivates event listener that vertically moves the vertex in accordance to the cursor
        const handleMouseUpVerticalMovingVertex = (mouseMoveFunction) => {
            document.removeEventListener("mousemove", mouseMoveFunction);
            setHeight(height);
        }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///-----------------------------Handles the mouse down events for each vertex for when the user holds left click on a vertex-----------------------------///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let topMiddleVertexVerticalDrag;
        //handles when the cursor is over the top middle vertex and the user holds left click
        const handleMouseClickToptMiddleVertex = (event) => {
            topMiddleVertexVerticalDrag = (event) => handleVerticalDrag(event, 2);
            handleMouseDownVerticalMovingVertex(event, topMiddleVertexVerticalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let topRightVertexHorizontalDrag;
        let topRightVertexVerticalDrag;
        //handles when the cursor is over the top right vertex and the user holds left click
        const handleMouseClickTopRightVertex = (event) => {
            topRightVertexHorizontalDrag = (event) => handleHorizontalDrag(event, 3);
            topRightVertexVerticalDrag = (event) => handleVerticalDrag(event, 3);
            handleMouseDownHorizontalMovingVertex(event, topRightVertexHorizontalDrag);
            handleMouseDownVerticalMovingVertex(event, topRightVertexVerticalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let rightMiddleVertexHorizontalDrag;
        //handles when the cursor is over the right middle vertex and the user holds left click
        const handleMouseClickRightMiddleVertex = (event) => {
            rightMiddleVertexHorizontalDrag = (event) => handleHorizontalDrag(event, 4);
            handleMouseDownHorizontalMovingVertex(event, rightMiddleVertexHorizontalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let bottomRightVertexHorizontalDrag;
        let bottomRightVertexVerticalDrag;
        //handles when the cursor is over the right middle vertex and the user holds left click
        const handleMouseClickBottomRightVertex = (event) => {
            bottomRightVertexHorizontalDrag = (event) => handleHorizontalDrag(event, 5);
            bottomRightVertexVerticalDrag = (event) => handleVerticalDrag(event, 5);
            handleMouseDownHorizontalMovingVertex(event, bottomRightVertexHorizontalDrag);
            handleMouseDownVerticalMovingVertex(event, bottomRightVertexVerticalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let bottomMiddleVertexVerticalDrag;
        //handles when the cursor is over the bottom middle vertex and the user holds left click
        const handleMouseClickBottomMiddleVertex = (event) => {
            bottomMiddleVertexVerticalDrag = (event) => handleVerticalDrag(event, 6);
            handleMouseDownVerticalMovingVertex(event, bottomMiddleVertexVerticalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let bottomLeftVertexHorizontalDrag;
        let bottomLeftVertexVerticalDrag;
        //handles when the cursor is over the right middle vertex and the user holds left click
        const handleMouseClickBottomLeftVertex = (event) => {
            bottomLeftVertexHorizontalDrag = (event) => handleHorizontalDrag(event, 7);
            bottomLeftVertexVerticalDrag = (event) => handleVerticalDrag(event, 7);
            handleMouseDownHorizontalMovingVertex(event, bottomLeftVertexHorizontalDrag);
            handleMouseDownVerticalMovingVertex(event, bottomLeftVertexVerticalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let leftMiddleVertexHorizontaDrag;
        //handles when the cursor is over the left middle vertex and the user holds left click
        const handleMouseClickLeftMiddleVertex = (event) => {
            leftMiddleVertexHorizontaDrag = (event) => handleHorizontalDrag(event, 8);
            handleMouseDownHorizontalMovingVertex(event, leftMiddleVertexHorizontaDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let topLeftVertexHorizontalDrag;
        let topLeftVertexVerticalDrag;
        //handles when the cursor is over the right middle vertex and the user holds left click
        const handleMouseClickTopLeftVertex = (event) => {
            topLeftVertexHorizontalDrag = (event) => handleHorizontalDrag(event, 1);
            topLeftVertexVerticalDrag = (event) => handleVerticalDrag(event, 1);
            handleMouseDownHorizontalMovingVertex(event, topLeftVertexHorizontalDrag);
            handleMouseDownVerticalMovingVertex(event, topLeftVertexVerticalDrag);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (componentTopLeftCorner.current && componentTopMiddle.current && componentTopRightCorner.current && componentRightMiddle.current && componentBottomRightCorner.current &&
        componentBottomMiddle.current && componentBottomLeftCorner.current && componentLeftMiddle.current) {
            componentTopMiddle.current.addEventListener("mousedown", handleMouseClickToptMiddleVertex);        
            componentTopMiddle.current.addEventListener("selectstart", handlePreventHighlightingComponent); 
            
            componentTopRightCorner.current.addEventListener("mousedown", handleMouseClickTopRightVertex);     
            componentTopRightCorner.current.addEventListener("selectstart", handlePreventHighlightingComponent);  

            componentRightMiddle.current.addEventListener("mousedown", handleMouseClickRightMiddleVertex);     
            componentRightMiddle.current.addEventListener("selectstart", handlePreventHighlightingComponent);    
            
            componentBottomRightCorner.current.addEventListener("mousedown", handleMouseClickBottomRightVertex);     
            componentBottomRightCorner.current.addEventListener("selectstart", handlePreventHighlightingComponent);   

            componentBottomMiddle.current.addEventListener("mousedown", handleMouseClickBottomMiddleVertex);   
            componentBottomMiddle.current.addEventListener("selectstart", handlePreventHighlightingComponent);    

            componentBottomLeftCorner.current.addEventListener("mousedown", handleMouseClickBottomLeftVertex);   
            componentBottomLeftCorner.current.addEventListener("selectstart", handlePreventHighlightingComponent);   

            componentLeftMiddle.current.addEventListener("mousedown", handleMouseClickLeftMiddleVertex);      
            componentLeftMiddle.current.addEventListener("selectstart", handlePreventHighlightingComponent);    

            componentTopLeftCorner.current.addEventListener("mousedown", handleMouseClickTopLeftVertex);     
            componentTopLeftCorner.current.addEventListener("selectstart", handlePreventHighlightingComponent);  
        }

        return () => {
            if (componentTopLeftCorner.current && componentTopMiddle.current && componentTopRightCorner.current && componentRightMiddle.current && componentBottomRightCorner.current &&
                componentBottomMiddle.current && componentBottomLeftCorner.current && componentLeftMiddle.current) {
                componentTopMiddle.current.removeEventListener("mousedown", handleMouseClickToptMiddleVertex);     
                componentTopMiddle.current.removeEventListener("selectstart", handlePreventHighlightingComponent);   

                componentTopRightCorner.current.removeEventListener("mousedown", handleMouseClickTopRightVertex)   
                componentTopRightCorner.current.removeEventListener("selectstart", handlePreventHighlightingComponent) 
                
                componentRightMiddle.current.removeEventListener("mousedown", handleMouseClickRightMiddleVertex)   
                componentRightMiddle.current.removeEventListener("selectstart", handlePreventHighlightingComponent)  

                componentBottomRightCorner.current.removeEventListener("mousedown", handleMouseClickBottomRightVertex);    
                componentBottomRightCorner.current.removeEventListener("selectstart", handlePreventHighlightingComponent);    

                componentBottomMiddle.current.removeEventListener("mousedown", handleMouseClickBottomMiddleVertex);    
                componentBottomMiddle.current.removeEventListener("selectstart", handlePreventHighlightingComponent);    

                componentBottomLeftCorner.current.removeEventListener("mousedown", handleMouseClickBottomLeftVertex);    
                componentBottomLeftCorner.current.removeEventListener("selectstart", handlePreventHighlightingComponent);   

                componentLeftMiddle.current.removeEventListener("mousedown", handleMouseClickLeftMiddleVertex);    
                componentLeftMiddle.current.removeEventListener("selectstart", handlePreventHighlightingComponent);  

                componentTopLeftCorner.current.removeEventListener("mousedown", handleMouseClickTopLeftVertex);    
                componentTopLeftCorner.current.removeEventListener("selectstart", handlePreventHighlightingComponent);  
            }
        }

    }, [topPositionCoordinate, leftPositionCoordinate, bottomPositionCoordinate, rightPositionCoordinate])



    return (
        <div
            onFocus={handleOnFocusWrapper}
            onBlur={handleOnBlurWrapper}
            onMouseEnter={handleMouseEnterContainer}
            onMouseLeave={handleMouseLeaveContainer}
            tabIndex={"1"}
        >
            <DraggableWrapper
                id={id}
                WrappedComponent={WrappedComponent}
                borderRef={borderRef}
                topPositionCoordinate={topPositionCoordinate}
                setTopPositionCoordinate={setTopPositionCoordinate}
                leftPositionCoordinate={leftPositionCoordinate}
                setLeftPositionCoordinate={setLeftPositionCoordinate}
                bottomPositionCoordinate={bottomPositionCoordinate}
                setBottomPositionCoordinate={setBottomPositionCoordinate}
                rightPositionCoordinate={rightPositionCoordinate}
                setRightPositionCoordinate={setRightPositionCoordinate}
                componentRef={componentRef}
                imageFile={imageFile}
                handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                setTextboxRef={setTextboxRef}
                textboxBorderRef={textboxBorderRef}
                setTextboxBorderRef={setTextboxBorderRef}
                displayCustomizationBar={displayCustomizationBar}
                isQrCode={false}
            />

                <ResizingVertex 
                    vertexRef={componentTopLeftCorner} 
                    cursorType='nw-resize'
                    xCoordinate={leftPositionCoordinate - 2}
                    yCoordinate={topPositionCoordinate - 2}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentTopMiddle} 
                    cursorType='n-resize'
                    xCoordinate={(rightPositionCoordinate + leftPositionCoordinate + 4) / 2}
                    yCoordinate={topPositionCoordinate - 2}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentTopRightCorner} 
                    cursorType='ne-resize'
                    xCoordinate={rightPositionCoordinate + 4}
                    yCoordinate={topPositionCoordinate - 2}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentRightMiddle} 
                    cursorType='e-resize'
                    xCoordinate={rightPositionCoordinate + 4}
                    yCoordinate={(bottomPositionCoordinate + topPositionCoordinate + 4) / 2}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentBottomRightCorner} 
                    cursorType='se-resize'
                    xCoordinate={rightPositionCoordinate + 4} 
                    yCoordinate={bottomPositionCoordinate + 4}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentBottomMiddle} 
                    cursorType='s-resize'
                    xCoordinate={(rightPositionCoordinate + leftPositionCoordinate + 4) / 2}
                    yCoordinate={bottomPositionCoordinate + 4}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentBottomLeftCorner} 
                    cursorType='sw-resize'
                    xCoordinate={leftPositionCoordinate - 2}
                    yCoordinate={bottomPositionCoordinate + 4}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
                <ResizingVertex
                    vertexRef={componentLeftMiddle} 
                    cursorType='w-resize'
                    xCoordinate={leftPositionCoordinate - 2}
                    yCoordinate={(bottomPositionCoordinate + topPositionCoordinate + 4) / 2}
                    wrappedComponentId={id}
                    handleKeyDownDeleteItem={handleKeyDownDeleteItem}
                />
        </div>
    );
}
 
export default ResizeableContainer;

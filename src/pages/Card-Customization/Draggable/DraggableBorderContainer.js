import {useEffect} from "react";

const DraggableBorderContainer = ({id, WrappedComponent, borderRef, topPositionCoordinate, setTopPositionCoordinate, leftPositionCoordinate, setLeftPositionCoordinate, bottomPositionCoordinate, 
                                   setBottomPositionCoordinate, rightPositionCoordinate, setRightPositionCoordinate, componentRef, handleKeyDownDeleteItem, setTextboxRef, textboxBorderRef, 
                                   setTextboxBorderRef, displayCustomizationBar, setIsHoveringOverTextbox}) => {

    //calculates difference in distance of x and y coordinates between the coordinates of mouse cursor and coordinates of the top left corner of the component
    let differenceInXPosition = 0;
    let differenceInYPosition = 0;
    
    useEffect(() => {
        //handles the interaction of the user holding left click on the mouse when the cursor is over the border of the component
        const handleMouseDownBorder = (event) => {
            //calculates the difference between the coordinates of the cursor relative to the window and the coordinate of the top left corner of the component relative to the card
            differenceInXPosition = event.clientX - leftPositionCoordinate;
            differenceInYPosition = event.clientY - topPositionCoordinate;
        
            //when cursor moves, handleMouseMoveComponent function is ran
            document.addEventListener('mousemove', handleMouseMoveComponent); 
                    
            //when user releases left click, handleMouseUpBorder function is ran
            document.addEventListener('mouseup', handleMouseUpBorder); 
        }
        
        
        //handles the interaction of the user releasing left click after dragging the component
        const handleMouseUpBorder = () => {
            //deactivates interaction between the cursor moving and running the handMouseMovement function
            document.removeEventListener('mousemove', handleMouseMoveComponent); 
        
            //deactivates interaction between releasing left click and running the handleMouseUclick function 
            document.removeEventListener('mouseup', handleMouseUpBorder);    
        }
        
        
        //handles setting the new coordinates of the component after the component is dragged to a new position
        const handleMouseMoveComponent = (event) => {
            const componentItem = componentRef.current;
            const componentProperties = componentItem.getBoundingClientRect();
        
            //calculates the new horizontal poisition of the component after being dragged
            const changeInXPosition = event.clientX - differenceInXPosition;
            setLeftPositionCoordinate(changeInXPosition);
            setRightPositionCoordinate(changeInXPosition + (rightPositionCoordinate - leftPositionCoordinate));
        
            //calculates new vertical position of the component after being dragged
            const changeInYPosition = event.clientY - differenceInYPosition;
            setTopPositionCoordinate(changeInYPosition);
            setBottomPositionCoordinate(changeInYPosition + (bottomPositionCoordinate - topPositionCoordinate));
        }

        //prevents other items from becoming highlighted while the user drags the component
        const handlePreventHighlightingComponent = (event) => {
            event.preventDefault();
        }

        if (borderRef.current) {
            borderRef.current.addEventListener("mousedown", handleMouseDownBorder);
            borderRef.current.addEventListener("selectstart", handlePreventHighlightingComponent);
        }

        return () => {
            if (borderRef.current) {
                borderRef.current.removeEventListener("mousedown", handleMouseDownBorder);
                borderRef.current.removeEventListener("selectstart", handlePreventHighlightingComponent);
            }
        }
    }, [topPositionCoordinate, leftPositionCoordinate, bottomPositionCoordinate, rightPositionCoordinate])

    
    return ( 
        <div className="draggable-border-container">
            <div
                ref={borderRef}
                tabIndex={"1"}
                onKeyDown={(event) => handleKeyDownDeleteItem(event, id)}
                style={{
                    position: 'absolute',
                    top: topPositionCoordinate - 3,
                    left: leftPositionCoordinate - 3,
                    border:((textboxBorderRef === borderRef) && displayCustomizationBar) ? '1.5px dashed gray' : 'none',
                    width: 152,
                    height: 40,
                    cursor: 'move'
                }}
            />
                <WrappedComponent 
                    ref={componentRef}
                    borderRef={borderRef}
                    leftPositionCoordinate={leftPositionCoordinate}  
                    topPositionCoordinate={topPositionCoordinate} 
                    setTopPositionCoordinate={setTopPositionCoordinate}
                    setLeftPositionCoordinate={setLeftPositionCoordinate}
                    setBottomPositionCoordinate={setBottomPositionCoordinate}
                    setRightPositionCoordinate={setRightPositionCoordinate}
                    setTextboxRef={setTextboxRef}
                    setTextboxBorderRef={setTextboxBorderRef}
                    displayCustomizationBar={displayCustomizationBar}
                /> 
        </div>
    );
}
 
export default DraggableBorderContainer;
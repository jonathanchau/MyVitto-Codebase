import {useEffect} from "react";

const DraggableContainer = ({id, WrappedComponent, borderRef, topPositionCoordinate, setTopPositionCoordinate, leftPositionCoordinate, setLeftPositionCoordinate, bottomPositionCoordinate, 
                        setBottomPositionCoordinate, rightPositionCoordinate, setRightPositionCoordinate, componentRef, imageFile, handleKeyDownDeleteItem, isQrCode}) => {
    
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
                const componentItem = borderRef.current;
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

            //prevents the component from highlighting whenever the user drags
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
        <div
            className='draggable-container'
            ref={borderRef}
            tabIndex={"1"}
            onKeyDown={(event) => {
                if (!isQrCode) {
                    handleKeyDownDeleteItem(event, id);
                }
            }}
            style={{
                border: 'none',
                backgroundColor: 'none',
                position: 'absolute',
                top: topPositionCoordinate - 3, 
                left: leftPositionCoordinate - 3,
                outline: 'none',
                resize: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //boxSizing: isQrCode ? "border-box" : "content-box"
            }}
        >
            <WrappedComponent
                ref={componentRef}
                imageFile={imageFile}
                setLeftPositionCoordinate={setLeftPositionCoordinate}
                setRightPositionCoordinate={setRightPositionCoordinate}
                setTopPositionCoordinate={setTopPositionCoordinate}
                setBottomPositionCoordinate={setBottomPositionCoordinate}
                topPositionCoordinate={topPositionCoordinate}
                leftPositionCoordinate={leftPositionCoordinate}
                borderRef={borderRef}
            />
        </div> 
    );
}
 
export default DraggableContainer;
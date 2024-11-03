const ResizingVertex = ({vertexRef, cursorType, xCoordinate, yCoordinate, wrappedComponentId, handleKeyDownDeleteItem}) => {
            
    return ( 
        <div className="vertex">
            <div 
                ref={vertexRef}
                tabIndex={"1"}
                onKeyDown={(event) => handleKeyDownDeleteItem(event, wrappedComponentId)}
                style={{
                    position: 'absolute',
                    top: yCoordinate,
                    left: xCoordinate,
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid gray',
                    cursor: cursorType
                }}
            />
        </div>
     );
}

export default ResizingVertex;

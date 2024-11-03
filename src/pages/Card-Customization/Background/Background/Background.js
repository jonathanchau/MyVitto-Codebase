const Background = ({selectedBackgroundImage}) => {
    return (  
        <img
            alt={"not found"}
            width={"448px"}
            height={"925px"}
            src={URL.createObjectURL(selectedBackgroundImage)}
        />
    );
}
 
export default Background;
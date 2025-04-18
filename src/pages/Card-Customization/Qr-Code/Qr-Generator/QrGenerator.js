import React, {useState, useEffect} from 'react';
import './QrGenerator.css';
import InputArea from '../Input-Area/InputArea';
import AddInputAreaButton from '../Add-Input-Area-Button/AddInputAreaButton';
import DoneButton from '../Done-Button/DoneButton';

const QrGenerator = ({QrTabRef, setQrCodeIsOnScreen}) => {

    const [leftSideCoordinate, setLeftSideCoordinate] = useState(window.innerWidth / 2 + 300);
    const [arrayOfInputAreas, setArrayOfInputAreas] = useState([]);

    useEffect(() => {
        const changeLeftSideCoordinate = () => {
            setLeftSideCoordinate(window.innerWidth / 2 + 300);
        }

        window.addEventListener('resize', changeLeftSideCoordinate)

    return () => {
        window.removeEventListener('resize', changeLeftSideCoordinate)
    }
    
    }, [])

    return ( 
        <div 
            className="qr-generator qr-generator--size"
            ref={QrTabRef}
            style={{
                left: leftSideCoordinate
            }}>
            <div className="qr-generator__header qr-generator--position">
                QR Generator
            </div>
            <div className="qr-generator__tab qr-generator--position">
                <div className="qr-generator__tab__input-areas">
                    <InputArea/>
                    <InputArea/>
                    <InputArea/>
                    {arrayOfInputAreas.map((inputArea) => (
                        <InputArea
                            id={inputArea.id}
                        />
                    ))}
                    {(arrayOfInputAreas.length < 3) && (
                        <AddInputAreaButton
                            arrayOfInputAreas={arrayOfInputAreas}
                            setArrayOfInputAreas={setArrayOfInputAreas}
                        />
                    )}
                </div>
                <DoneButton
                    setQrCodeIsOnScreen={setQrCodeIsOnScreen}
                />
            </div>
        </div>
     );
}
 
export default QrGenerator;

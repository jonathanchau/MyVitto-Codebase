import React, {useState, useEffect} from 'react';
import './QrGenerator.css';
import InputArea from '../input-area/InputArea';
import AddInputAreaButton from '../add-input-area-button/AddInputAreaButton';
import DoneButton from '../done-button/DoneButton';

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
            className='qr-generator-tab-container'
            ref={QrTabRef}
            style={{
                left: leftSideCoordinate
            }}>
            <div className='qr-generator-header'>
                QR Generator
            </div>
            <div className="qr-generator-tab">
                <div className="qr-generator-tab__input-areas">
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

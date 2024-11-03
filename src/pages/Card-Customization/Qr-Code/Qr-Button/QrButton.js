import QRCode from 'react-qr-code';
import './QrButton.css';

const QrButton = ({setQrGeneratorIsDisplayed, qrGeneratorIsDisplayed}) => {

    const handleClickQrGeneratorButton = () => {
        if (qrGeneratorIsDisplayed) {
            setQrGeneratorIsDisplayed(false)
        }
        else {
            setQrGeneratorIsDisplayed(true)
        }
    }

    return ( 
        <div className="qr-button-container">
            <div 
                className="qr-button"
                onClick={handleClickQrGeneratorButton}
            >
                <QRCode
                    value="https://www.google.com"
                    style={{
                        width: "75%",
                        height: "75%",
                    }}
            />
            </div>
            <div className="qr-label">
                QR
            </div>
        </div>
     );
}
 
export default QrButton;

import './GoogleWalletButton.css'
import { useAuth } from '../../../services/AuthContext.js'
import addToGoogleWalletWidget from '../../../assets/enUS_add_to_google_wallet_add-wallet-badge.png'

function GoogleWalletButton() {
    const { saveToGoogleWalletLink, generateGoogleCard, } = useAuth();

    const handleGenerateGoogleCard = () => {
        generateGoogleCard();
        console.log(saveToGoogleWalletLink);
    }

    if (saveToGoogleWalletLink) {
        // Show a loading state until the URL is fetched
        return (<a href={saveToGoogleWalletLink}>
            <img src={addToGoogleWalletWidget} alt="Wallet Button" />
        </a>);
    }

    return (
        <div>
            <button className='generateGoogleWalletCard' onClick={handleGenerateGoogleCard}>Button</button>
        </div>
    );
}

export default GoogleWalletButton;
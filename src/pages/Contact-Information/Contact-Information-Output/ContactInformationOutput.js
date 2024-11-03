import './ContactInformationOutput.css';
import {useState} from 'react';

const ContactInformationOutput = () => {
    const [information, setInformation] = useState(null);

    return (  
        <div className="contact-information-output">
            <div className="contact-information-output__icon"/>
            <label className="contact-information-output__label">
                {information}
            </label>
        </div>
    );
}
 
export default ContactInformationOutput;
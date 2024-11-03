import React from 'react';
import './ContactUs.css';
import Navbar from "../../components/nav-bar/Navbar.js";

function ContactUs() {
    return (
        <div className="ContactUsPage">
            <Navbar />
            <div className="ContactUsBackground">
                <img src="/images/ContactUsBackground.png" alt="" className="platformStyle" />
            </div>

            <div className="ContactUsTitle">
                <h1 className="waveStyle">Contact Us</h1>
            </div>

            <div className="ContactUsLogo">
                <img src="/images/ContactUsLogo.png" alt="" className="platformStyle" />
            </div>

            <div className="ContactUsForm">
                {/* <form>
                    <input type="text" name="name" id="" placeholder="Enter name"/>
                    <input type="text" name="email" id="" placeholder="example@gmail.com"/>
                    <textarea name="message" id="" cols="30" rows="10" placeholder = "Type here..."/>
                    <button type="submit">Submit</button>
                </form> */}
                <form>
                    <div className="NameInput">
                        <label htmlFor="name">Name</label>
                        <input type="name" id="name" name="name" />
                    </div>

                    <div className="EmailInput">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>

                    <div className="TextInput">
                        <label htmlFor="message">Message</label>
                        <textarea id="text" name="message"></textarea>
                    </div>

                    <div className="SubmitButton">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;

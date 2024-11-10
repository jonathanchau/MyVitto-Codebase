import "./SettingsPage.css"
import UserInformation from "../User-Information/UserInformation.js"
import { useState } from "react"

function SettingsPage() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div className="settings">
            <div className="settings-header">
                <div className="settings-title">
                    <div className="settings-title-container">Settings</div>
                </div>
                <hr className="settings-divider" />
            </div>
            <div className="settings-container">
                <div className="settings-sidebar">
                    <div className="settings-links">
                        <p className={activeTab === 'tab1' ? 'active' : 'unactive'} onClick={() => setActiveTab('tab1')}>Account Change</p>
                        <p className={activeTab === 'tab2' ? 'active' : 'unactive'} onClick={() => setActiveTab('tab2')}>Example #2</p>
                        <p className={activeTab === 'tab3' ? 'active' : 'unactive'} onClick={() => setActiveTab('tab3')}>Example #3</p>
                    </div>
                    <hr className="settings-vertical-divider" />
                </div>
                <div className="settings-content">
                    {activeTab === 'tab1' && <UserInformation />}
                    {activeTab === 'tab2' && true} {/* placeholder for now */}
                    {activeTab === 'tab3' && true}
                </div>
            </div>
        </div>)
}

export default SettingsPage;
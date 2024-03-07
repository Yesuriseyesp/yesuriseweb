import React, { useState } from 'react';

export default function CookieConsentBanner() {
    const [consentGiven, setConsentGiven] = useState(localStorage.getItem('cookieConsent') === 'true');
    const [showModal, setShowModal] = useState(false);

    const handleAcceptCookies = () => {
        // Set a cookie to indicate that the user has accepted cookies
        localStorage.setItem('cookieConsent', 'true');
        setConsentGiven(true);
    };

    const handleRevokeConsent = () => {
        // Revoke consent by removing the cookie
        localStorage.removeItem('cookieConsent');
        setConsentGiven(false);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const cookieConsent = () => (
        <div style={cookieConsentStyle}>
            <p>This website uses cookies to ensure you get the best experience on our website.</p>
            <button style={buttonStyle} onClick={handleAcceptCookies}>Accept Cookies</button>
            {!consentGiven && <span style={manageCookiesStyle} onClick={toggleModal}>Manage Cookies</span>}
        </div>
    );

    return (
        <>
            {!consentGiven && showModal && <CookieConsentModal onClose={toggleModal} onRevokeConsent={handleRevokeConsent} />}
            {!consentGiven && cookieConsent()}
        </>
    );
}

const CookieConsentModal = ({ onClose, onRevokeConsent }) => {
    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h2>Cookie Settings</h2>
                <p>This website uses cookies to improve user experience. You can manage your cookie preferences below.</p>
                <div style={buttonContainerStyle}>
                    <button style={buttonStyle} onClick={onRevokeConsent}>Revoke Consent</button>
                    <button style={buttonStyle} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

const cookieConsentStyle = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: '999',
};

const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
};

const manageCookiesStyle = {
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
};

const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
};

const buttonContainerStyle = {
    marginTop: '20px',
};

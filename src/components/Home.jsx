import React, { useState } from 'react';
import '../assets/style.css';
import logo from '../assets/images/stormresq-logo.png';
import appStore from '../assets/images/app-store.png';
import playStore from '../assets/images/play-store.png';
import { Link } from 'react-router-dom';
import MailchimpForm from './MailchimpForm';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="splash-screen-wrapper">
        <div className="splash-screen">
        <div className="logo">
            <Link to="/">
            <img src={logo} alt="Logo" />
            </Link>
        </div>

        <div className="content">
            <h1>Be Ready Before the Storm Hits!</h1>
            <h2>
            StormResQ connects trained volunteer responders with people who need help during hurricanes and disasters.
            </h2>
            <p>
            The app matches rescue requests with verified teams on the ground, streamlining communication, improving coordination, and helping save lives when every second counts.
            </p>
             <p>
            Whether you're seeking help or ready to respond, StormResQ is the digital lifeline when disaster strikes.
            </p>
            <button className="rescue-btn" onClick={() => setShowModal(true)}>
            Subscribe for Alerts
            </button>

            <div className="app-downloads">
            <p className="app-downloads-text">
                Download the app to stay connected and receive real-time updates.<br></br>
                <span className='text-orange-500'>Coming Soon</span>
            </p>
            <div className="app-links">
                <a href="#" className="app-link">
                <img src={appStore} alt="App Store" />
                </a>
                <a href="#" className="app-link">
                <img src={playStore} alt="Play Store" />
                </a>
            </div>
            </div>
        </div>

        <footer className="footer-main">
            <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </div>
            <div className="copyright">
            <p>&copy; 2025 StormResQ. All rights reserved.</p>
            </div>
        </footer>

        {/* Mailchimp Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative shadow-md" style={{ borderRadius: '15px' }}>
                <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl close-mailchimp-modal"
                onClick={() => setShowModal(false)}
                >
                &times;
                </button>
                <MailchimpForm />
            </div>
            </div>
        )}
        </div>
    </div>
  );
};

export default Home;
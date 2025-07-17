import React from 'react';
import logo from '../assets/images/stormresq-logo.png';
import appStore from '../assets/images/app-store.png';
import playStore from '../assets/images/play-store.png';
import '../assets/style.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="splash-screen-wrapper">
        <div className="main">
        <div className="main-container">
            <div className="logo">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            </div>
            <div className="content-inner">
            <div className="page-heading">
                <h1>StormResQ™ Website Privacy Policy</h1>
            </div>
            <p><strong>Effective Date:</strong> June 17, 2025<br /><strong>Last Updated:</strong> June 17, 2025</p>
            <p>StormResQ™ (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, StormResQ.com.</p>
            <p>By using this website, you agree to the terms of this policy.</p>

            <div className="privacy-policy">
                <h4>1. Information We Collect</h4>
                <p>When you visit or interact with StormResQ.com, we may collect:</p>

                <p><strong>a. Personal Information You Provide</strong></p>
                <ul>
                <li>Name, email address, phone number</li>
                <li>Mailing address (optional)</li>
                <li>Volunteer or rescue assistance registration details</li>
                <li>Donation and payment information (if applicable)</li>
                <li>Any messages or content you submit via forms</li>
                </ul>

                <p><strong>b. Automatically Collected Information</strong></p>
                <ul>
                <li>IP address</li>
                <li>Browser type and operating system</li>
                <li>Pages viewed and time spent on the site</li>
                <li>Referring URL or search engine</li>
                <li>Cookies and similar tracking technologies</li>
                </ul>

                <h4>2. How We Use Your Information</h4>
                <ul>
                <li>Connect volunteers with people in need during disasters</li>
                <li>Respond to contact inquiries or assistance requests</li>
                <li>Send updates about rescue operations, events, or fundraising campaigns</li>
                <li>Process donations and provide receipts</li>
                <li>Improve website functionality and user experience</li>
                <li>Comply with legal or regulatory obligations</li>
                </ul>

                <h4>3. Cookies and Tracking Technologies</h4>
                <p>StormResQ.com uses cookies and similar technologies to:</p>
                <ul>
                <li>Analyze website traffic and trends</li>
                <li>Personalize your experience</li>
                <li>Improve performance and navigation</li>
                </ul>
                <p>You may disable cookies in your browser settings, but some features of the site may not function properly as a result.</p>

                <h4>4. Third-Party Services</h4>
                <p>We may share data with:</p>
                <ul>
                <li>Payment processors (e.g., Stripe, PayPal)</li>
                <li>Email communication platforms (e.g., Mailchimp)</li>
                <li>Web analytics providers (e.g., Google Analytics)</li>
                </ul>
                <p>These providers are bound by confidentiality and data security agreements.</p>
                <p>We do not sell, rent, or trade your personal information.</p>

                <h4>5. Data Security</h4>
                <p>We implement appropriate technical and organizational measures to protect your data. This includes secure server environments, SSL encryption, access controls, and data minimization practices. However, no online system can guarantee 100% security.</p>

                <h4>6. Your Rights and Choices</h4>
                <p>Depending on your location and applicable laws (e.g., CCPA or GDPR), you may have the right to:</p>
                <ul>
                <li>Access or update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Object to certain types of data processing</li>
                </ul>
                <p>To make a request, please contact us at <a href="mailto:info@hurricanehelpflorida.org">info@hurricanehelpflorida.org</a>.</p>

                <h4>7. Email and Text Communication</h4>
                <p>By submitting your contact details, you consent to receive messages related to:</p>
                <ul>
                <li>Volunteer opportunities</li>
                <li>Rescue efforts</li>
                <li>Fundraising campaigns and events</li>
                </ul>
                <p>You may unsubscribe at any time by clicking the link in the email or replying “STOP” to texts. Message and data rates may apply.</p>

                <h4>8. Children’s Privacy</h4>
                <p>StormResQ.com is not intended for use by children under 13. We do not knowingly collect data from children. If we learn we’ve collected such data, we will promptly delete it.</p>

                <h4>9. External Links</h4>
                <p>Our website may include links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please review their policies before submitting any personal data.</p>

                <h4>10. Policy Updates</h4>
                <p>We may revise this Privacy Policy from time to time. When we do, we will update the "Effective Date" at the top of this page. Your continued use of the site indicates your acceptance of any updates.</p>

                <h4>11. Contact Us</h4>
                <p>If you have any questions or wish to exercise your rights under this policy, please contact us:</p>
                <p><strong>StormResQ™</strong><br />
                Operated by Global Hope Collective dba Hurricane Help Florida<br />
                📧 Email: <a href="mailto:info@hurricanehelpflorida.org">info@hurricanehelpflorida.org</a><br />
                📞 Phone: 813-485-6949<br />
                🌐 Website: <a href="https://www.hurricanehelpflorida.org" target="_blank" rel="noopener noreferrer">www.hurricanehelpflorida.org</a>
                </p>
            </div>
            </div>

            <footer className="footer-main">
            <div className="app-downloads">
                <p className="app-downloads-text">
                Download the app to stay connected and receive real-time updates.
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
            <div className="footer-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </div>
            <div className="copyright">
                <p>&copy; 2025 StormResQ. All rights reserved.</p>
            </div>
            </footer>
        </div>
        </div>
    </div>
  );
};

export default PrivacyPolicy;
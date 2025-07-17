import React from 'react';
import logo from '../assets/images/stormresq-logo.png';
import appStore from '../assets/images/app-store.png';
import playStore from '../assets/images/play-store.png';
import '../assets/style.css';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <div className="splash-screen-wrapper">
        <div className="main">
            <div className="main-container">
                <div className="logo">
                <a href="/">
                    <img src={logo} alt="Logo" />
                </a>
                </div>
                <div className="content-inner">
                <div className="page-heading">
                    <h1>StormResQ™ Terms and Conditions</h1>
                </div>
                <p>
                    Welcome to StormResQ™. By accessing or using our website or mobile application,
                    you agree to comply with and be bound by the following Terms and Conditions. Please read these terms
                    carefully. If you do not agree with any part of these terms, you should not use our platform.
                </p>

                <div className="terms-and-privacy">
                    <h4>1. General Information</h4>
                    <p>
                    StormResQ™ is a volunteer-based, community-driven platform that connects individuals and
                    communities affected by disasters with volunteers and resources. We are an independent entity and are not
                    affiliated with any government agency.
                    </p>

                    <h4>2. Use of the Website and App</h4>
                    <p>By using this platform, you agree to:</p>
                    <ul>
                    <li>Only use the platform for lawful purposes.</li>
                    <li>Refrain from engaging in any activity that could damage or interfere with the website’s or app’s functionality or security.</li>
                    <li>Not impersonate any person or entity or misrepresent your affiliation with any other person or entity.</li>
                    <li>Not post or transmit any harmful, offensive, or unlawful content.</li>
                    </ul>

                    <h4>3. Volunteering and Donations</h4>
                    <p>
                    StormResQ™ facilitates connections between volunteers and those in need. However, we do not guarantee
                    the success, outcome, or safety of volunteer activities.
                    </p>
                    <p>
                    Volunteers engage in activities at their own risk, and StormResQ™ (operated by Global Hope Collective
                    dba Hurricane Help Florida) and its affiliates are not liable for any injuries, losses, or damages incurred
                    during or as a result of volunteer efforts.
                    </p>
                    <p>
                    Any donations made through the platform are used at the discretion of StormResQ™ to further our
                    mission of providing disaster relief. Donations are non-refundable unless required by law.
                    </p>

                    <h4>4. User Content</h4>
                    <p>
                    If you submit any content (including but not limited to text, photos, or videos) to StormResQ™, you grant
                    us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and
                    distribute such content in connection with our services. You retain ownership of your content but agree to
                    this license for the purposes of promoting and operating our services.
                    </p>

                    <h4>5. Third-Party Links</h4>
                    <p>
                    StormResQ™ may provide links to third-party websites for informational purposes. We are not responsible
                    for the content or privacy practices of these websites. Your use of third-party websites is at your own
                    risk, and we encourage you to review the terms and conditions of those sites.
                    </p>

                    <h4>6. Limitation of Liability</h4>
                    <p>
                    StormResQ™, its affiliates, volunteers, or contributors will not be liable for any direct, indirect,
                    incidental, consequential, or punitive damages arising from your use of the platform or any services
                    offered. This includes, but is not limited to, damages for loss of profits, goodwill, data, or other
                    intangible losses.
                    </p>

                    <h4>7. Indemnification</h4>
                    <p>
                    You agree to indemnify, defend, and hold harmless StormResQ™ and its officers, employees, volunteers,
                    and affiliates from any claims, liabilities, damages, losses, or expenses, including reasonable attorneys’
                    fees, arising from your use of the platform, your violation of these Terms and Conditions, or your
                    violation of any rights of another.
                    </p>

                    <h4>8. Consent to Receive Communication via Text (TCPA Compliance)</h4>
                    <p>
                    By submitting your contact information, you expressly consent to receive communication from StormResQ™
                    and its affiliates via automated or non-automated text messages, phone calls, and emails. These
                    communications may include information regarding volunteer opportunities, event updates, donation
                    requests, and disaster relief activities.
                    </p>
                    <p>You acknowledge and understand that:</p>
                    <ul>
                    <li>Consent is not a condition of purchase.</li>
                    <li>Message and data rates may apply.</li>
                    <li>You may opt-out at any time by replying "STOP".</li>
                    <li>
                        For help, reply "HELP" or contact us at <a href="mailto:info@hurricanehelpflorida.org">info@hurricanehelpflorida.org</a>.
                    </li>
                    </ul>

                    <h4>9. Changes to the Terms and Conditions</h4>
                    <p>
                    StormResQ™ reserves the right to modify these Terms and Conditions at any time. Continued use of the
                    platform after any changes constitutes acceptance of the new Terms and Conditions.
                    </p>

                    <h4>10. Governing Law</h4>
                    <p>
                    These Terms are governed by the laws of the State of Florida. Any disputes shall be subject to the
                    exclusive jurisdiction of the courts in Florida.
                    </p>

                    <h4>11. Contact Us</h4>
                    <p>
                    Email: <a href="mailto:info@hurricanehelpflorida.org">info@hurricanehelpflorida.org</a><br />
                    Phone: 813-485-6949<br />
                    Website: <a href="https://www.hurricanehelpflorida.org" target="_blank" rel="noopener noreferrer">www.hurricanehelpflorida.org</a>
                    </p>

                    <h4>StormResQ™ Privacy Policy</h4>
                    <p>
                    At StormResQ™, we are committed to protecting your privacy. This policy explains how we collect, use,
                    and safeguard your personal information when you use our services.
                    </p>

                    <h4>1. Information We Collect</h4>
                    <p>We may collect personal information when you:</p>
                    <ul>
                    <li>Sign up as a volunteer</li>
                    <li>Request assistance</li>
                    <li>Make a donation</li>
                    <li>Subscribe to communications</li>
                    <li>Contact us for support</li>
                    </ul>
                    <p>Types of data include:</p>
                    <ul>
                    <li>Contact info (name, email, phone, address)</li>
                    <li>Payment/donation details</li>
                    <li>Communication preferences</li>
                    <li>Volunteer or rescue request information</li>
                    </ul>

                    <h4>2. How We Use Your Information</h4>
                    <p>We use your information to:</p>
                    <ul>
                    <li>Connect you with resources and opportunities</li>
                    <li>Send updates and event information</li>
                    <li>Process donations and provide receipts</li>
                    <li>Improve our services and platform</li>
                    <li>Comply with legal obligations</li>
                    </ul>

                    <h4>3. Sharing Your Information</h4>
                    <p>We do not sell or rent your information. We may share it with:</p>
                    <ul>
                    <li>Service providers (bound by confidentiality)</li>
                    <li>Law enforcement (when required)</li>
                    <li>Partner nonprofits (with your consent)</li>
                    </ul>

                    <h4>4. Cookies and Tracking</h4>
                    <p>We use cookies to:</p>
                    <ul>
                    <li>Track site usage (analytics)</li>
                    <li>Remember preferences</li>
                    </ul>
                    <p>You can disable cookies via your browser, though some features may not function properly.</p>

                    <h4>5. Your Rights</h4>
                    <p>You can:</p>
                    <ul>
                    <li>Unsubscribe from communications</li>
                    <li>Request access or corrections to your data</li>
                    <li>Ask us to delete your data (subject to legal obligations)</li>
                    </ul>

                    <h4>6. Data Security</h4>
                    <p>We use industry-standard practices to protect your data, but no system is 100% secure.</p>

                    <h4>7. Children’s Privacy</h4>
                    <p>We do not knowingly collect information from children under 13. If we learn we have, we will delete it.</p>

                    <h4>8. Third-Party Links</h4>
                    <p>
                    Our platform may contain links to third-party sites. We are not responsible for their content or privacy
                    practices.
                    </p>

                    <h4>9. Updates to This Policy</h4>
                    <p>
                    We may update this policy periodically. The "Effective Date" will reflect the most recent changes.
                    </p>

                    <h4>10. Contact Us</h4>
                    <p>
                        Global Hope Collective dba Hurricane Help Florida<br />
                        Email: <a href="mailto:info@hurricanehelpflorida.org">info@hurricanehelpflorida.org</a><br />
                        Phone: 813-485-6949<br />
                        Website: <a href="https://www.hurricanehelpflorida.org" target="_blank" rel="noopener noreferrer">www.hurricanehelpflorida.org</a>
                    </p>
                    <p style={{ marginTop: '30px' }} >
                        <strong>Effective Date:</strong> October 9, 2024<br />
                        <strong>Updated:</strong> June 17, 2025
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
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms and Conditions</Link>
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

export default TermsConditions;
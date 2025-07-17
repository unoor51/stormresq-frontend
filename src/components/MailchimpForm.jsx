import React from 'react';
// import '../assets/style.css'; // Copy classic-061523.css from Mailchimp and rename as mailchimp.css

const MailchimpForm = () => {
  return (
    <div id="mc_embed_signup" className="bg-white p-6 rounded-md max-w-xl w-full mx-auto">
    <form
        action="https://hurricanehelpflorida.us7.list-manage.com/subscribe/post?u=4b8e4ceeabc2554b6d3bf0ced&amp;id=12dfa912db&amp;f_id=00a5b7e1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
    >
        <div id="mc_embed_signup_scroll">
        <h2 className="text-2xl font-bold mb-1 text-center text-orange-500">Subscribe</h2>
        <div className="indicates-required text-sm text-gray-600 mb-1">
            <span className="asterisk text-red-500">*</span> indicates required
        </div>
        <div className="mc-field-group mb-6">
            <label htmlFor="mce-FNAME" className="block font-medium mb-1 text-gray-600 text-left">
            First Name
            </label>
            <input
            type="text"
            name="FNAME"
            className="text w-full border border-gray-300 rounded px-3 py-2"
            id="mce-FNAME"
            />
        </div>
        <div className="mc-field-group mb-6">
            <label htmlFor="mce-EMAIL" className="block font-medium mb-1 text-gray-600 text-left">
            Email Address <span className="asterisk text-red-500">*</span>
            </label>
            <input
            type="email"
            name="EMAIL"
            className="required email w-full border border-gray-300 rounded px-3 py-2"
            id="mce-EMAIL"
            required
            />
        </div>
        <div id="mce-responses" className="clear mb-4">
            <div className="response text-red-500 text-sm" id="mce-error-response" style={{ display: 'none' }}></div>
            <div className="response text-green-600 text-sm" id="mce-success-response" style={{ display: 'none' }}></div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
            <input
            type="text"
            name="b_4b8e4ceeabc2554b6d3bf0ced_12dfa912db"
            tabIndex="-1"
            defaultValue=""
            readOnly
            />
        </div>
        <div className="clear">
            <input
            type="submit"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="button bg-orange-500 text-white font-semibold px-6 py-2 rounded w-full"
            value="Subscribe"
            />
        </div>
        </div>
    </form>
    </div>

  );
};

export default MailchimpForm;
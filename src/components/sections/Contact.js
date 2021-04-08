import React, {useState} from "react";
import LoadingOverlay from 'react-loading-overlay';
import { env } from '../../config';
import styled, { css } from "styled-components";
import useValidator from './useValidator'

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

function Contact() {

    const [from_name, setFromName] = useState('');
    const [from_email, setFromEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);
    const [show, setShow] = useState(false)
    const [loader, setLoader] = useState(false)
    const [validator, showValidationMessage] = useValidator()

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleNameChange = (event) => {
        setFromName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setFromEmail(event.target.value);
    }

    const handleClick = () => {
      setShow(false)
    };

    const handleSubmit = (event) => {
      if (validator.allValid()) {
        event.preventDefault();
        setLoader(true)
        const {
          REACT_APP_EMAILJS_RECEIVER: receiverEmail,
          REACT_APP_EMAILJS_TEMPLATEID: templateId,
          REACT_APP_EMAILJS_USERID: user,
        } = env;
    
        sendFeedback({
          templateId,
          from_email,
          receiverEmail,
          from_name,
          message,
          user,
        });
        setFormSubmitted(true);
      } else {
        showValidationMessage(true);
      }
      };
    
      // Note: this is using default_service, which will map to whatever
      // default email provider you've set in your EmailJS account.
      const sendFeedback = ({
        templateId,
        from_email,
        receiverEmail,
        from_name,
          message,
        user,
      }) => {
        window.emailjs
          .send(
            'default_service',
            templateId,
            {
              from_email,
              receiverEmail,
              from_name,
              message,
            },
            user
          )
          .then((res) => {
            if (res.status === 200) {
              setLoader(false)
              setFromEmail('')
              setFromName('')
              setMessage('')
              setFormSubmitSuccessful(true);
              setShow(true)

            }
          })
          // Handle errors here however you like
          .catch((err) => console.error('Failed to send feedback. Error: ', err));
      };

  return (
    <>
    <DarkBackground disappear={loader}>
        <LoadingOverlay
          active={true}
          spinner={true}
          text="Processing your request..."
        >
        </LoadingOverlay>
      </DarkBackground>
    <div className="section contact" id="contact">
        <div className="container">
          <div
            className="columns is-multiline"
            data-aos="fade-in-up"
            data-aos-easing="linear"
          >
            <div className="column is-12 about-me">
              <h1 className="title has-text-centered section-title">
                Get in touch
              </h1>
            </div>
            <div className="column is-8 is-offset-2">
              
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Ex. Jane Smith"
                      name="from_name"
                      onChange={handleNameChange}
                      value={from_name}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  {validator.message("from_name", from_name, "required|alpha_num_dash_space|max:100", {
        messages: {
          required: "Name is required",
          alpha_num_dash_space: 'Please enter valid name',
          max: 'Name may not be greater than 500 characters'
        },
      }, { className: 'text-danger' })}
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      placeholder="Ex. hello@arctheme.com"
                      name="from_email"
                      onChange={handleEmailChange}
                      value={from_email}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  {validator.message("from_email", from_email, "required|email|max:100", {
        messages: {
          required: "Email is required",
          email: 'Please enter valid email',
          max: 'Email may not be greater than 100 characters'
        },
      }, { className: 'text-danger' })}
                </div>
                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      placeholder="Message"
                      name="message"
                      onChange={handleMessageChange}
                      value={message}
                    ></textarea>
                  </div>
                  {validator.message("message", message, "required|max:500", {
        messages: {
          required: "Message is required",
          max: 'Message may not be greater than 100 characters'
        },
      }, { className: 'text-danger' })}
                </div>
                <div className="field">
                  <div className="control ">
                    <button type='submit' className="button submit-button"  onClick={handleSubmit}>
                      Submit&nbsp;&nbsp;
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              
            </div>
          </div>
        </div>

        {(formSubmitted && formSubmitSuccessful) && <div className={`modal ${show ? 'is-active' : ''}`}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Success</p>
      <button className="delete" aria-label="close" onClick={handleClick}></button>
    </header>
    <section className="modal-card-body">
     Thank you for submitting request. We will get back to you soon.
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success" onClick={handleClick}>OK</button>
    </footer>
  </div>
</div>}
      </div>
      </>
  );
}

export default Contact;

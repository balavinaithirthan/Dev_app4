import React, { useReducer, useState } from "react";
import "./App.css";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm("gmail", "template_a", e.target, "4lXtH-y0vGoVup4mC").then(
    (result) => {
      console.log(result.text);
    },
    (error) => {
      console.log(error.text);
    }
  );
};

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      name: " ",
      contactNumber: " ",
      email: " ",
      comments: " ",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [readText, setreadText] = useState(false);

  function onChange(value) {
    // console.log("Captcha value:", value);
    setSubmitting(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setFormData({
        reset: true,
      });
      emailjs
        .sendForm("gmail", "template_a", event.target, "4lXtH-y0vGoVup4mC")
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }, 3000);
    <p>Submitting Now</p>;
    setSubmitting(false);
    setreadText(true);
  };

  const handleChange = (event) => {
    setSubmitting(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className="banner">
        <div className="home"></div>
        <div className="content">
          <h1>Senthil's Taxi Service </h1>
          {/* <h3>
            I provide premium driving services in Chennai and entire Tamil Nadu.
          </h3> */}
          <div className="number">
            <a href="tel:123-456-7890">CLICK TO CALL</a>
          </div>
        </div>
        <div className="wrapper">
          {/* {submitting && (
        <div>
          Submitting form now...
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )} */}
          <form onSubmit={handleSubmit}>
            <div className="fieldset">
              <h2>Request A Taxi</h2>
              <label>
                <p>Name</p>
              </label>
              <input
                placeholder="Ex: Ram"
                name="name"
                onChange={handleChange}
                value={formData.name || ""}
              />
              <label>
                <p>Number</p>
              </label>
              <input
                type="tel"
                placeholder="Ex: +1 (123) 456-7890"
                name="contactNumber"
                onChange={handleChange}
                value={formData.contactNumber || ""}
              />
              <label>
                <p>Pick up location</p>
              </label>
              <input
                placeholder="Address"
                name="email"
                onChange={handleChange}
                value={formData.email || ""}
              />
              <label>
                <p>Destination</p>
              </label>
              <input
                placeholder="Address"
                name="comments"
                onChange={handleChange}
                value={formData.comments}
              />
            </div>
            {/* <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
            /> */}

            <button type="submit" disabled={!submitting}>
              <span></span>
              Submit
            </button>
            {readText && <h5>Submitted! Refresh to submit again...</h5>}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

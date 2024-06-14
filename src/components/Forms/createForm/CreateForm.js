import React, { useState } from "react";

import styles from "../signin/signinform.module.css";
const CreateForm = (props) => {
  const { onCreateClick } = props;
  const {isMultiPage} = props;
  console.log("isMultiPage", isMultiPage);
  const [formname, setFormName] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [showRedirectLink, setShowRedirectLink] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const finalRedirectLink = showRedirectLink ? redirectLink : "";
      onCreateClick(formname, finalRedirectLink, showThankYou, showProgressBar);
      console.log("formname", formname);
      console.log("finalredirectLink", finalRedirectLink);
      console.log("showThankYou", showThankYou);
    } catch (error) {
      console.error(error);
      alert("Failed to create form");
    }
  };

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
  };

  const handleThankYouChange = (e) => {
    setShowThankYou(e.target.checked);
  };

  const handleRedirectLinkChange = (e) => {
    setRedirectLink(e.target.value);
  };

  const handleProgressBarChange = (e) => {
    setShowProgressBar(e.target.checked);
  };

  const handleShowRedirectChange = (e) => {
    setShowRedirectLink(e.target.checked);
  };

  return (
    <div className={styles.signin_card}>
      <form onSubmit={submitForm}>
        <div className={styles["input-text"]}>
          Form Name
          <input
            className="m-2"
            type="text"
            placeholder="Form Name"
            name="formName"
            value={formname}
            onChange={handleFormNameChange}
            required
          />
        </div>

        {isMultiPage && (
          <div className={styles["input-checkbox"]}>
            <label>
              <input
                type="checkbox"
                checked={showProgressBar}
                onChange={handleProgressBarChange}
                className="m-2"
              />
              Show Progress Bar
            </label>
          </div>
        )}

        <div className={styles["input-checkbox"]}>
          <label>
            <input
              type="checkbox"
              checked={showThankYou}
              onChange={handleThankYouChange}
              className="m-2"
            />
            Show Thank You Message
          </label>
        </div>

        <div className={styles["input-checkbox"]}>
          <label>
            <input
              type="checkbox"
              checked={showRedirectLink}
              onChange={handleShowRedirectChange}
              className="m-2"
            />
            Custom Redirect Link
          </label>
        </div>

        {showRedirectLink && (
          <div className={styles["input-text"]}>
            Redirect Link after Submission
            <input
              className="m-2"
              type="text"
              placeholder="Redirect Link"
              name="redirectLink"
              value={redirectLink}
              onChange={handleRedirectLinkChange}
            />
          </div>
        )}

        <div className={styles.buttons}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;

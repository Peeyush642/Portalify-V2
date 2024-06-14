"use client";
import { React, useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import { v4 as uuid } from "uuid";
import thankYou from "@/assets/thankYou.json";
import formClosed from "@/assets/formClosed.json";
import Lottie from "lottie-react";
import styles from "./formPreview.module.css";
import { uploadImageCloudinary } from "@/utils/fileupload";
import Logo from "@/assets/logos/new-logo-white.png";
import ICON from "@/assets/logos/icon-black.png";
import { LinearProgress, Button, Box } from "@mui/material";
import logoWhite from "@/assets/logos/Logo-white.png";
import Image from "next/image";
import bg1 from "@/assets/formBg/bg1.jpg";
import bg2 from "@/assets/formBg/bg2.jpg";
import bg3 from "@/assets/formBg/bg3.jpg";
import bg4 from "@/assets/formBg/bg4.jpg";
import bg5 from "@/assets/formBg/bg5.jpg";
import bg6 from "@/assets/formBg/bg6.jpg";
const width = { width: "70%", display: "flex", justifyContent: "center" };
const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6];
// const backgroundImages = [
// "../../../assets/formBg/bg1.jpg",
// "../../../assets/formBg/bg2.jpg",
// "../../../assets/formBg/bg3.jpg",
// "../../../assets/formBg/bg4.jpg",
// "../../../assets/formBg/bg5.jpg",
// "../../../assets/formBg/bg6.jpg",];
const Page = ({ params }) => {
  const formID = params.formid;
  const [formData, setFormData] = useState([]);
  const [state, setState] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showSubmissionClosedMessage, setShowSubmissionClosedMessage] =
    useState(false);
  const [redirect, setRedirect] = useState(false);
  let storedFormResponse = "";
   if (typeof window !== "undefined") {
    storedFormResponse = localStorage.getItem("formResponse") || "";
  }
  const initialFormResponse = storedFormResponse
    ? JSON.parse(storedFormResponse)
    : { formID: formID, responseID: uuid(), responseData: [] };
  const [progress, setProgress] = useState(0);
  const [formResponse, setFormResponse] = useState(initialFormResponse);
  const [currentPage, setCurrentPage] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const getRandomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return `url(${backgroundImages[randomIndex]})`;
  };

  const [isMultipage, setIsMultipage] = useState(false);

  useEffect(() => {
    const firstPage = Object.keys(state)[0];
    setCurrentPage(firstPage);
    setIsMultipage(Object.keys(state).length > 1);
  }, [state]);

  console.log("currentPage", currentPage);
  const [backgroundImage, setBackgroundImage] = useState(
    getRandomBackgroundImage()
  );

  //id, label value, input value

  useEffect(() => {
    AuthService.getFormById(formID)
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        const form = response.data.form;
        const currentVersionData = form.versionData.find(entry => entry.version === form.currentVersion);
        if (currentVersionData) {
          setFormData(form);
          setState(JSON.parse(currentVersionData.data));
          setBackgroundImage(getRandomBackgroundImage());
          if (form.isPublished === false) {
            alert("Form is not published yet");
            window.location.href = "/";
          }
        } else {
          console.error("Current version data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, []);
  
  console.log("formData", formData);
  

  const closeShowSubmissionModel = () => {
    setShowSubmissionClosedMessage(false);
  };

  const showProgressBar = formData.showProgressBar;

  const handleResponseSubmission = async (event) => {
    event.preventDefault();
    const form = event.target;
    formResponse.formID = form.id;

    if (!formData.submissions) {
      setShowSubmissionClosedMessage(true);
      return;
    }

    const data = [];

    const parentElements = form.querySelectorAll(".htmlContentParent");
    const multiParentElement = form.querySelectorAll(".htmlContentWhole");

    for (const parent of parentElements) {
      const label = parent.querySelector("#label_value");
      const input = parent.querySelector("#input_value");

      if (label && input && input.type === "file") {
        //for file/image attachments
        const fieldId = parent.id;
        const labelValue = label.textContent.trim();
        const cloudinaryLink = await uploadImageCloudinary(input.files[0]);


        const obj = {
          field_id: fieldId,
          label_value: labelValue,
          input_value: cloudinaryLink,
        };

        data.push(obj);
      } else if (label && input) {
        const labelValue = label.textContent.trim();
        const fieldId = parent.id;
        const inputValue = input.value;

        const obj = {
          field_id: fieldId,
          label_value: labelValue,
          input_value: inputValue,
        };

        data.push(obj);
      } else {
        // Handle error in file upload to Cloudinary
        console.error("Error uploading file to Cloudinary");
      }
    }

    multiParentElement.forEach((parent, index) => {
      const heading = parent.querySelector("#heading_value");
      const label = parent.querySelector("#label_value");
      const input = parent.querySelector("#input_value");

      if (input) {
        const headingValue = heading.textContent.trim();
        const fieldId = parent.id;
        let inputValue;
        if (input.type === "checkbox") {
          // Collect the values of checked checkboxes as an array
          const checkboxes = parent.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          inputValue = Array.from(checkboxes, (checkbox) => checkbox.value);
        } else if (input.type === "radio") {
          // Get the value of the selected radio button
          const selectedRadio = parent.querySelector(
            'input[type="radio"]:checked'
          );
          inputValue = selectedRadio ? selectedRadio.value : null;
        } else if (input.tagName === "SELECT") {
          inputValue = input.value;
        } else {
          inputValue = input.value;
        }

        const obj = {
          field_id: fieldId,
          label_value: headingValue,
          input_value: inputValue,
        };
        data.push(obj);
      }
    });

    data.forEach((item) => {
      formResponse.responseData.push(item);
    });

    AuthService.addFormResponse(formResponse)
      .then((response) => {
        console.log(response);
        // alert("Form response submitted successfully!");
        setFormSubmitted(true);
        localStorage.removeItem("formResponse");
        setTimeout(() => {
          if (formData.redirectLink) {
            setRedirect(true);
            window.location.href = formData.redirectLink;
          }
        }, 5000);
      })
      .catch((error) => {
        console.error("Error submitting form response:", error);
      });
  };

  window.handleBuilderPreviousClick = () => {
    const currentPages = Object.keys(state);
    const currentIndex = currentPages.indexOf(currentPage);

    if (currentIndex > 0) {
      const previousPage = currentPages[currentIndex - 1];
      setCurrentPage(previousPage);
      setProgress((currentIndex - 1) * (100 / currentPages.length));
    }
  };

  window.handleBuilderNextClick = async () => {
    const currentPages = Object.keys(state);
    const currentIndex = currentPages.indexOf(currentPage);
    const form = document.getElementById(formID);
    formResponse.formID = form.id;

    const data = [];
    const parentElements = form.querySelectorAll(".htmlContentParent");
    const multiParentElement = form.querySelectorAll(".htmlContentWhole");

    console.log(parentElements, multiParentElement);

    for (const parent of parentElements) {
      const label = parent.querySelector("#label_value");
      const input = parent.querySelector("#input_value");

      if (label && input && input.type === "file") {
        //for file/image attachments
        const fieldId = parent.id;
        const labelValue = label.textContent.trim();
        const cloudinaryLink = await uploadImageCloudinary(input.files[0]);
        const obj = {
          field_id: fieldId,
          label_value: labelValue,
          input_value: cloudinaryLink,
        };

        data.push(obj);
      } else if (label && input) {
        const labelValue = label.textContent.trim();
        const fieldId = parent.id;
        const inputValue = input.value;

        const obj = {
          field_id: fieldId,
          label_value: labelValue,
          input_value: inputValue,
        };
        data.push(obj);
      } else {
        // Handle error in file upload to Cloudinary
        console.error("Error uploading file to Cloudinary");
      }
    }

    for (const parent of multiParentElement) {
      const heading = parent.querySelector("#heading_value");
      const label = parent.querySelector("#label_value");
      const input = parent.querySelector("#input_value");

      console.log("input", input);

      if (input) {
        const headingValue = heading.textContent.trim();
        const fieldId = parent.id;
        let inputValue;
        if (input.type === "checkbox") {
          // Collect the values of checked checkboxes as an array
          const checkboxes = parent.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          inputValue = Array.from(checkboxes, (checkbox) => checkbox.value);
        } else if (input.type === "radio") {
          // Get the value of the selected radio button
          const selectedRadio = parent.querySelector(
            'input[type="radio"]:checked'
          );
          inputValue = selectedRadio ? selectedRadio.value : null;
        } else if (input.tagName === "SELECT") {
          inputValue = input.value;
        } else {
          inputValue = input.value;
        }

        const obj = {
          field_id: fieldId,
          label_value: headingValue,
          input_value: inputValue,
        };
        console.log("obj", obj);
        data.push(obj);
      }
    }

    data.forEach((item) => {
      formResponse.responseData.push(item);
    });

    localStorage.setItem("formResponse", JSON.stringify(formResponse));
    setFormResponse({ ...formResponse });

    if (formData.isPartialResp) {
      // Call the API for form submission
      AuthService.addFormResponse(formResponse)
        .then((response) => {
          console.log("Partial Response updated", response);
          localStorage.removeItem("formResponse");
        })
        .catch((error) => {
          console.error("Error submitting form response:", error);
        });
    }

    if (currentIndex < currentPages.length - 1) {
      const nextPage = currentPages[currentIndex + 1];
      setCurrentPage(nextPage);
      setProgress((currentIndex + 1) * (100 / currentPages.length));
    }
  };

  console.log("formResponseMain", formResponse);

  return (
    <section
      className={styles.formPreviewContainer}
      style={{ backgroundImage: backgroundImage }}
    >
      {showSubmissionClosedMessage && !formData.submissions && (
        <div className={styles.notAccepting}>
          <Lottie
            style={{ width: "20rem", height: "20rem" }}
            animationData={formClosed}
            duration={2000}
            loop={false}
          />
          <span className={styles.thankyouText}>
            Form is currently not accepting responses. Check again later.
          </span>
          <Button
            onClick={closeShowSubmissionModel}
            sx={{ marginTop: "10px" }}
            color="error"
            variant="contained"
          >
            Close
          </Button>
        </div>
      )}
      {formSubmitted && formData.showThankYou ? (
        <div className={styles.thankYou}>
          <div className={styles.thankYouAnimation}>
            <Lottie
              style={{ width: "20rem", height: "20rem" }}
              animationData={thankYou}
              duration={2000}
              loop={false}
            />
          </div>
          <span className={styles.thankyouText}>
            Your form is submitted successfully
          </span>
        </div>
      ) : (
        <form
          className={styles.previewForm}
          key={formID}
          id={formID}
          style={width}
          onSubmit={handleResponseSubmission}
        >
          {showProgressBar && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: "6px" }}
            />
          )}
          {state &&
            Object.keys(state).map((key) => {
              const elements = state[key]?.children;
              const globalStyling = state[key]?.htmlContent;
              console.log("elements =>>>>>>>>>>>>", elements, globalStyling);

              // Only render elements for the current page
              if (key === currentPage) {
                return (
                  <div key={key} id="globalStyling" style={globalStyling}>
                    {elements.map((element, index) => (
                      <div
                        style={{ padding: "3px" }}
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: element.htmlContent,
                        }}
                      />
                    ))}
                  </div>
                );
              }

              return null; // Return null for pages other than the current page
            })}
        </form>
      )}

      <div className={styles.branding}>
        <div className={styles.brandingLogo}>
          <Image
            src={Logo}
            className={styles.brandingLogoText}
            alt="Portalify"
            width={50}
            height={50}
          />
        </div>
        <span className={styles.portalifyDirect}>
          Create your own form with&nbsp;
          <a href="https://portalify.in">
            <button className={styles.button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                ></path>
              </svg>

              <div className={styles.text}>Portalify</div>
            </button>
          </a>
        </span>
      </div>
    </section>
  );
};

export default Page;

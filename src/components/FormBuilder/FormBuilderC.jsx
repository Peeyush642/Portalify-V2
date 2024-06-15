"use client";
import React, { useState, useContext, useEffect, use } from "react";
import NewFormModal from "../modals/NewFormModal.jsx";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Elements from "./Elements/Elements.js";
import { UserContext } from "../../context/FormBuilderContext.js";
import { v4 as uuid } from "uuid";
import styledC from "@emotion/styled";
import { useRouter } from "next/navigation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateForm from "../Forms/createForm/CreateForm.js";
import Image from "next/image";
import { useParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./FormBuilder.module.css";
import cross_icon from "../../assets/icons/cross_icon.png";
import AuthService from "@/services/AuthService";
import textArea_icon from "@/assets/icons/elements_icon/textArea.png";
import Styling from "./Sytling/Styling.jsx";
import { Select, MenuItem, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormPreviewModal from "../Forms/FormPreviewModal.js";
import SignInForm from "../Forms/signin/signin.js";
import RegisterForm1 from "../Forms/register/register.js";
import html2canvas from "html2canvas";
import { uploadImageCloudinary } from "@/utils/fileupload";
import Lottie from "lottie-react";
import NewForm from "@/assets/NewForm.json";
import UseTemplate from "@/assets/UseTemplate.json";
import Templates from "../Dashboard/Template/Template.jsx";
import crossIcon from "@/assets/icons/crossIcon.png";
import { usePathname } from "next/navigation";
import { set } from "ace-builds/src-noconflict/ace";
import TemplatesUser from "../Dashboard/TemplatesUser/TemplatesUser.jsx";

export default function FormBuilder({ formid }) {
  const router = useRouter();
  const {
    elementList,
    allElements,
    selectedElement,
    setSelectedElement,
    state,
    setState,
    setElementType,
    elementType,
    setElementTypeName,
    formID: contextFormID,
  } = useContext(UserContext);

  // const { formID: urlFormID } = useParams();
  const urlFormID = formid;
  console.log("urlFormID==>", urlFormID);
  const [currentPage, setCurrentPage] = useState("");
  const [newFormToggle, setNewFormToggle] = useState("");

  const [modalNewForm, setModalNewForm] = useState(false);
  const toggleNewForm = () => setModalNewForm(!modalNewForm);
  const [modalTemplates, setModalTemplates] = useState(false);
  const toggleTemplates = () => setModalTemplates(!modalTemplates);
  // Get the current pathname

   let currentPathname = "";
   useEffect(() => {
      if (typeof window !== "undefined") {
        currentPathname = window.location.pathname;
      }
    }, []);
    


  useEffect(() => {
    const dropboxKeys = Object.keys(state);
    const hasMultipleDropboxes = dropboxKeys.length > 1;
    setMultiPageToggle(hasMultipleDropboxes);
    const firstPage = dropboxKeys[0];
    setCurrentPage(firstPage);
  }, [state]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      window.countStars = 20;
      window.handleBuilderNextClick = () => {
        const currentPages = Object.keys(state);
        const currentIndex = currentPages.indexOf(currentPage);
        if (currentIndex < currentPages.length - 1) {
          const nextPage = currentPages[currentIndex + 1];
          setCurrentPage(nextPage);
        }
      };

      window.handleBuilderPreviousClick = () => {
        const currentPages = Object.keys(state);
        const currentIndex = currentPages.indexOf(currentPage);

        if (currentIndex > 0) {
          const previousPage = currentPages[currentIndex - 1];
          setCurrentPage(previousPage);
        }
      };
    }
  }, [state, currentPage ]);

  // useEffect(() => {
  //   setModalNewForm(true);
  // }, []);

  useEffect(() => {
    if (urlFormID) {
      setModalNewForm(false);
    } else {
      setModalNewForm(true);
    }
  }, []);

  console.log("currentPage==>", currentPage);

  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalSizeSignIn, setModalSizeSignIn] = useState({
    minWidth: "50vw",
    minHeight: "60vh",
  });
  const toggleSignIn = () => setModalSignIn(!modalSignIn);
  const formID = urlFormID || contextFormID;

  const [multiPageToggle, setMultiPageToggle] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const [versions, setVersions] = useState([]);

  const versionSelectionHandler = (e) => {
    AuthService.getFormByVersion(formID, e.target.value)
      .then((response) => {
        const form = response.data.formData;
        setCurrentVersion(form.version);
        updateStateWithForm(formID, form.data);
        console.log("Versionform==>", form);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  };

  const handleCheckboxChange = () => {
    setMultiPageToggle(!multiPageToggle);
    if (multiPageToggle === false) {
    }
  };

  const handleMultiPageToggle = () => {
    // Check if Multi Page toggle is currently enabled
    if (multiPageToggle) {
      // Disable Multi Page toggle
      setMultiPageToggle(false);

      // Merge all dropboxes into one remaining dropbox
      const remainingDropboxId = Object.keys(state)[0];
      const mergedChildren = Object.keys(state)
        .filter((key) => key !== remainingDropboxId)
        .reduce((acc, key) => {
          // Exclude the "Next" button from being merged
          const filteredChildren = state[key]?.children.filter(
            (child) => child.name !== "Next" && child.name !== "Previous"
          );
          return [...acc, ...filteredChildren];
        }, []);

      // Remove the "Next" button from the remaining dropbox if it exists
      const remainingDropboxChildren = state[
        remainingDropboxId
      ]?.children.filter(
        (child) => child.name !== "Next" && child.name !== "Previous"
      );

      // Set the state to update the remaining dropbox with the merged children
      setState((prev) => ({
        ...prev,
        [remainingDropboxId]: {
          ...prev[remainingDropboxId],
          children: [...remainingDropboxChildren, ...mergedChildren],
        },
      }));

      // Remove the extra dropboxes from the state
      setState((prev) => {
        const updatedState = { ...prev };
        Object.keys(prev).forEach((key) => {
          if (key !== remainingDropboxId) {
            delete updatedState[key];
          }
        });
        return updatedState;
      });

      // Optionally, you can set the remaining dropbox as the selected element
      setSelectedElement(remainingDropboxId);
    }
  };

  const getTempById = (formID) => {
    AuthService.getTemplateById(formID)
      .then((response) => {
        const formData = JSON.parse(response.data.template.formData);
        const updatedState = {};
        console.log("formData==>", formData);
        console.log("fdsjkn");
        // Iterate through the keys of the formData object
        for (const formId in formData) {
          if (state[formId]) {
            // If it exists, update the children property with the data from the API
            state[formId].children = formData[formId].children;
          } else {
            // If it doesn't exist, create a new entry in the state
            state[formId] = formData[formId];
          }
          // Store the updated state in the updatedState object
          updatedState[formId] = state[formId];
        }

        setState(updatedState);
      })

      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  };

  const updateStateWithForm = (formID, selectedVersionData) => {
    if (currentPathname.includes("/formbuilder/template")) {
      getTempById(formID);
    } else {
      AuthService.getFormById(formID)
        .then((response) => {
          const form = response.data.form;
          const versions = form.versionData.map((entry) => entry.version);
          let formData = {};
          setVersions(versions);
          if (selectedVersionData) {
            formData = JSON.parse(selectedVersionData);
          } else {
            setCurrentVersion(form.currentVersion);
            console.log("form==>", form);
            const currentVersionData = form.versionData.find(
              (entry) => entry.version === form.currentVersion
            );
            formData = JSON.parse(currentVersionData.data);
          }
          const updatedState = {};
          console.log("formData==>", formData);
          // Iterate through the keys of the formData object
          for (const formId in formData) {
            if (state[formId]) {
              // If it exists, update the children property with the data from the API
              state[formId].children = formData[formId].children;
            } else {
              // If it doesn't exist, create a new entry in the state
              state[formId] = formData[formId];
            }
            // Store the updated state in the updatedState object
            updatedState[formId] = state[formId];
          }

          setState(updatedState);
        })

        .catch((error) => {
          console.error("Error fetching form data:", error);
        });
    }
  };

  console;

  useEffect(() => {
    if (urlFormID) {
      updateStateWithForm(formID);
    }
  }, []);

  elementList.forEach((category) => {
    category.elements.forEach((element) => {
      allElements.push(element);
    });
  });

  const [formData, setFormData] = useState({
    formName: "",
    formCategory: [],
    formType: [],
    showThankYou: false,
    redirectLink: "",
    templateImg: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return { sourceClone, destClone };
  };

  const Content = styledC.div`
    // margin-right: 200px;
  `;

  const Items = styledC.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    position: relative;
    width: 100%;
  `;

  const Clone = styledC(Items)`
    + div {
      display: none !important;
    }
  `;

  const Handle = styledC.div``;

  const List = styledC.div`
  border: 1px
  ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
    background: #fff;
    ${"" /* padding: 0.5rem 0.5rem 0; */}
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
  `;

  const Container = styledC(List)`
    ${"" /* margin: 0.5rem 0.5rem 1.5rem; */}
    background: #fff0;
  `;

  const Notice = styledC.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
  `;

  const Button = styledC.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #000;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
  `;

  const ButtonText = styledC.div`
    margin: 0 1rem;
  `;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState((prevState) => {
          const updatedState = {
            ...prevState,
            [destination.droppableId]: {
              htmlContent: prevState[destination.droppableId].htmlContent,
              children: reorder(
                prevState[destination.droppableId].children,
                source.index,
                destination.index
              ),
            },
          };
          console.log("updatedState==>", updatedState);
          return updatedState;
        });
        break;
      case "allElements":
        setState((prevState) => {
          const { sourceClone, destClone } = move(
            allElements,
            prevState[destination.droppableId].children,
            source,
            destination
          );
          const updatedState = {
            ...prevState,
            [destination.droppableId]: {
              htmlContent: prevState[destination.droppableId].htmlContent,
              children: destClone,
            },
          };
          console.log("updatedState==>", updatedState);
          return updatedState;
        });
        break;
      default:
        setState((prevState) => {
          const { sourceClone, destClone } = move(
            prevState[source.droppableId].children,
            prevState[destination.droppableId].children,
            source,
            destination
          );
          const updatedState = {
            ...prevState,
            [source.droppableId]: {
              htmlContent: prevState[source.droppableId].htmlContent,
              children: sourceClone,
            },
            [destination.droppableId]: {
              htmlContent: prevState[destination.droppableId].htmlContent,
              children: destClone,
            },
          };
          console.log("updatedState==>", updatedState);
          return updatedState;
        });
        break;
    }
  };

  const handleDropboxDelete = (dropboxId) => {
    // Update state to remove the specified dropbox
    setState((prev) => {
      const updatedState = { ...prev };
      delete updatedState[dropboxId];
      return updatedState;
    });

    // Optionally, you can update the selected element if needed
    setSelectedElement(null);
  };

  const addList = () => {
    const newDropboxId = uuid();

    // Update all dropboxes to replace the Submit button with a Next button
    const updatedState = Object.keys(state).reduce((acc, key) => {
      const updatedChildren = state[key]?.children.map((child) => {
        if (child.name === "Submit") {
          return {
            ...child,
            index: 22,
            name: "Next",
            value: "Next",
            icon: textArea_icon,
            onClick: () => {
              if (typeof window !== "undefined") {
                window.handleBuilderNextClick();
              }
            },
            htmlContent: `
              <input
                class="htmlContent"
                style="border: none; background-color: rgb(68, 124, 191); color: rgb(255, 255, 255); padding: 10px 21px; border-radius: 4px; margin: auto; display: block; text-align: center;"
                type="button"
                value="Next"
                onclick="handleBuilderNextClick()"
              />`,
          };
        }
        return child;
      });

      acc[key] = {
        ...state[key],
        children: updatedChildren,
      };

      return acc;
    }, {});

    // Replace the Submit button with a Next button for the default dropbox
    if (state[formID]?.children) {
      const defaultDropboxChildren = state[formID].children.map((child) => {
        if (child.name === "Submit") {
          return {
            ...child,
            index: 22,
            name: "Next",
            value: "Next",
            icon: textArea_icon,
            onClick: () => {
              if (typeof window !== "undefined") {
                window.handleBuilderNextClick()  ;
              }
            },
            htmlContent: `
              <input
                class="htmlContent"
                style="border: none; background-color: rgb(68, 124, 191); color: rgb(255, 255, 255); padding: 10px 21px; border-radius: 4px; margin: auto; display: block; text-align: center;"
                type="button"
                value="Next"
                onclick="handleBuilderNextClick()"
              />
            `,
          };
        }
        return child;
      });

      updatedState[formID] = {
        ...state[formID],
        children: defaultDropboxChildren,
      };
    }

    // Add the new dropbox to state with a Submit button
    console.log("stategegege =>>>>>>>>>>>>>>>>>>>>>", state);
    const pageId = Object.keys(state)[0];
    const newDropbox = {
      htmlContent: state[pageId].htmlContent,
      children: [
        {
          index: 21,
          id: uuid(),
          name: "Submit",
          value: "Submit",
          icon: textArea_icon,
          htmlContent: `
            <input
              class="htmlContent"
              style="border: none; background-color: rgb(68, 124, 191); color: rgb(255, 255, 255); padding: 10px 21px; border-radius: 4px; margin: auto; display: block; text-align: center;"
              type="submit"
              value="Submit"
            />
          `,
        },
      ],
    };

    // Set the state to the updatedState with the new dropbox
    setState((prev) => ({
      ...prev,
      ...updatedState,
      [newDropboxId]: newDropbox,
    }));

    // Optionally, you can set the newly added dropbox as the selected element
    setSelectedElement(newDropboxId);
  };

  console.log("state==>", state);

  const handleElementClick = (elementid, listid) => {
    console.log("elementid==>", elementid);
    setSelectedElement([listid, elementid]);
  };

  const getElementType = () => {
    // Getting selected element type
    const selectedElementId = selectedElement?.[1];
    const elementKeys = Object.keys(state);

    for (const key of elementKeys) {
      const dataArray = state[key]?.children;
      if (dataArray && Array.isArray(dataArray)) {
        const index = dataArray.findIndex(
          (obj) => obj.id === selectedElementId
        );
        if (index !== -1) {
          setElementType(dataArray[index]?.index);
          setElementTypeName(dataArray[index]?.name);
          break;
        }
      }
    }
  };

  const handleElementDelete = (elementId, parentId) => {
    setState((current) => {
      const copy = { ...current };

      const updatedChildren = copy[parentId].children.filter(
        (child) => child.id !== elementId
      );
      copy[parentId].children = updatedChildren;

      delete copy[elementId];

      return copy;
    });
    setElementType(-1);
  };

  useEffect(() => {
    getElementType();

    console.log("selected element==>", selectedElement);
  }, [selectedElement]);
  //console.log(elementType)

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //---------------------------------setting modal Size--------------------------------
  const [modalSize, setModalSize] = useState({
    minWidth: "90vw",
    minHeight: "90vh",
  });

  const [resizing, setResizing] = useState(false);

  const categoryList = [
    { value: "sample1", label: "category1" },
    { value: "sample2", label: "category2" },
    { value: "sample3", label: "category3" },
    { value: "sample3", label: "category4" },
  ];

  const formTypeList = [
    { value: "sample1", label: "formType1" },
    { value: "sample2", label: "formType2" },
    { value: "sample3", label: "formType3" },
    { value: "sample3", label: "formType4" },
  ];
  const [modalSave, setModalSave] = useState(false);
  const toggleSave = () => {
    if (formID === urlFormID) {
      handleCreateClick();
    } else {
      setModalSave(!modalSave);
    }
  };
  //---------------------------------setting modal Size--------------------------------
  const modalSizeSave = { minWidth: "60vw", minHeight: "90vh" };

  const handleSubmit = async (e) => {
    const formCategoryString = formData.formCategory.join(",");
    const formTypeString = formData.formType.join(",");

    let userName = "";
    if (typeof window !== "undefined") {
      userName = localStorage.getItem("userName");
    }
    try {
      const payload = {
        ...formData,
        formCategory: formCategoryString,
        formType: formTypeString,
        formID: formID,
        createdBy: userName,
        modifiedBy: userName,
        formData: JSON.stringify(state),
      };

      const response = await AuthService.addNewForm(payload);

      if (response) {
        alert("Form creation successful");
        setModalSave(!modalSave);
        router.push("/");
      } else {
        alert("Form creation failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error during form creation:", error);
      alert("Form limit reached.");
    }
  };

  const handleTempClick = (tempformID) => {
    if (tempformID) {
      getTempById(tempformID);
      toggleTemplates();
    }
  };

  const handleTempSubmit = async (e) => {
    const formCategoryString = formData.formCategory.join(",");
    const formTypeString = formData.formType.join(",");

    let userName = "";
    if (typeof window !== "undefined") {
      userName = localStorage.getItem("userName");
    }
    try {
      const payload = {
        ...formData,
        formCategory: formCategoryString,
        formType: formTypeString,
        formID: formID,
        createdBy: userName,
        modifiedBy: userName,
        formData: JSON.stringify(state),
      };
      const response = await AuthService.addNewTemplate(payload);
      if (response) {
        alert("Template creation successful");
        setModalSave(!modalSave);
        router.push("/templates");
      } else {
        alert("Form creation failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error during form creation:", error);
      alert(error);
    }
  };
  console.log("payload==>", formData);
  const handleCreateClick = (
    formname,
    finalRedirectLink,
    showThankYou,
    showProgressBar,
    pathname
  ) => {
    let isAuthenticated = "";
    if (typeof window !== "undefined") {
      isAuthenticated = localStorage.getItem("isAuthenticated") || "";
    }

    if (!isAuthenticated) {
      toggleSave();
      toggleSignIn();
    } else {
      formData.formName = formname;
      formData.showProgressBar = showProgressBar;
      formData.showThankYou = showThankYou;
      formData.redirectLink = finalRedirectLink;

      // Define a function to handle the form submission
      const handleFormSubmission = () => {
        handleSubmit(
          formData.formName,
          formData.showProgressBar,
          formData.showThankYou,
          formData.redirectLink
        );
      };

      // If pathname contains '/formbuilder/template', capture screenshot and upload to Cloudinary
      if (currentPathname.includes("/formbuilder/template")) {
        const globalStylingDiv = document.querySelector("#globalStyling");
        if (globalStylingDiv) {
          html2canvas(globalStylingDiv)
            .then((canvas) => {
              // Convert canvas to base64 data URL
              const imageDataURL = canvas.toDataURL("image/png");

              // Upload image to Cloudinary with form name
              uploadImageCloudinary(imageDataURL, formData.formName)
                .then((imageURL) => {
                  if (imageURL) {
                    formData.templateImg = imageURL;
                    console.log("Template image URL:", imageURL);
                    handleTempSubmit(
                      formData.formName,
                      formData.showProgressBar,
                      formData.showThankYou,
                      formData.redirectLink,
                      formData.templateImg
                    );
                  } else {
                    alert("Error uploading screenshot to Cloudinary");
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error uploading screenshot to Cloudinary:",
                    error
                  );
                  alert("Error uploading screenshot to Cloudinary");
                });
            })
            .catch((error) => {
              console.error("Error capturing screenshot:", error);
              alert("Error capturing screenshot");
            });
        } else {
          alert("Div with ID 'globalStyling' not found");
        }
      } else {
        // For other paths, directly handle form submission
        handleFormSubmission();
      }
    }
  };

  const handleFormName = (formName) => {
    setFormData({
      ...formData,
      formName: formName,
    });
  };

  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayCompanyForm, setDisplayCompanyForm] = useState(false);

  const handleSignInSuccess = (user) => {
    console.log("Sign-in successful:", user);
    toggleSignIn();

    // Trigger the form submission
    handleCreateClick();
  };
  const handleCreateAccountClick = () => {
    setDisplayRegisterForm(true);
  };
  const handleNextClick = () => {
    setDisplayCompanyForm(true);
  };
  console.log("all Elements", allElements);

  const modalTemplateContent = <TemplatesUser onTempClick={handleTempClick} />;

  const openTemplateModal = () => {
    toggleNewForm();
    toggleTemplates();
  };
  const modalTemplateTitle = (
    <>
      <div className={classes.flexCenter}>Select Templates</div>
      <Image
        src={crossIcon}
        alt="Close"
        className={classes.cross}
        width={20}
        height={20}
        onClick={toggleTemplates}
      />
    </>
  );
  const modalNewFormTitle = (
    <div className={classes.flexCenter}>Create New Form</div>
  );
  const modalNewFormContent = (
    <>
      <div className={classes.cards} onClick={toggleNewForm}>
        <Lottie
          loop={true}
          animationData={NewForm}
          style={{ width: "80%", height: "80%" }}
        />
        Start From Scratch
      </div>

      <div className={classes.cards} onClick={openTemplateModal}>
        <Lottie
          loop={true}
          animationData={UseTemplate}
          style={{ width: "80%", height: "80%" }}
        />
        Use Templates
      </div>
    </>
  );

  return (
    <div className={classes.formBuilderContainer}>
      <NewFormModal
        isOpen={modalNewForm}
        toggle={toggleNewForm}
        modalTitle={modalNewFormTitle}
        modalContent={modalNewFormContent}
        minWidth="80vw"
        minHeight="80vh"
      />
      <NewFormModal
        isOpen={modalTemplates}
        toggle={toggleTemplates}
        modalTitle={modalTemplateTitle}
        modalContent={modalTemplateContent}
        minWidth="90vw"
        minHeight="80vh"
      />

      <div className={classes.formBuilderWrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.formBuilderElements}>
            <div className={classes.elementsContainer}>
              <Items>
                <Elements
                  dataElement={allElements}
                  multiPageToggle={multiPageToggle}
                />
              </Items>
            </div>
          </div>
          <div className={classes.formBuilderWorkSpace}>
            <div className={classes.workSpaceContainer}>
              <Items>
                <Content style={{ width: "100%", height: "85vh" }}>
                  <div className={classes.dropBoxWrapper}>
                    <div className={classes.multiPageToggle}>
                      <div className={classes.checkboxApple}>
                        <input
                          className={classes.yep}
                          type="checkbox"
                          id="multipage"
                          name="multipage"
                          onChange={handleCheckboxChange}
                          onClick={handleMultiPageToggle}
                          checked={multiPageToggle}
                        />
                        <label for="multipage"></label>
                      </div>
                      <span>Multi Page</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {urlFormID && (
                        <FormControl
                          size="small"
                          sx={{
                            width: "4rem",
                            margin: "10px 0",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Select
                            value={currentVersion}
                            onChange={versionSelectionHandler}
                          >
                            {versions.map((version) => (
                              <MenuItem key={version} value={version}>
                                v{version}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}

                      {multiPageToggle && (
                        <Button className={classes.addButton} onClick={addList}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                            />
                          </svg>
                          <ButtonText>Add List</ButtonText>
                        </Button>
                      )}
                      <Button
                        className={classes.addButton}
                        color="danger"
                        onClick={toggle}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"
                          />
                        </svg>
                        <ButtonText>Preview & Save</ButtonText>
                      </Button>
                    </div>
                  </div>
                  <FormPreviewModal
                    toggleSave={toggleSave}
                    Button={Button}
                    isOpen={modal}
                    toggle={toggle}
                    currentPage={currentPage}
                    state={state}
                  />
                  <Modal
                    isOpen={modalSave}
                    toggle={toggleSave}
                    className="preview-modal d-flex align-items-center w-75"
                    style={modalSizeSave}
                  >
                    <ModalHeader toggle={toggleSave}>
                      <div className="d-flex  align-items-center justify-content-between">
                        Enter Form Details
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <div className="d-flex  flex-column justify-content-center align-items-center p-2">
                        <CreateForm
                          onCreateClick={handleCreateClick}
                          isMultiPage={multiPageToggle}
                        />
                      </div>
                    </ModalBody>
                  </Modal>
                  <Modal
                    isOpen={modalSignIn}
                    toggle={toggleSignIn}
                    className="sign-in-modal"
                    style={modalSizeSignIn}
                  >
                    <div className="d-flex justify-content-center align-items-center m-4">
                      {displayRegisterForm ? (
                        // displayCompanyForm ? (
                        //   <CompanyForm />
                        // ) : (
                        <RegisterForm1 onNextClick={handleNextClick} />
                      ) : (
                        <SignInForm
                          onSignInSuccess={handleSignInSuccess}
                          onCreateAccountClick={handleCreateAccountClick}
                        />
                      )}
                    </div>
                  </Modal>
                  {Object.keys(state).map((pageId) => (
                    <Droppable key={pageId} droppableId={pageId}>
                      {(provided, snapshot) => (
                        <div
                          key={pageId}
                          // style={state[pageId].htmlContent}
                          className={classes.dropBoxContainer} // Add a new class for styling
                        >
                          <Container
                            style={state[pageId].htmlContent}
                            id="globalStyling"
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            // className={classes["dropable-box"]}
                          >
                            {Array.isArray(state[pageId].children) &&
                              state[pageId].children.some(
                                (item) => item.name === "Next"
                              ) && (
                                <div
                                  className={classes.cross_iconDropBox}
                                  onClick={() => handleDropboxDelete(pageId)}
                                >
                                  <Image
                                    src={cross_icon} // Add your delete icon here
                                    alt={cross_icon}
                                    width={13}
                                    height={13}
                                  />
                                </div>
                              )}
                            {state[pageId].children.length
                              ? state[pageId].children.map((item, index) => (
                                  <div key={pageId}>
                                    {state[pageId].children.length === 1 ? (
                                      <Notice>Drop items here</Notice>
                                    ) : null}
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                      type="TASK"
                                    >
                                      {(provided, snapshot) => (
                                        <Items
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          isDragging={snapshot.isDragging}
                                          style={provided.draggableProps.style}
                                          onClick={() =>
                                            handleElementClick(item.id, pageId)
                                          }
                                          className={classes["element-box"]}
                                        >
                                          {item.index !== 21 && (
                                            <div
                                              className={classes.cross_icon}
                                              style={{
                                                position: "absolute",
                                                top: -10,
                                                right: -5,
                                              }}
                                              onClick={() =>
                                                handleElementDelete(
                                                  item.id,
                                                  pageId
                                                )
                                              }
                                            >
                                              <Image
                                                src={cross_icon}
                                                alt={cross_icon}
                                                width={13}
                                                height={13}
                                              />
                                            </div>
                                          )}

                                          <div
                                            key={item.id}
                                            style={{
                                              backgroundColor:
                                                selectedElement === item.id
                                                  ? "yellow"
                                                  : "transparent",
                                              width: "100%",
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html: item.htmlContent,
                                            }}
                                          ></div>
                                          <Handle
                                            {...provided.dragHandleProps}
                                            className={
                                              classes["reorder-handle"]
                                            }
                                          >
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                fill="currentColor"
                                                d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                              />
                                            </svg>
                                          </Handle>
                                        </Items>
                                      )}
                                    </Draggable>
                                  </div>
                                ))
                              : !provided.placeholder && (
                                  <Notice>Drop items here</Notice>
                                )}
                            {provided.placeholder}
                          </Container>
                        </div>
                      )}
                    </Droppable>
                  ))}
                </Content>
              </Items>
            </div>
          </div>

          <div className={classes.formBuilderStyling}>
            <div className={classes.formBuilderStylingContainer}>
              <Styling />
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

"use client";
import React, { useState, createContext } from "react";
import attachment_icon from "../assets/icons/elements_icon/attachment.png";
import checkbox_icon from "../assets/icons/elements_icon/checkbox.png";
import date_icon from "../assets/icons/elements_icon/date.png";
import dateAndTime_icon from "../assets/icons/elements_icon/dateAndTime.png";
import divider_icon from "../assets/icons/elements_icon/divider.png";
import dropdown_icon from "../assets/icons/elements_icon/dropdown.png";
import number_icon from "../assets/icons/elements_icon/number.png";
import singleLine_icon from "../assets/icons/elements_icon/singleLine.png";
import switch_icon from "../assets/icons/elements_icon/switch.png";
import textArea_icon from "../assets/icons/elements_icon/textArea.png";
import radioButton_icon from "../assets/icons/elements_icon/radioButton.png";
import imageselector_icon from "../assets/icons/elements_icon/image selector.png";
import image from "../assets/icons/elements_icon/image.png";
import heading from "../assets/icons/elements_icon/heading.png";
import para from "../assets/icons/elements_icon/para.png";
import link from "../assets/icons/elements_icon/link.png";
import rating from "../assets/icons/elements_icon/rating.png";
import "../components/StarRating/StarRating.css";
import { v4 as uuid } from "uuid";
import sampleImage from '@/assets/formimage/sampleImage.jpg';

export const UserContext = createContext();
const formID = uuid();
const FormBuilderContext = (props) => {
  const [elementType, setElementType] = useState(-1);

  const [selectedElement, setSelectedElement] = useState([]);

  const [elementTypeName, setElementTypeName] = useState(null);

  const [userData, setUserData] = useState({});

  const updateUserData = (newData) => {
    setUserData((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  const [singleLineState, setSingleLineState] = useState([]);
  const [currElement, setCurrElement] = useState();
  const elementList = [
    {
      type: "Multipage Elements",
      elements: [
        {
          index: 1,
          id: uuid(),
          name: "Previous",
          value: "Previous",
          onClick: () => {
            if (typeof window !== "undefined") {
              window.handleBuilderPreviousClick()  ;
            }
          },
          icon: textArea_icon,
          htmlContent: `<input class='htmlContent'  style="border: none; background-color: rgb(68, 124, 191); color: rgb(255, 255, 255); padding: 10px 21px; border-radius: 4px; margin: auto; display: block; text-align: center;" type="button" onclick='window.handleBuilderPreviousClick()'  value='Previous'/>`,
        },
      ],
    },
    {
      type: "Text Elements",
      elements: [
        {
          index: 2,
          id: uuid(),
          name: "Single Line",
          icon: singleLine_icon,
          label: singleLineState.label,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}"><label class='htmlContentLabel' id="label_value" for='htmlContent'>Sample Label</label>  <input style="height:30px;padding:5px;  font-size: 20px;" id="input_value" class='htmlContent' type='text'/></div>`,
        },
        {
          index: 3,
          id: uuid(),
          name: "Text Area",
          icon: textArea_icon,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}" style='display: flex; justify-content: left; align-items: center;'>
            <label class='htmlContentLabel' id="label_value" for='htmlContent'>Sample Label</label>
            <textarea id="input_value" class='htmlContent' style='margin-left: 10px;'></textarea>
          </div>`,
        },
        {
          index: 4,
          id: uuid(),
          name: "Number",
          icon: number_icon,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}"><label id="label_value" class='htmlContentLabel' for='htmlContent'>Sample Label</label>   <input id="input_value" class='htmlContent' type='number'/></div>`,
        },
      ],
    },
    {
      type: "Date Elements",
      elements: [
        {
          index: 5,
          id: uuid(),
          name: "Date",
          icon: date_icon,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}"><label id="label_value" class='htmlContentLabel' for='htmlContent'>Sample Label  </label>   <input id="input_value" class='htmlContent' type='date'/></div>`,
        },
        {
          index: 6,
          id: uuid(),
          name: "Date & Time",
          icon: dateAndTime_icon,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}"><label id="label_value" class='htmlContentLabel' for='htmlContent'>Sample Label  </label>   <input id="input_value" class='htmlContent' type='datetime-local'/></div>`,
        },
      ],
    },

    {
      type: "Multi Elements",
      elements: [
        {
          index: 7,
          id: uuid(),
          name: "Dropdown",
          icon: dropdown_icon,
          htmlContent: `<div id="${uuid()}" class='htmlContentWhole'><h1 id="heading_value" class='htmlContentHeading' style="font-size: 16px;"> Add Question </h1> <select id="input_value" class="htmlContentContainer" name="undefined"><option  id="1" value='Sample'  >Sample</option></select></div>`,
        },
        {
          index: 8,
          id: uuid(),
          name: "Radio Button",
          icon: radioButton_icon,
          htmlContent: `<div id="${uuid()}" class='htmlContentWhole'><h1 id="heading_value" class='htmlContentHeading' style="font-size: 16px; line-height:inherit; margin:0px"> Add Question </h1> <div class="htmlContentContainer"><div id=1 className='htmlContentParent'><input id="input_value" class='htmlContent' type='radio' name="undefined" value='sample'/> <label id="label_value" class='htmlContentLabel' for='htmlContent' > Sample </label> </div></div></div>`,
        },
        {
          index: 9,
          id: uuid(),
          name: "Checkbox",
          icon: checkbox_icon,
          htmlContent: `<div id="${uuid()}" class='htmlContentWhole'><h1 id="heading_value" class='htmlContentHeading' style="font-size: 16px;"> Add Question </h1> <div class="htmlContentContainer"><div id=1 className='htmlContentParent'><input id="input_value" class='htmlContent' type='checkbox' value='sample'/> <label id="label_value" class='htmlContentLabel' for='htmlContent' > Sample </label> </div></div></div>`,
        },
        {
          index: 10,
          id: uuid(),
          name: "Switch",
          icon: switch_icon,
          htmlContent: "",
        },
      ],
    },

    {
      type: "Media Elements",
      elements: [
        {
          index: 11,
          id: uuid(),
          name: "Image Selector",
          icon: imageselector_icon,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}" style="display: flex; align-items: center; margin-bottom: 20px;">
          <label id="label_value" class='htmlContentLabel' for='htmlContent'>Upload A Photo:</label>
          <input id="input_value" type="file" accept="image/*" style="padding: 10px; border: 2px solid #447cbf; border-radius: 5px; color: #447cbf; background-color: #f2f2f2; cursor: pointer;">
        </div>`,
        },
        {
          index: 12,
          id: uuid(),
          name: "Attachment",
          icon: attachment_icon,
          htmlContent: "",
        },
      ],
    },
    {
      type: "Other Elements",
      elements: [
        {
          index: 13,
          id: uuid(),
          name: "Divider",
          icon: divider_icon,
          htmlContent: `<hr class='htmlContent' style="height:2px;border-width:0px;background-color:black;width:100%">`,
        },
        {
          index: 14,
          id: uuid(),
          name: "Link",
          icon: link,
          htmlContent: `<a target="_blank" class='htmlContent'> Sample Link</a>`,
        },
        {
          index: 15,
          id: uuid(),
          name: "Rating",
          icon: rating,
          htmlContent: `<div class='htmlContent' id="stars-example" style="font-family: sans-serif; font-size: 0.9rem; display: inline-flex; color:orange">
              <input class="rating__input" checked name="rating" id="rating-10" value="1" type="radio" style="position: absolute ; left: -9999px ;">
              <label aria-label="1 star" class="rating__label" for="rating-10" style="cursor: pointer; padding: 0 0.1em; font-size: 2rem; color: inherit;" onclick="window.handleStarClick(1)" ><i id="1"  class="rating__icon rating__icon--star fa fa-star" style="color: inherit;"></i></label>
        
              <input class="rating__input" name="rating" id="rating-20" value="2" type="radio" style="position: absolute ; left: -9999px ;">
              <label aria-label="2 stars" class="rating__label" for="rating-20" style="cursor: pointer; padding: 0 0.1em; font-size: 2rem; color: inherit;" onclick="window.handleStarClick(2)"><i id="2" class="rating__icon rating__icon--star fa fa-star" style="color: inherit;"></i></label>
        
              <input class="rating__input" name="rating" id="rating-30" value="3" type="radio" style="position: absolute ; left: -9999px ;">
              <label aria-label="3 stars" class="rating__label" for="rating-30" style="cursor: pointer; padding: 0 0.1em; font-size: 2rem; color: inherit;" onclick="window.handleStarClick(3)"><i id="3" class="rating__icon rating__icon--star fa fa-star" style="color: inherit;"></i></label>
        
              <input class="rating__input" name="rating" id="rating-40" value="4" type="radio" style="position: absolute ; left: -9999px ;">
              <label aria-label="4 stars" class="rating__label" for="rating-40" style="cursor: pointer; padding: 0 0.1em; font-size: 2rem; color: inherit;" onclick="window.handleStarClick(4)"><i id="4" class="rating__icon rating__icon--star fa fa-star" style="color: inherit;"></i></label>
        
              <input class="rating__input" name="rating" id="rating-50" value="5" type="radio" style="position: absolute ; left: -9999px ;">
              <label aria-label="5 stars" class="rating__label" for="rating-50" style="cursor: pointer; padding: 0 0.1em; font-size: 2rem; color: inherit;" onclick="window.handleStarClick(5)"><i id="5" class="rating__icon rating__icon--star fa fa-star" style="color: inherit;"></i></label>
        
              <p class="desc" style="margin-bottom: 2rem;"></p>
            </div>`,
        },
      ],
    },
    {
      type: "Form Properties",
      elements: [
        {
          index: 16,
          id: uuid(),
          name: "Name",
          icon: singleLine_icon,
          htmlContent: `<h1 class='htmlContent'> Sample Name </h1>`,
        },
        {
          index: 17,
          id: uuid(),
          name: "Button",
          icon: textArea_icon,
          htmlContent: `<input class='htmlContent' style="border:none;" type="button" value='Sample Text'/>`,
        },
        {
          index: 18,
          id: uuid(),
          name: "Image",
          icon: image,
          htmlContent: `<div class='htmlContentParent' id="${uuid()}" style="display: flex; align-items: center; margin-bottom: 20px;"><img class="htmlContent" src=${sampleImage} alt="image uploaded" width="30%" class="htmlContent" /></div>`,
        },
        {
          index: 19,
          id: uuid(),
          name: "Heading",
          icon: heading,
          htmlContent: `<h1 class='htmlContent'> Sample Heading </h1>`,
        },

        {
          index: 20,
          id: uuid(),
          name: "Paragraph",
          icon: para,
          htmlContent: `<p class='htmlContent'> Sample Para </p>`,
        },
      ],
    },
  ];
  //--------------------------
  // const [state, setState] = useState({
  //   [uuid()]: []

  // })

  const [state, setState] = useState({
    [formID]: {
      htmlContent: {
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
        padding: "8px",
        width: "100%",
        maxHeight: "70vh",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginLeft: "0px",
        marginRight: "0px",
        marginTop: "0px",
        marginBottom: "0px",
        margin: "10px 0px",
        border: "1px",
        borderRadius: "0px",
        borderStyle: "dashed",
        borderColor: "black",
        fontSize: "16px",
        color: "black",
        backgroundSize: "",
        backgroundRepeat: "repeat",
      },
      children: [
        {
          index: 21,
          id: uuid(),
          name: "Submit",
          icon: textArea_icon,
          htmlContent: `<input class='htmlContent' style="border: none; background-color: rgb(68, 124, 191); color: rgb(255, 255, 255); padding: 10px 21px; border-radius: 4px; margin: auto; display: block; text-align: center;" type="submit" value='Submit'/>`,
        },
      ],
    },
  });

  const allElements = [];

  return (
    <UserContext.Provider
      value={{
        ...userData,
        updateUserData,
        elementList,
        allElements,
        selectedElement,
        setSelectedElement,
        state,
        setState,
        elementType,
        setElementType,
        elementTypeName,
        setElementTypeName,
        formID,
        singleLineState,
        setSingleLineState,
        currElement,
        setCurrElement,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default FormBuilderContext;

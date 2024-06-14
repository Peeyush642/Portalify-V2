import { useState, useEffect, useContext } from "react";
import Editor from "@/components/FormBuilder/Editor/Editor";
import { Button, TextField, Box, Typography, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { uploadImageCloudinary } from "@/utils/fileupload";
import { UserContext } from "@/context/FormBuilderContext";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import { ColorPicker, useColor } from "react-color-palette";
import Popover from "@mui/material/Popover";
import Popper from "@mui/material/Popper";

const Heading = ({ Notice }) => {
  const {
    label,
    min_length,
    max_length,
    form_name,
    element_heading,
    default_value,
    placeholder,
    multi_label,
    form_image,
    required,
    updateUserData,
    elementList,
    allElements,
    selectedElement,
    state,
    setState,
    elementType,
    setElementType,
    elementTypeName,
    singleLineState,
    setSingleLineState,
  } = useContext(UserContext);
  const [globalFontColor, setGlobalFontColor] = useColor("#ffffff");
  const [headingBackgroundColor, setHeadingBackgroundColor] =
    useColor("#ffffff");
  const [gFontColor, setGFontColor] = useState("#ffffff");
  const [headingBackgroundColorState, setHeadingBackgroundColorState] =
    useState("#ffffff");

  const [anchorElFont, setAnchorElFont] = useState(null);
  const [anchorElHeadingBackgroundColor, setAnchorElHeadingBackgroundColor] =
    useState(null);

  const handleFontColorChange = (newColor) => {
    setGlobalFontColor(newColor);
    setGFontColor(newColor.hex);
    globalFontcolorInputEvent(newColor);
  };

  const handleHeadingBackgroundColorChange = (newColor) => {
    setHeadingBackgroundColor(newColor);
    setHeadingBackgroundColorState(newColor.hex);
    headingBackgroundColorInputEvent(newColor);
  };

  const handleFontColorChangeButtonClick = (event) => {
    setAnchorElFont(anchorElFont ? null : event.currentTarget);
  };
  const handleHeadingBackgroundColorChangeButtonClick = (event) => {
    setAnchorElHeadingBackgroundColor(
      anchorElHeadingBackgroundColor ? null : event.currentTarget
    );
  };

  const openFont = Boolean(anchorElFont);
  const openHeadingBackgroundColor = Boolean(anchorElHeadingBackgroundColor);
  const idFont = openFont ? "simple-popper" : undefined;
  const idHeadingBackgroundColor = openHeadingBackgroundColor
    ? "simple-popper"
    : undefined;

  const handleHeadingBackgroundColorClose = () => {
    setAnchorElHeadingBackgroundColor(null);
  };

  const headingBackgroundColorInputEvent = (color) => {
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);

      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;

        const parser = new DOMParser();
        const newHtmlContent = parser.parseFromString(
          oldHtmlContent,
          "text/html"
        );

        const myInput = newHtmlContent.querySelector(".htmlContent");
        const labelElement = newHtmlContent.querySelector(".htmlContentLabel"); // Replace with the actual class or selector for your label element

        myInput.style.backgroundColor = color.hex;

        setState((prevState) => {
          const updatedChildren = [...prevState[key].children];
          updatedChildren[index] = {
            ...updatedChildren[index],
            htmlContent: newHtmlContent.documentElement.innerHTML,
          };
          return {
            ...prevState,
            [key]: {
              ...prevState[key],
              children: updatedChildren,
            },
          };
        });
      } else {
        // Handle the case where the element with the specified id is not found
      }
    } else {
      // Handle the case where the key or array is not valid
    }
  };
  const globalFontcolorInputEvent = (color) => {
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);

      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;

        const parser = new DOMParser();
        const newHtmlContent = parser.parseFromString(
          oldHtmlContent,
          "text/html"
        );

        const myInput = newHtmlContent.querySelector(".htmlContent");
        const labelElement = newHtmlContent.querySelector(".htmlContentLabel"); // Replace with the actual class or selector for your label element

        if (myInput) {
          myInput.setAttribute("style", "color: " + color.hex);
        }

        if (labelElement) {
          labelElement.setAttribute("style", "color: " + color.hex);
        }

        setState((prevState) => {
          const updatedChildren = [...prevState[key].children];
          updatedChildren[index] = {
            ...updatedChildren[index],
            htmlContent: newHtmlContent.documentElement.innerHTML,
          };
          return {
            ...prevState,
            [key]: {
              ...prevState[key],
              children: updatedChildren,
            },
          };
        });
      } else {
        // Handle the case where the element with the specified id is not found
      }
    } else {
      // Handle the case where the key or array is not valid
    }
  };

  const key = selectedElement[0];
  const idToFind = selectedElement[1];
  const indexToFind = singleLineState.findIndex(
    (element) => element.id === idToFind
  );
  if (indexToFind === -1) {
    setSingleLineState((prevSingleLineState) => {
      return [...prevSingleLineState, { id: idToFind }];
    });
  }

  const [labelState, setLabelState] = useState(
    indexToFind === -1 ? "Sample Label" : singleLineState[indexToFind].label
  );

  const [placeholderState, setPlaceholderState] = useState(
    indexToFind === -1 ? "" : singleLineState[indexToFind].placeholder
  );

  const [defaultState, setDefaultState] = useState(
    indexToFind === -1 ? "" : singleLineState[indexToFind].default
  );

  const [hideLabelState, setHideLabelState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].hideLabel
  );

  const [requiredState, setRequiredState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].required
  );

  const [widthState, setWidthState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].width
  );

  const [gapState, setGapState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].gap
  );
  const [fontSizeState, setFontSizeState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].fontSize
  );
  const [alignmentState, setAlignmentState] = useState(
    indexToFind === -1 ? "" : singleLineState[indexToFind].alignment
  );

  const [formatsState, setFormatsState] = useState(
    indexToFind === -1 ? "" : singleLineState[indexToFind].format
  );
  const [flexDirectionState, setFlexDirectionState] = useState(
    indexToFind === -1 ? "" : singleLineState[indexToFind].flexDirection
  );

  const [showPaddingAdvancedOptions, setShowPaddingAdvancedOptions] =
    useState(false);
  const [showMarginAdvancedOptions, setShowMarginAdvancedOptions] =
    useState(false);
  const [marginState, setMarginState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].margin
  );
  const [lMarginState, setLMarginState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].marginLeft
  );
  const [rMarginState, setRMarginState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].marginRight
  );
  const [tMarginState, setTMarginState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].marginTop
  );
  const [bMarginState, setBMarginState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].marginBottom
  );

  const [paddingState, setPaddingState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].padding
  );
  const [lPaddingState, setLPaddingState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].paddingLeft
  );
  const [rPaddingState, setRPaddingState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].paddingRight
  );
  const [tPaddingState, setTPaddingState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].paddingTop
  );
  const [bPaddingState, setBPaddingState] = useState(
    indexToFind === -1 ? 0 : singleLineState[indexToFind].paddingBottom
  );
  const [headingSizeState, setHeadingSizeState] = useState(
    indexToFind === -1 ? "h1" : singleLineState[indexToFind].headingSize
  );
  const [headingContentState, setHeadingContentState] = useState(
    indexToFind === -1 ? "h1" : singleLineState[indexToFind].headingContent
  );
  const [customCSS, setCustomCSS] = useState("");

  const addCustomCssHandler = () => {
    console.log(customCSS);

    const propArray = customCSS.split("\n");

    console.log(propArray);

    setState((prevState) => {
      // const newState = { ...prevState };
      // const newHtmlContent = { ...dataArray };

      for (let i = 0; i < propArray.length; i++) {
        const [property, value] = propArray[i].split(":");
        const trimmedProperty = property.trim();
        const trimmedValue = value.trim();

        console.log(trimmedProperty, trimmedValue);

        const camelCaseProperty = trimmedProperty.replace(
          /-([a-z])/g,
          (_, letter) => letter.toUpperCase()
        );

        console.log(camelCaseProperty);

        const name = camelCaseProperty;
      }

      // newState[key] = { ...prevState[key], htmlContent: newHtmlContent };

      // return newState;
    });
  };

  const handleFormat = (event, newFormats) => {
    console.log(
      "NEW FORMATS =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      newFormats
    );
    setFormatsState(newFormats);
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;
    let newHtmlContent;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;
        const parser = new DOMParser();
        newHtmlContent = parser.parseFromString(oldHtmlContent, "text/html");
      }
    }

    const applyStyleBold = (element, styleProperty) => {
      const currentStyle = window.getComputedStyle(element)[styleProperty];
      element.style[styleProperty] =
        currentStyle !== "bold" ? "bold" : "normal";
    };

    const applyStyleItalic = (element, styleProperty) => {
      const currentStyle = window.getComputedStyle(element)[styleProperty];
      element.style[styleProperty] =
        currentStyle !== "italic" ? "italic" : "normal";
    };

    const applyStyleUnderlined = (element, styleProperty) => {
      const currentStyle = window.getComputedStyle(element)[styleProperty];
      element.style[styleProperty] =
        currentStyle !== "underline" ? "underline" : "none";
    };

    const removeStyle = (element, styleProperty) => {
      element.style[styleProperty] = "normal";
    };
    const removeStyleUnderlined = (element, styleProperty) => {
      element.style[styleProperty] = "none";
    };

    const myInputs2 = newHtmlContent.querySelector(".htmlContentContainer");
    const myInputs1 = newHtmlContent.querySelectorAll(".htmlContentLabel");
    const myInputs = newHtmlContent.querySelectorAll(".htmlContent");

    if (newFormats.includes("bold")) {
      if (myInputs2) {
        applyStyleBold(myInputs2, "fontWeight");
      }
      myInputs1.forEach((myInput1) => {
        applyStyleBold(myInput1, "fontWeight");
      });
      myInputs.forEach((myInput) => {
        applyStyleBold(myInput, "fontWeight");
      });
    } else {
      if (myInputs2) {
        removeStyle(myInputs2, "fontWeight");
      }
      myInputs1.forEach((myInput1) => {
        removeStyle(myInput1, "fontWeight");
      });
      myInputs.forEach((myInput) => {
        removeStyle(myInput, "fontWeight");
      });
    }

    if (newFormats.includes("italic")) {
      if (myInputs2) {
        applyStyleItalic(myInputs2, "fontStyle");
      }
      myInputs1.forEach((myInput1) => {
        applyStyleItalic(myInput1, "fontStyle");
      });
      myInputs.forEach((myInput) => {
        applyStyleItalic(myInput, "fontStyle");
      });
    } else {
      if (myInputs2) {
        removeStyle(myInputs2, "fontStyle");
      }
      myInputs1.forEach((myInput1) => {
        removeStyle(myInput1, "fontStyle");
      });
      myInputs.forEach((myInput) => {
        removeStyle(myInput, "fontStyle");
      });
    }

    if (newFormats.includes("underlined")) {
      if (myInputs2) {
        applyStyleUnderlined(myInputs2, "textDecoration");
      }
      myInputs1.forEach((myInput1) => {
        applyStyleUnderlined(myInput1, "textDecoration");
      });
      myInputs.forEach((myInput) => {
        applyStyleUnderlined(myInput, "textDecoration");
      });
    } else {
      if (myInputs2) {
        removeStyleUnderlined(myInputs2, "textDecoration");
      }
      myInputs1.forEach((myInput1) => {
        removeStyleUnderlined(myInput1, "textDecoration");
      });
      myInputs.forEach((myInput) => {
        removeStyleUnderlined(myInput, "textDecoration");
      });
    }

    setSingleLineState((prevSingleLineState) => {
      const indexToFind = prevSingleLineState.findIndex(
        (element) => element.id === idToFind
      );
      if (indexToFind !== -1) {
        return [
          ...prevSingleLineState.slice(0, indexToFind),
          {
            ...prevSingleLineState[indexToFind],
            format: newFormats,
          },
          ...prevSingleLineState.slice(indexToFind + 1),
        ];
      }

      return prevSingleLineState;
    });

    setState((prevState) => {
      const updatedChildren = [...prevState[key].children];
      updatedChildren[index] = {
        ...updatedChildren[index],
        htmlContent: newHtmlContent.documentElement.innerHTML,
      };
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          children: updatedChildren,
        },
      };
    });
  };

  const handleAlignment = (event, newAlignment) => {
    // setAlignment(newAlignment);
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;
    let newHtmlContent;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;
        const parser = new DOMParser();
        newHtmlContent = parser.parseFromString(oldHtmlContent, "text/html");
      }
    }

    const myInput = newHtmlContent.querySelector(".htmlContent");
    const myInput1 = newHtmlContent.querySelector(".htmlContentParent");
    const myInput2 = newHtmlContent.querySelector(".htmlContentWhole");
    let value = newAlignment;
    setAlignmentState(newAlignment);
    if (myInput2) {
      myInput2.style.display = "block";
      switch (value) {
        case "left":
          myInput2.style.textAlign = "left";
          break;
        case "center":
          myInput2.style.textAlign = "center";
          break;
        case "right":
          myInput2.style.textAlign = "right";

          break;
        default:
          break;
      }
    } else if (myInput1) {
      myInput1.style.display = "block";
      switch (value) {
        case "left":
          myInput1.style.textAlign = "left";
          break;
        case "center":
          myInput1.style.textAlign = "center";
          break;
        case "right":
          myInput1.style.textAlign = "right";

          break;
        default:
          break;
      }
    } else if (myInput) {
      myInput.style.display = "block";
      switch (value) {
        case "left":
          myInput.style.textAlign = "left";
          break;
        case "center":
          myInput.style.textAlign = "center";
          break;
        case "right":
          myInput.style.textAlign = "right";

          break;
        default:
          break;
      }
    }

    setSingleLineState((prevSingleLineState) => {
      const indexToFind = prevSingleLineState.findIndex(
        (element) => element.id === idToFind
      );
      if (indexToFind !== -1) {
        return [
          ...prevSingleLineState.slice(0, indexToFind),
          {
            ...prevSingleLineState[indexToFind],
            alignment: value,
          },
          ...prevSingleLineState.slice(indexToFind + 1),
        ];
      }

      return prevSingleLineState;
    });

    setState((prevState) => {
      const updatedChildren = [...prevState[key].children];
      updatedChildren[index] = {
        ...updatedChildren[index],
        htmlContent: newHtmlContent.documentElement.innerHTML,
      };
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          children: updatedChildren,
        },
      };
    });
  };

  const uploadImageAndUpdateState = async (
    file,
    key,
    index,
    newHtmlContent,
    setState
  ) => {
    const imageURL = await uploadImageCloudinary(file);
    if (imageURL) {
      const myInput = newHtmlContent.querySelector(".htmlContent");
      myInput.setAttribute("src", imageURL);

      // Update state with the Cloudinary URL
      setState((prevState) => {
        const updatedChildren = [...prevState[key].children];
        updatedChildren[index] = {
          ...updatedChildren[index],
          htmlContent: newHtmlContent.documentElement.innerHTML,
          cloudinaryURL: imageURL, // Add a property to store the Cloudinary URL
        };
        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            children: updatedChildren,
          },
        };
      });
    }
  };

  const inputEvent = (event) => {
    //---------------------------------------getting old html from selected element---------------------------------------------
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;

        const parser = new DOMParser();
        const newHtmlContent = parser.parseFromString(
          oldHtmlContent,
          "text/html"
        );
        //------------------------------------updating the element attribute-----------------------------------------------------

        const { name, value } = event.target;
        updateUserData({ [name]: value });
        switch (name) {
          case "heading-size":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              console.log("HEADING =>>>>>>>>>>>>>>>>>>>>>", myInput);
              const newHeading = document.createElement(`${value}`);
              console.log("NEW HEADING =>>>>>>>>>>>>>>>>>>>>>", newHeading);
              newHeading.innerHTML = myInput.innerHTML;
              newHeading.id = myInput.id;
              newHeading.className = myInput.className;
              myInput.parentNode.replaceChild(newHeading, myInput);
              setHeadingSizeState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      headingSize: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });
              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "heading-content":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.textContent = value;
              setHeadingContentState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      headingContent: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });
              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "margin":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");
              setMarginState(value);
              setLMarginState(value);
              setRMarginState(value);
              setBMarginState(value);
              setTMarginState(value);
              if (myInput2) {
                myInput2.style.marginTop = value;
                myInput2.style.marginBottom = value;
                myInput2.style.marginLeft = value;
                myInput2.style.marginRight = value;
              } else if (myInput1) {
                myInput1.style.marginTop = value;
                myInput1.style.marginBottom = value;
                myInput1.style.marginLeft = value;
                myInput1.style.marginRight = value;
              } else if (myInput) {
                myInput.style.marginTop = value;
                myInput.style.marginLeft = value;
                myInput.style.marginRight = value;
                myInput.style.marginBottom = value;
              }
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      margin: value,
                      marginLeft: value,
                      marginRight: value,
                      marginTop: value,
                      marginBottom: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "margin-left":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");
              setLMarginState(+value);
              console.log(
                "MARGIN LEFT =>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
                +value + +marginState
              );
              if (myInput2) {
                myInput2.style.marginLeft = +value;
              } else if (myInput1) {
                myInput1.style.marginLeft = +value;
              } else if (myInput) {
                myInput.style.marginLeft = +value;
              }
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      marginLeft: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "margin-right":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");
              setRMarginState(+value);
              if (myInput2) {
                myInput2.style.marginRight = +value;
              } else if (myInput1) {
                myInput1.style.marginRight = +value;
              } else if (myInput) {
                myInput.style.marginRight = +value;
              }
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      marginRight: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "margin-top":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");
              setTMarginState(+value);
              if (myInput2) {
                myInput2.style.marginTop = +value;
              } else if (myInput1) {
                myInput1.style.marginTop = +value;
              } else if (myInput) {
                myInput.style.marginTop = +value;
              }
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      marginTop: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;

          case "margin-bottom":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");
              setBMarginState(+value);
              if (myInput2) {
                myInput2.style.marginBottom = +value;
              } else if (myInput1) {
                myInput1.style.marginBottom = +value;
              } else if (myInput) {
                myInput.style.marginBottom = +value;
              }
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      marginBottom: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "padding":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");

              setPaddingState(value);
              setLPaddingState(value);
              setRPaddingState(value);
              setBPaddingState(value);
              setTPaddingState(value);

              if (myInput2) {
                myInput2.style.paddingTop = value;
                myInput2.style.paddingBottom = value;
                myInput2.style.paddingLeft = value;
                myInput2.style.paddingRight = value;
              } else if (myInput1) {
                myInput1.style.paddingTop = value;
                myInput1.style.paddingBottom = value;
                myInput1.style.paddingLeft = value;
                myInput1.style.paddingRight = value;
              } else if (myInput) {
                myInput.style.paddingTop = value;
                myInput.style.paddingLeft = value;
                myInput.style.paddingRight = value;
                myInput.style.paddingBottom = value;
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );

                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      padding: value,
                      paddingLeft: value,
                      paddingRight: value,
                      paddingTop: value,
                      paddingBottom: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };

                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;

          case "padding-left":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");

              setLPaddingState(+value);

              if (myInput2) {
                myInput2.style.paddingLeft = +value;
              } else if (myInput1) {
                myInput1.style.paddingLeft = +value;
              } else if (myInput) {
                myInput.style.paddingLeft = +value;
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );

                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      paddingLeft: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };

                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "padding-right":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");

              setRPaddingState(+value);

              if (myInput2) {
                myInput2.style.paddingRight = +value;
              } else if (myInput1) {
                myInput1.style.paddingRight = +value;
              } else if (myInput) {
                myInput.style.paddingRight = +value;
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );

                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      paddingRight: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };

                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;

          case "padding-top":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");

              setTPaddingState(+value);

              if (myInput2) {
                myInput2.style.paddingTop = +value;
              } else if (myInput1) {
                myInput1.style.paddingTop = +value;
              } else if (myInput) {
                myInput.style.paddingTop = +value;
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );

                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      paddingTop: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };

                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;

          case "padding-bottom":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");

              setBPaddingState(+value);

              if (myInput2) {
                myInput2.style.paddingBottom = +value;
              } else if (myInput1) {
                myInput1.style.paddingBottom = +value;
              } else if (myInput) {
                myInput.style.paddingBottom = +value;
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );

                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      paddingBottom: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };

                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "default_value":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.setAttribute("value", value);
              setDefaultState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      default: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "gap":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.setAttribute("style", "margin-left: " + value + "%");
              setGapState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      gap: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });
              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "width":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.setAttribute("style", "width: " + value + "%");
              setWidthState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      width: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                return prevSingleLineState;
              });
              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "label":
            {
              const myInput = newHtmlContent.querySelector(
                "label[for='htmlContent']"
              );
              myInput.textContent = value;
              setLabelState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      label: value, // Update only the 'label' property
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                // If the element is not found, return the unchanged state
                return prevSingleLineState;
              });
              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "multivalue-labels":
            {
              const parentId = event.target.id;

              //check and radio box
              if (
                newHtmlContent.querySelector(
                  `[id='${parentId}'] label[for='htmlContent']`
                ) ||
                newHtmlContent.querySelector(`[id='${parentId}'] input[type]`)
              ) {
                const myInput = newHtmlContent.querySelector(
                  `[id='${parentId}'] label[for='htmlContent']`
                );

                myInput.textContent = value;

                const myInputValue = newHtmlContent.querySelector(
                  `[id='${parentId}'] input[type]`
                );
                myInputValue.setAttribute("value", value);
              }

              //dropbox
              if (newHtmlContent.querySelector(`option[id='${parentId}']`)) {
                const myInput = newHtmlContent.querySelector(
                  `option[id='${parentId}']`
                );

                myInput.textContent = value;
                myInput.setAttribute("value", value);
              }

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "hideLabel":
            {
              setHideLabelState(event.target.checked);
              console.log(
                "HIDE LABEL STATE =>>>>>>>>>>>>>",
                event.target.checked
              );
              const myInput = newHtmlContent.querySelector(
                "label[for='htmlContent']"
              );

              if (event.target.checked) {
                myInput.textContent = "";
              } else {
                myInput.textContent = labelState;
              }
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      hideLabel: event.target.checked, // Update only the 'label' property
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                // If the element is not found, return the unchanged state
                return prevSingleLineState;
              });
              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "flex-direction":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              const myInput1 =
                newHtmlContent.querySelector(".htmlContentParent");
              const myInput2 = newHtmlContent.querySelector(
                ".htmlContentContainer"
              );

              //-----------check class nexting----possibally ruined from new structure-----//

              switch (value) {
                case "flex-column":
                  if (myInput2) {
                    myInput2.style.display = "flex";
                    myInput2.style.flexDirection = "column";
                  } else if (myInput1) {
                    myInput1.style.display = "flex";
                    myInput1.style.flexDirection = "column";
                  }
                  break;
                case "flex-row":
                  if (myInput2) {
                    myInput2.style.display = "flex";
                    myInput2.style.flexDirection = "row";
                  } else if (myInput1) {
                    myInput1.style.display = "flex";
                    myInput1.style.flexDirection = "row";
                  }
                  break;
                default:
                  break;
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      flexDirection: value, // Update only the 'label' property
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                // If the element is not found, return the unchanged state
                return prevSingleLineState;
              });
              setFlexDirectionState(value);

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "form_name":
            {
              const myInput = newHtmlContent.querySelector("h1");
              myInput.textContent = value;

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "font_size":
            {
              const myInputs2 = newHtmlContent.querySelector(
                ".htmlContentContainer"
              );
              const myInputs = newHtmlContent.querySelector(".htmlContent");
              const myInputs1 =
                newHtmlContent.querySelectorAll(".htmlContentLabel");

              if (myInputs) {
                myInputs.style.fontSize = value;
              }
              if (myInputs2) {
                myInputs2.style.fontSize = value;
              }
              myInputs1.forEach((myInput1) => {
                myInput1.style.fontSize = value;
              });
              setFontSizeState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      fontSize: value, // Update only the 'label' property
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                // If the element is not found, return the unchanged state
                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "placeholder":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.setAttribute("placeholder", value);
              setPlaceholderState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      placeholder: value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                // If the element is not found, return the unchanged state
                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          case "button-type":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");

              switch (value) {
                case "button":
                  myInput.setAttribute("type", value);
                  break;
                case "submit":
                  myInput.setAttribute("type", value);
                  break;
                case "reset":
                  myInput.setAttribute("type", value);
                  break;
                default:
                  break;
              }

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;

          case "image": {
            const myInput = newHtmlContent.querySelector(".htmlContent");
            if (myInput) {
              const file = event.target.files[0];
              if (file) {
                uploadImageAndUpdateState(
                  file,
                  key,
                  index,
                  newHtmlContent,
                  setState
                );
              }
            }
            break;
          }
          case "required":
            {
              const myInput2 = newHtmlContent.querySelector(
                "label[for='htmlContent']"
              );
              const myInput = newHtmlContent.querySelector(".htmlContent");
              if (myInput) {
                const newIsRequired = event.target.checked;
                setRequiredState(newIsRequired);
                if (newIsRequired) {
                  // setLabelState(prev => prev + '*');
                  myInput.setAttribute("required", "");
                } else {
                  myInput.removeAttribute("required");
                }
              }

              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      required: event.target.value,
                    },
                    ...prevSingleLineState.slice(indexToFind + 1),
                  ];
                }

                // If the element is not found, return the unchanged state
                return prevSingleLineState;
              });

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children];
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                };
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                };
              });
            }
            break;
          default:
            break;
        }
      } else {
        // console.log(`Object with id '${idToFind}' not found in data.`)
        // console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

      //---------------------------------------------------------------------------------------------------------------------
    } else {
      // console.log(`Invalid key '${key}' or array not found.`)
    }
  };

  return (
    <>
      <Box width={"100%"}>
        <Typography
          color={"GrayText"}
          variant="body2"
          mb={2}
          textAlign={"center"}
          display={"block"}
        >
          SELECTED : HEADING
        </Typography>
        <Typography
          variant="h7"
          mb={2}
          mt={2}
          sx={{ textDecoration: "underline" }}
          textAlign={"center"}
          display={"block"}
        >
          STYLING PROPERTIES
        </Typography>

        <Box
          mb={1}
          mt={2}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Margin</Typography>
          <Box>
            <Typography variant="caption">Custom</Typography>
            <Switch
              size="small"
              onClick={() => {
                setShowMarginAdvancedOptions((prevValue) => !prevValue);
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
          }}
          mb={3}
        >
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ style: { fontSize: "11px", height: "25px" } }}
            size="small"
            label="ALL"
            type="number"
            defaultValue={0}
            name="margin"
            onChange={inputEvent}
            value={marginState}
            disabled={showMarginAdvancedOptions ? true : false}
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            defaultValue={0}
            label="LEFT"
            inputProps={{ style: { fontSize: "11px", height: "25px" } }}
            value={lMarginState}
            name="margin-left"
            disabled={showMarginAdvancedOptions ? false : true}
            onChange={inputEvent}
            type="number"
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            inputProps={{ style: { fontSize: "11px", height: "25px" } }}
            value={rMarginState}
            defaultValue={0}
            onChange={inputEvent}
            name="margin-right"
            label="RIGHT"
            type="number"
            disabled={showMarginAdvancedOptions ? false : true}
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={tMarginState}
            defaultValue={0}
            inputProps={{ style: { fontSize: "11px", height: "25px" } }}
            label="TOP"
            name="margin-top"
            onChange={inputEvent}
            type="number"
            disabled={showMarginAdvancedOptions ? false : true}
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={bMarginState}
            defaultValue={0}
            inputProps={{ style: { fontSize: "11px", height: "25px" } }}
            name="margin-bottom"
            label="BOTTOM"
            onChange={inputEvent}
            disabled={showMarginAdvancedOptions ? false : true}
            type="number"
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
        </Box>
        <Box
          mb={1}
          mt={2}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Padding</Typography>
          <Box>
            <Typography variant="caption">Custom</Typography>
            <Switch
              size="small"
              onClick={() => {
                setShowPaddingAdvancedOptions((prevValue) => !prevValue);
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
          }}
          mb={3}
        >
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            label="ALL"
            type="number"
            defaultValue={0}
            name="padding"
            onChange={inputEvent}
            value={paddingState}
            disabled={showPaddingAdvancedOptions ? true : false}
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            defaultValue={0}
            label="LEFT"
            value={lPaddingState}
            name="padding-left"
            disabled={showPaddingAdvancedOptions ? false : true}
            onChange={inputEvent}
            type="number"
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={rPaddingState}
            defaultValue={0}
            onChange={inputEvent}
            name="padding-right"
            label="RIGHT"
            type="number"
            disabled={showPaddingAdvancedOptions ? false : true}
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={tPaddingState}
            defaultValue={0}
            label="TOP"
            name="padding-top"
            onChange={inputEvent}
            type="number"
            disabled={showPaddingAdvancedOptions ? false : true}
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            value={bPaddingState}
            defaultValue={0}
            name="padding-bottom"
            label="BOTTOM"
            onChange={inputEvent}
            disabled={showPaddingAdvancedOptions ? false : true}
            type="number"
            sx={{
              width: "15%",
              "& input": {
                paddingRight: 0,
              },
            }}
          ></TextField>
        </Box>
        <Box
          mb={1}
          mt={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Width (%)</Typography>
        </Box>
        <Box sx={{ width: "90%" }}>
          <Slider
            name="width"
            min={0}
            value={widthState}
            onChange={inputEvent}
            defaultValue={0}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
          mb={3}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "black",
              width: "100%",
              marginBottom: "0",
            }}
            mb={3}
          >
            <FormControl
              size="small"
              sx={{ width: "48%", margin: "0", color: "black" }}
            >
              <InputLabel id="demo-simple-select-label">
                HEADING SIZE
              </InputLabel>
              <Select
                label="HEADING SIZE"
                id="filled-size-small"
                name="heading-size"
                onChange={inputEvent}
                value={headingSizeState}
                type="number"
                sx={{ width: "100%", color: "black" }}
              >
                <MenuItem value={"h1"}>H1</MenuItem>
                <MenuItem value={"h2"}>H2</MenuItem>
                <MenuItem value={"h3"}>H3</MenuItem>
                <MenuItem value={"h4"}>H4</MenuItem>
                <MenuItem value={"h5"}>H5</MenuItem>
                <MenuItem value={"h6"}>H6</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{
                border: "1px solid #d4d4d4",
                color: "#757575",
                width: "48%",
                display: "flex",
                justifyContent: "space-between",
                minHeight: "1.4375em",
                // margin: "10px 0",
              }}
              aria-describedby={idHeadingBackgroundColor}
              type="button"
              onClick={handleHeadingBackgroundColorChangeButtonClick}
            >
              <Box>COLOR</Box>
              <Box
                sx={{
                  width: "25px",
                  height: "25px",
                  border: "1px solid black",
                  backgroundColor: headingBackgroundColorState,
                }}
              ></Box>
            </Button>

            <Popover
              id={idHeadingBackgroundColor}
              open={openHeadingBackgroundColor}
              anchorEl={anchorElHeadingBackgroundColor}
              onClose={handleHeadingBackgroundColorClose}
              sx={{ height: "600px" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ width: "300px" }}>
                <ColorPicker
                  height={100}
                  color={headingBackgroundColor}
                  onChange={handleHeadingBackgroundColorChange}
                />
              </Box>
            </Popover>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
            marginTop: "0",
          }}
        ></Box>
        <TextField
          label="CONTENT"
          name="heading-content"
          type="text"
          onChange={inputEvent}
          value={headingContentState}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{ width: "100%", margin: "10px 0" }}
        />

        <Box
          mb={1}
          mt={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Alignment</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
          mb={3}
        >
          <ToggleButtonGroup
            value={alignmentState}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton onCh value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          mb={1}
          mt={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Format</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
          mb={3}
        >
          <ToggleButtonGroup
            value={formatsState}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton
              aria-describedby={idFont}
              onClick={handleFontColorChangeButtonClick}
              value="color"
              aria-label="color"
            >
              <FormatColorFillIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
            <Popper
              sx={{ width: "300px", height: "200px" }}
              id={idFont}
              open={openFont}
              anchorEl={anchorElFont}
            >
              <Box>
                <ColorPicker
                  height={100}
                  color={globalFontColor}
                  onChange={handleFontColorChange}
                />
              </Box>
            </Popper>
          </ToggleButtonGroup>
        </Box>
        <Box
          mb={1}
          mt={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Border</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            flexWrap: "wrap",
          }}
          mb={2}
        >
          <TextField
            label="BORDER SIZE"
            id="filled-size-small"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "48%", margin: "10px 0" }}
          />
          <TextField
            label="BORDER RADIUS"
            id="filled-size-small"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "48%", margin: "10px 0" }}
          />
          <FormControl
            size="small"
            sx={{ width: "100%", margin: "10px 0", color: "black" }}
          >
            <InputLabel id="demo-simple-select-label">BORDER TYPE</InputLabel>
            <Select
              label="BORDER TYPE"
              id="filled-size-small"
              type="number"
              sx={{ width: "48%", color: "black" }}
            >
              <MenuItem value={10}>Solid</MenuItem>
              <MenuItem value={20}>Dotted</MenuItem>
              <MenuItem value={30}>Dashed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          mb={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Custom CSS</Typography>
          <Button variant="contained">
            <Typography variant="caption">Apply</Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
          mb={3}
        >
          <Editor />
        </Box>
      </Box>
    </>
  );
};

export default Heading;

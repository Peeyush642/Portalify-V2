import { useState, useEffect, useContext } from "react";
import Editor from "@/components/FormBuilder/Editor/Editor";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  IconButton,
} from "@mui/material";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import { v4 as uuid } from "uuid";
import { uploadImageCloudinary } from "@/utils/fileupload";
import { UserContext } from "@/context/FormBuilderContext";
import { ColorPicker, useColor } from "react-color-palette";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const RadioButton = ({ Notice }) => {
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
  const [gFontColor, setGFontColor] = useState("#ffffff");

  const [anchorElFont, setAnchorElFont] = useState(null);
  const [options, setOptions] = useState([""]);

  const addOption = (e, elementType) => {
    const DDID=uuid();
    addRadioInState(DDID);
    // Add an empty string to the options array to render a new text field
    setOptions([...options,  {
      type: 'text',
      placeholder: 'Sample',
      onChange: { inputEvent },
      name: 'options',
      id: DDID,
      value: ``,
    },]);


  };

  const deleteOption = (index, id) => {
    const newOptions = [...options];
    newOptions.splice(index,1);
    setOptions(newOptions);
    removeOptionFromState(id);
  };

  const removeOptionFromState = (id) => {
    const key = selectedElement[0];
    
    if (key in state && Array.isArray(state[key].children)) {
      setState((prevState) => {
        const updatedChildren = prevState[key].children.map((child) => {
            console.log("idtofind",id);
            // If the id matches, remove the option from the htmlContent
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(child.htmlContent, 'text/html');
            const optionToRemove = htmlDoc.querySelector(`[id='${id}']`);
            console.log("option TO Remove",optionToRemove);
            if (optionToRemove) {
              optionToRemove.remove();
            }
            child.htmlContent = htmlDoc.documentElement.innerHTML;
          
          return child;
        });
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

  const handleOptionChange = (index, value) => {
    // Update the options array with the new value entered by the user
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  
  };

  const handleFontColorChange = (newColor) => {
    setGlobalFontColor(newColor);
    setGFontColor(newColor.hex);
    globalFontcolorInputEvent(newColor);
  };

  const handleFontColorChangeButtonClick = (event) => {
    setAnchorElFont(anchorElFont ? null : event.currentTarget);
  };

  const openFont = Boolean(anchorElFont);
  const idFont = openFont ? "simple-popper" : undefined;

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

  const [headingState, setHeadingState] = useState(
    indexToFind === -1 ? "Sample Label" : singleLineState[indexToFind].heading
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
          myInput2.style.marginRight = "auto";
          myInput2.style.marginLeft = "0";
          myInput2.style.textAlign = "left";
          break;
        case "center":
          myInput2.style.margin = "auto";
          myInput2.style.textAlign = "center";
          break;
        case "right":
          myInput2.style.marginLeft = "auto";
          myInput2.style.marginRight = "0";
          myInput2.style.textAlign = "right";

          break;
        default:
          break;
      }
    } else if (myInput1) {
      myInput1.style.display = "block";
      switch (value) {
        case "left":
          myInput1.style.marginRight = "auto";
          myInput1.style.marginLeft = "0";
          myInput1.style.textAlign = "left";
          break;
        case "center":
          myInput1.style.margin = "auto";
          myInput1.style.textAlign = "center";
          break;
        case "right":
          myInput1.style.marginLeft = "auto";
          myInput1.style.marginRight = "0";
          myInput1.style.textAlign = "right";

          break;
        default:
          break;
      }
    } else if (myInput) {
      myInput.style.display = "block";
      switch (value) {
        case "left":
          myInput.style.marginRight = "auto";
          myInput.style.marginLeft = "0";
          myInput.style.textAlign = "left";
          break;
        case "center":
          myInput.style.margin = "auto";
          myInput.style.textAlign = "center";
          break;
        case "right":
          myInput.style.marginLeft = "auto";
          myInput.style.marginRight = "0";
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
              const myInput = newHtmlContent.querySelector(".htmlContentWhole");
              myInput.setAttribute("style", "gap: " + value + "px");
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
              const myInput = newHtmlContent.querySelector(
                ".htmlContentContainer"
              );
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
          case "heading":
            {
              const myInput = newHtmlContent.querySelector(
                "h1[id='heading_value']"
              );
              myInput.textContent = value;
              setHeadingState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      heading: value, // Update only the 'label' property
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
          case "multivalue-headings":
            {
              const parentId = event.target.id;

              //check and radio box
              if (
                newHtmlContent.querySelector(
                  `[id='label_value'] label[for='htmlContent']`
                ) ||
                newHtmlContent.querySelector(`[id='label_value'] input[type]`)
              ) {
                const myInput = newHtmlContent.querySelector(
                  `[id='heading_value'] label[for='htmlContent']`
                );

                myInput.textContent = value;

                const myInputValue = newHtmlContent.querySelector(
                  `[id='heading_value'] input[type]`
                );
                myInputValue.setAttribute("value", value);
              }

              //dropbox
              if (newHtmlContent.querySelector(`option[id='option_value']`)) {
                const myInput = newHtmlContent.querySelector(
                  `option[id='option_value']`
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
          case "options":
            {
              const parentId = event.target.id;
              const myInput = newHtmlContent.querySelector(
                `[id='${parentId}'] label[for='htmlContent']`
              );
              myInput.textContent = value;
              myInput.setAttribute("value", value);
              
              setOptions(value);
              
              // myInput.setAttribute("value", value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      label: value,
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
              handleOptionChange(index, value);
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
              const myInput2 =
                newHtmlContent.querySelector(".htmlContentWhole");

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
              const myInputs = newHtmlContent.querySelector(
                ".htmlContentHeading"
              );
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

  //---resetting inputboxes in multivalue to initial state on change of elements
  // useEffect(() => {
  //   setInputBox(inputBoxArr)
  // }, [selectedElement])

  const inputBoxArr = [
    {
      type: "text",
      placeholder: "Enter Label",
      onChange: { inputEvent },
      name: "multivalue-labels",
      id: 1,
      value: ` `,
    },
  ];

  //----------------------for multiElement numbers-------------------------
  const [inputBox, setInputBox] = useState(inputBoxArr);
  const addMultiValueInputs = (e, elementType) => {
    e.preventDefault();

    setInputBox((s) => {
      const addId = uuid();
      if (elementType === 8) {
        addCheckboxInState(addId);
      } else if (elementType === 7) {
        addRadioInState(addId);
      } else if (elementType === 6) {
        addDropdownInState(addId);
      }
      return [
        ...s,
        {
          type: "text",
          placeholder: "Enter Label",
          onChange: { inputEvent },
          name: "multivalue-labels",
          id: addId,
          value: "sample",
        },
      ];
    });
  };

  const addDropdownInState = (id) => {
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;

    const newOption = `<option id=${id} value='sample'> Sample </option>`;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;

        setState((prevState) => {
          const selectEndIndex = oldHtmlContent.indexOf("</select>");
          const newContent =
            oldHtmlContent.slice(0, selectEndIndex) +
            newOption +
            oldHtmlContent.slice(selectEndIndex);

          const parser = new DOMParser();
          const newHtmlContent = parser.parseFromString(
            newContent,
            "text/html"
          );

          const radioButton = newHtmlContent.querySelector(
            'select[class="htmlContentContainer"][name="undefined"]'
          );
          if (radioButton) {
            radioButton.setAttribute("name", idToFind);
          }

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
    }
  };

  const addRadioInState = (id) => {
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;
    const newRadiobox = `<div id=${id} className='htmlContentParent'><input class='htmlContent' type='radio' name='${idToFind}' value=' '/>  <label class='htmlContentLabel' for='htmlContent'> Sample </label></div>`;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;

        setState((prevState) => {
          const targetIndex = oldHtmlContent.lastIndexOf("</div></div>"); // Find the index of the last occurrence of '</div>'
          const newContent =
            oldHtmlContent.slice(0, targetIndex) +
            newRadiobox +
            oldHtmlContent.slice(targetIndex);

          const parser = new DOMParser();
          const newHtmlContent = parser.parseFromString(
            newContent,
            "text/html"
          );

          const radioButton = newHtmlContent.querySelector(
            'input[type="radio"][name="undefined"]'
          );
          if (radioButton) {
            radioButton.setAttribute("name", idToFind);
          }

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
    }
  };

  const addCheckboxInState = (id) => {
    var index = -1;
    const key = selectedElement[0];
    const idToFind = selectedElement[1];
    const dataArray = state[key]?.children;
    const newCheckbox = `<div id=${id} className='htmlContentParent'><input class='htmlContent' type='checkbox' name='${idToFind}' value=' '/>  <label class='htmlContentLabel' for='htmlContent'> Sample </label></div>`;

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind);
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent;

        setState((prevState) => {
          //  const targetIndex = oldHtmlContent.indexOf('</div>', oldHtmlContent.indexOf('htmlContentContainer') + 'htmlContentContainer'.length) + '</div>'.length;
          //   const newContent = oldHtmlContent.slice(0, targetIndex) + newCheckbox + oldHtmlContent.slice(targetIndex);

          const targetIndex = oldHtmlContent.lastIndexOf("</div></div>"); // Find the index of the last occurrence of '</div>'
          const newContent =
            oldHtmlContent.slice(0, targetIndex) +
            newCheckbox +
            oldHtmlContent.slice(targetIndex);

          const parser = new DOMParser();
          const newHtmlContent = parser.parseFromString(
            newContent,
            "text/html"
          );

          const checkButton = newHtmlContent.querySelector(
            'input[type="checkbox"][name="undefined"]'
          );
          if (checkButton) {
            checkButton.setAttribute("name", idToFind);
          }

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
    }
  };

  useEffect(() => {
    updateUserData({
      label: "",
      min_length: "",
      max_length: "",
      form_name: "",
      element_heading: "",
      default_value: "",
      placeholder: "",
      //multi_label: "",
      form_image: "",
      required: false,
      // Add other variables you want to reset here
    });
    setInputBox(inputBoxArr);
  }, [selectedElement]);

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
          SELECTED : DROP DOWN
        </Typography>
        <Typography
          variant="h7"
          mb={2}
          mt={2}
          sx={{ textDecoration: "underline" }}
          textAlign={"center"}
          display={"block"}
        >
          INPUT PROPERTIES
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
            gap:"1rem"
          }}
        >
          <TextField
            label="Heading"
            id="filled-size-small"
            value={headingState}
            onChange={inputEvent}
            name="heading"
            type="text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "80%", margin: "10px 0" }}
          />

          <Button variant="outlined" onClick={addOption} sx={{width: "10rem", margin: "10px 0" }} >
            Add Option
          </Button>
        </Box>

        {/* Render text fields for each option */}
        {options.map((item, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              value={item.option}
              placeholder={item.placeholder}
              name="options"
              id={item.id || "1"}
              defaultValue="Sample"
              onChange={inputEvent}
              type={item.type}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              sx={{ width: "100%", margin: "12px 0" }}
            />
            {index !== 0 && (
              <IconButton
                onClick={() => deleteOption(index,item.id)}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "0.7rem",
                  // transform: "translate(50%, -50%)",
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
        >
          <TextField
            label="Default Value"
            name="default_value"
            value={defaultState}
            onChange={inputEvent}
            id="filled-size-small"
            type="text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "48%", margin: "10px 0" }}
          />
          <TextField
            label="Placeholder"
            name="placeholder"
            value={placeholderState}
            onChange={inputEvent}
            id="filled-size-small"
            type="text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "48%", margin: "10px 0" }}
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
          <FormControlLabel
            sx={{ margin: "0" }}
            onChange={inputEvent}
            checked={hideLabelState}
            name="hideLabel"
            control={<Switch color="primary" />}
            label="Hide Label"
            labelPlacement="start"
          />
          <FormControlLabel
            sx={{ margin: "0" }}
            value={required}
            onChange={inputEvent}
            checked={requiredState}
            name="required"
            control={<Switch color="primary" />}
            label="Required"
            labelPlacement="start"
          />
        </Box>
        <Typography
          variant="h7"
          mb={2}
          mt={2}
          textAlign={"center"}
          sx={{ textDecoration: "underline" }}
          display={"block"}
        >
          STYLING PROPERTIES
        </Typography>
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
        mb={1}
        mt={1}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Typography>Gap (%)</Typography>
      </Box>
      <Box sx={{ width: "90%" }}>
        <Slider
          name="gap"
          min={0}
          value={gapState}
          onChange={inputEvent}
          defaultValue={0}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box
        mt={1}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Typography>Flex Propeties</Typography>
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
        <FormControl
          size="small"
          sx={{ width: "48%", margin: "10px 0", color: "black" }}
        >
          <InputLabel id="demo-simple-select-label">Flex Direction</InputLabel>
          <Select
            label="Flex Direction"
            name="flex-direction"
            id="filled-size-small"
            onChange={inputEvent}
            defaultValue={flexDirectionState ? flexDirectionState : ""}
            type="number"
            sx={{ width: "100%", color: "black" }}
          >
            <MenuItem value={"flex-row"}>Row</MenuItem>
            <MenuItem value={"flex-column"}>Column</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ width: "48%", margin: "10px 0", color: "black" }}
        >
          <InputLabel id="demo-simple-select-label">Flex Wrap</InputLabel>
          <Select
            label="Flex Wrap"
            id="filled-size-small"
            type="number"
            sx={{ width: "100%", color: "black" }}
          >
            <MenuItem value={10}>Wrap</MenuItem>
            <MenuItem value={20}>No Wrap</MenuItem>
          </Select>
        </FormControl>
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
        mt={1}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Typography>Font</Typography>
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
        <FormControl
          size="small"
          sx={{ width: "48%", margin: "10px 0", color: "black" }}
        >
          <InputLabel id="demo-simple-select-label">FONTS</InputLabel>
          <Select
            label="FONTS"
            id="filled-size-small"
            type="number"
            sx={{ width: "100%", color: "black" }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          label="FONTS"
          id="filled-size-small"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{ width: "48%", margin: "10px 0" }}
        /> */}
        <TextField
          label="FONT SIZE"
          onChange={inputEvent}
          defaultValue={16}
          name="font_size"
          value={fontSizeState}
          id="filled-size-small"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{ width: "48%", margin: "10px 0" }}
        />
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
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="caption" fontSize={14}>
            Custom CSS
          </Typography>
          <Tooltip title="property-name : value">
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Button
          onClick={addCustomCssHandler}
          sx={{ backgroundColor: "#447cbf" }}
          variant="contained"
        >
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
        <Editor
          onChange={(e) => {
            setCustomCSS(e);
          }}
        />
      </Box>
    </>
  );
};

export default RadioButton;
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import { v4 as uuid } from "uuid";
import { uploadImageCloudinary } from "@/utils/fileupload";
import { UserContext } from "@/context/FormBuilderContext";
import { ColorPicker, useColor } from "react-color-palette";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Button_s = ({ Notice }) => {
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
  const [heightState, setHeightState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].height
  );
  const [buttonContentState, setButtonContentState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].buttonContent
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
    setAlignmentState(newAlignment);
    const value = newAlignment;
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
          case "btn":
            {
              const targetBtn = event.target;
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.style.cssText = targetBtn.style.cssText;
              console.log("MY INPUT =>>>>>>>>>>>>>>>>>>>>>", myInput);
              console.log("EVENT =>>>>>>>>>>>>>>>>>>>>>", event.target);
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
          case "btn-content":
            {
              setButtonContentState(value);
              const myInput = newHtmlContent.querySelector(".htmlContent");
              console.log("MY INPUT =>>>>>>>>>>>>>>>>>>>>>", myInput);
              myInput.value = value;
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      buttonContent: value,
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
          case "height":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.style.height = value;
              setHeightState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      height: value,
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

          case "width":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              // myInput.setAttribute("style", "width: " + value + "%");
              myInput.style.width = value;
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

          case "height":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.style.height = value;
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
          SELECTED : BUTTONS
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
            marginBottom: "0",
          }}
          mb={3}
        ></Box>
      </Box>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          gap: "0.25rem",
          justifyContent: "center",
        }}
      >
        {/* button 7 */}
        <input
          type="submit"
          name="btn"
          onClick={inputEvent}
          value="Submit"
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            cursor: "pointer",
            padding: "10px 20px",
            width: "100px",
            height: "50px",
            fontSize: "15px",
            fontFamily: "Segoe UI, system-ui, sans-serif",
            fontWeight: "500",
            transition: "0.8s",
            backgroundSize: "280% auto",
            backgroundImage:
              "linear-gradient(325deg, hsla(217, 100%, 56%, 1) 0%, hsla(194, 100%, 69%, 1) 55%, hsla(217, 100%, 56%, 1) 90%)",
            border: "none",
            borderRadius: "0.5em",
            color: "hsla(360, 100%, 100%, 1)",
            boxShadow:
              "0px 0px 20px rgba(71, 184, 255, 0.5), 0px 5px 5px -1px rgba(58, 125, 233, 0.25), inset 4px 4px 8px rgba(175, 230, 255, 0.5), inset -4px -4px 8px rgba(19, 95, 216, 0.35)",
          }}
          onMouseOver={() => {
            // Handle mouseover styles
            // Example: background-position: right top;
          }}
          onFocus={() => {
            // Handle focus styles
            // Example: outline: none; box-shadow: 0 0 0 3px hsla(360, 100%, 100%, 1), 0 0 0 6px hsla(217, 100%, 56%, 1);
          }}
          // Add other event handlers as needed
        />
        {/* button 11 */}
        <input
          type="submit"
          name="btn"
          onClick={inputEvent}
          className="b4"
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            fontFamily: "monospace",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            width: "100px",
            height: "50px",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style = {
              ...e.target.style,
              backgroundColor: "#3b82f6",
              boxShadow: "0 0 0 5px #3b83f65f",
              color: "#fff",
            })
          }
          onMouseOut={(e) => (e.target.style = { ...e.target.style })}
        />
        {/* button 4 */}
        <button class="b4">Submit</button>
        <style>{`
.b4{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}

.b4 {
  font-family: monospace;
  background-color:#3b82f6 ;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 50px;
  transition: .3s;
  
}

.b4:hover {
  background-color: #3b82f6;
  box-shadow: 0 0 0 5px #3b83f65f;
  color: #fff;
}
`}</style>
        {/* button 1 */}
        <button
          className="b1"
          name="btn"
          onClick={inputEvent}
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            position: "relative",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            paddingBlock: "0.5rem",
            paddingInline: "1.25rem",
            width: "110px",
            backgroundColor: "rgb(0 107 179)",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffff",
            gap: "5px",
            fontWeight: "bold",
            border: "3px solid #ffffff4d",
            outline: "none",
            overflow: "hidden",
            fontSize: "15px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.borderColor = "#fff9";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "none";
            e.target.style.borderColor = "#ffffff4d";
          }}
        >
          Submit
          <span
            className="icon"
            style={{
              width: "15px",
              height: "15px",
              transition: "all 0.3s ease-in-out",
            }}
          ></span>
        </button>
        {/* button 5*/}
        <input
          name="btn"
          onClick={inputEvent}
          type="submit"
          className="b5"
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            cursor: "pointer",
            position: "relative",
            padding: "10px 20px",
            fontSize: "15px",
            color: "#F3B431",
            border: "2px solid #F3B431",
            borderRadius: "34px",
            backgroundColor: "transparent",
            fontWeight: "600",
            transition: "all 0.3s cubic-bezier(0.23, 1, 0.320, 1)",
            overflow: "hidden",
          }}
          onMouseOver={(e) => {
            e.target.style.color = "#212121";
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 0px 20px #F3B431";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#F3B431";
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
          onMouseDown={(e) => (e.target.style.transform = "scale(1)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1.1)")}
        />
        {/* button 12*/}
        <button
          className="b12"
          name="btn"
          onClick={inputEvent}
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            cursor: "pointer",
            fontWeight: "700",
            width: "100px",
            height: "50px",
            transition: "all .2s",
            padding: "10px 20px",
            borderRadius: "100px",
            background: "#26ae60",
            border: "1px solid transparent",
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#2ecc72";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#26ae60";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "none";
          }}
        >
          SUBMIT
        </button>
        {/* button 10 */}
        <button
          className="b10"
          name="btn"
          onClick={inputEvent}
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            backgroundColor: "#eee",
            border: "none",
            padding: "10px 20px",
            fontSize: "15px",
            width: "100px",
            height: "50px",
            borderRadius: "1rem",
            color: "lightcoral",
            boxShadow: "0 0.4rem #dfd9d9",
            cursor: "pointer",
          }}
          onMouseDown={(e) => {
            e.target.style.color = "white";
            e.target.style.boxShadow = "0 0.2rem #dfd9d9";
            e.target.style.transform = "translateY(0.2rem)";
          }}
          onMouseUp={(e) => {
            e.target.style.color = "lightcoral";
            e.target.style.boxShadow = "0 0.4rem #dfd9d9";
            e.target.style.transform = "none";
          }}
          onMouseOver={(e) => {
            if (!e.target.disabled) {
              e.target.style.background = "#D63031";
              e.target.style.color = "white";
              e.target.style.textShadow = "0 0.1rem #bcb4b4";
            }
          }}
          onMouseOut={(e) => {
            if (!e.target.disabled) {
              e.target.style.background = "#eee";
              e.target.style.color = "lightcoral";
              e.target.style.textShadow = "none";
            }
          }}
          disabled={false} // Change to true if the button should be disabled
        >
          Submit
        </button>
        {/* button 2 */}
        <button
          className="b2"
          onClick={inputEvent}
          name="btn"
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            position: "relative",
            display: "inline-block",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: "15px",
            letterSpacing: "1px",
            textDecoration: "none",
            color: "#725AC1",
            background: "transparent",
            cursor: "pointer",
            transition: "ease-out 0.5s",
            border: "2px solid #725AC1",
            borderRadius: "10px",
            boxShadow: "inset 0 0 0 0 #725AC1",
          }}
          onMouseOver={(e) => {
            e.target.style.color = "white";
            e.target.style.boxShadow = "inset 0 -100px 0 0 #725AC1";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#725AC1";
            e.target.style.boxShadow = "inset 0 0 0 0 #725AC1";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "scale(0.9)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Submit
        </button>{" "}
        {/* button  8*/}
        <button
          name="btn"
          onClick={inputEvent}
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "15px",
            width: "100px",
            height: "45px",
            fontSize: "15px",
            position: "relative",
            border: "none",
            background: "transparent",
            padding: "0",
            cursor: "pointer",
            outlineOffset: "4px",
            transition: "filter 250ms",
            userSelect: "none",
            touchAction: "manipulation",
          }}
          onMouseOver={(e) => {
            e.target.style.filter = "brightness(110%)";
          }}
          onMouseOut={(e) => {
            e.target.style.filter = "none";
          }}
          onFocus={(e) => {
            e.target.style.outline = "none";
          }}
          onBlur={(e) => {
            e.target.style.outline = "none";
          }}
        >
          <span
            className="edge"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              background:
                "linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%)",
            }}
          ></span>
          <span
            className="front text"
            style={{
              display: "block",
              position: "relative",
              padding: "12px 27px",
              borderRadius: "12px",
              fontSize: "15px",
              color: "white",
              background: "hsl(345deg 100% 47%)",
              willChange: "transform",
              transform: "translateY(-4px)",
              transition: "transform 600ms cubic-bezier(.3, .7, .4, 1)",
            }}
          >
            Submit
          </span>
        </button>
        {/* button 9 */}
        <button
          className="b9"
          name="btn"
          onClick={inputEvent}
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            backgroundColor: "#FFFFFF",
            border: "1px solid rgb(209,213,219)",
            borderRadius: ".5rem",
            color: "#111827",
            fontFamily:
              'ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
            fontSize: ".875rem",
            fontColor: "#f9fafb",
            fontWeight: "600",
            lineHeight: "1.25rem",
            padding: ".75rem 1rem",
            textAlign: "center",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            cursor: "pointer",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            msTouchAction: "manipulation",
            touchAction: "manipulation",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f9fafb";
          }}
          onFocus={(e) => {
            e.target.style.outline = "2px solid #f9fafb";
            e.target.style.outlineOffset = "2px";
          }}
          onBlur={(e) => {
            e.target.style.outline = "none";
            e.target.style.outlineOffset = "none";
          }}
        >
          Submit
        </button>
        {/* button 6 */}
        <button
          name="btn"
          onClick={inputEvent}
          className="b6"
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            height: "50px",
            width: "100px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eeeeee4b",
            borderRadius: "3px",
            letterSpacing: "1px",
            transition: "all 0.2s linear",
            cursor: "pointer",
            border: "none",
            background: "#fff",
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow =
              "9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = "none";
            e.target.style.transform = "none";
          }}
        >
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
            style={{
              marginRight: "5px",
              marginLeft: "5px",
              fontSize: "20px",
              transition: "all 0.4s ease-in",
            }}
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
        {/* button 3 */}
        <input
          name="btn"
          onClick={inputEvent}
          type="submit"
          style={{
            display: "block",
            marginBottom: "10px",
            marginTop: "10px",
            width: "100px",
            height: "50px",
            verticalAlign: "center",
            position: "relative",
            fontSize: "15px",
            color: "#3b82f6",
            fontWeight: "600",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
            transition: "all ease 100ms",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "#cbdcf8";
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#cbdcf8";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#fff";
          }}
        />
      </div>

      <TextField
        label="CONTENT"
        name="btn-content"
        type="text"
        onChange={inputEvent}
        value={buttonContentState}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
        sx={{ width: "100%", margin: "10px 0" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
          width: "100%",
          marginBottom: "5",
        }}
        mb={3}
      >
        <TextField
          label="WIDTH"
          id="filled-size-small"
          type="number"
          value={widthState}
          defaultValue={100}
          name="width"
          onChange={inputEvent}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{ width: "48%", margin: "10px 0" }}
        />
        <TextField
          label="HEIGHT"
          value={heightState}
          defaultValue={30}
          name="height"
          onChange={inputEvent}
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
    </>
  );
};

export default Button_s;

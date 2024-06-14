import { useState, useEffect, useContext } from "react";
import Editor from "@/components/FormBuilder/Editor/Editor";
import { Button, TextField, Box, Typography, FormControl } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Switch from "@mui/material/Switch";
import { uploadImageCloudinary } from "@/utils/fileupload";
import { UserContext } from "@/context/FormBuilderContext";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColorPicker, useColor } from "react-color-palette";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LinkElement = ({ Notice }) => {
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

          case "width":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
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
          case "border-radius":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
              myInput.borderRadius = value;
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

          case "link-url": {
            const myInput = newHtmlContent.querySelector(".htmlContent");
            myInput.href = value;
            console.log("MYUASBDHBASJDBASJ", myInput);
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
            break;
          }
          case "label":
            {
              const myInput = newHtmlContent.querySelector(".htmlContent");
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
          SELECTED : LINK
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
          }}
        >
          <TextField
            label="URL"
            id="filled-size-small"
            onChange={inputEvent}
            name="link-url"
            type="text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "100%", margin: "10px 0" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
        >
          <TextField
            label="NAME"
            id="filled-size-small"
            onChange={inputEvent}
            name="label"
            type="text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "100%", margin: "10px 0" }}
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

export default LinkElement;

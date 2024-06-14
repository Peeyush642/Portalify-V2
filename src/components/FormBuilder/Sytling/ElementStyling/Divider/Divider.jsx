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
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Divider = ({ Notice }) => {
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
        myInput.style.borderColor = "none";
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

  const [borderRadiusState, setBorderRadiusState] = useState(
    indexToFind === -1 ? false : singleLineState[indexToFind].borderRadius
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

  const [imageState, setImageState] = useState(
    indexToFind === -1 ? null : singleLineState[indexToFind].image
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
              if (myInput1) {
                myInput1.style.marginTop = value;
                myInput1.style.marginBottom = value;
                myInput1.style.marginLeft = value;
                myInput1.style.marginRight = value;
              } else if (myInput2) {
                myInput2.style.marginTop = value;
                myInput2.style.marginBottom = value;
                myInput2.style.marginLeft = value;
                myInput2.style.marginRight = value;
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
              if (myInput1) {
                myInput1.style.marginLeft = +value;
              } else if (myInput2) {
                myInput2.style.marginLeft = +value;
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
              if (myInput1) {
                myInput1.style.marginRight = +value;
              } else if (myInput2) {
                myInput2.style.marginRight = +value;
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
              if (myInput1) {
                myInput1.style.marginTop = +value;
              } else if (myInput2) {
                myInput2.style.marginTop = +value;
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
              if (myInput1) {
                myInput1.style.marginBottom = +value;
              } else if (myInput2) {
                myInput2.style.marginBottom = +value;
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
              myInput.style.width = value + "%";
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
              console.log("BORDER RADIUS= >>>>>>>>>>>>>>>>>", myInput);
              myInput.style.borderRadius = value + "px";
              setBorderRadiusState(value);
              setSingleLineState((prevSingleLineState) => {
                const indexToFind = prevSingleLineState.findIndex(
                  (element) => element.id === idToFind
                );
                if (indexToFind !== -1) {
                  return [
                    ...prevSingleLineState.slice(0, indexToFind),
                    {
                      ...prevSingleLineState[indexToFind],
                      borderRadius: value,
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

          case "image": {
            const myInput = newHtmlContent.querySelector(".htmlContent");
            if (myInput) {
              const file = imageState ? imageState : event.target.files[0];
              setImageState(file);
              if (file) {
                uploadImageAndUpdateState(
                  file,
                  key,
                  index,
                  newHtmlContent,
                  setState
                );
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
                      image: value,
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
          }

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
  const [alignment, setAlignment] = useState("left");

  const [formats, setFormats] = useState(() => ["bold", "italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box width={"100%"}>
        <Typography
          color={"GrayText"}
          variant="body2"
          mb={2}
          textAlign={"center"}
          display={"block"}
        >
          SELECTED : DIVIDER
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
          <TextField
            label="WIDTH"
            id="filled-size-small"
            type="number"
            onChange={inputEvent}
            value={widthState}
            // defaultValue={200}
            name="width"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{ width: "48%", margin: "10px 0" }}
          />
          <TextField
            label="Height"
            id="filled-size-small"
            type="number"
            name="height"
            onChange={inputEvent}
            variant="outlined"
            value={heightState}
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
            <ToggleButton
            aria-describedby={idFont}
            onClick={handleFontColorChangeButtonClick}
            value="color"
            aria-label="color"
          >
            <FormatColorFillIcon sx={{ color: gFontColor }} />
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

        <Box sx={{ width: "200%" }} mt={2} mb={5}>
          <Button
            sx={{
              border: "1px solid #d4d4d4",
              color: "#757575",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            aria-describedby={idFont}
            type="button"
            onClick={handleFontColorChangeButtonClick}
          >
            <Box>
              DIVIDER COLOR
              <FormatColorFillIcon sx={{ marginLeft: "20px", color:gFontColor}} />
            </Box>
            <Box
              sx={{
                width: "25px",
                height: "25px",
                backgroundColor: gFontColor,
                marginLeft: "70px",
              }}
            ></Box>
          </Button>
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
    </Box>
  );
};

export default Divider;

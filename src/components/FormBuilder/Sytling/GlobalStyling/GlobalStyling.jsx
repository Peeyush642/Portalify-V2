import { useContext, useState } from "react";
import { UserContext } from "@/context/FormBuilderContext";
import Editor from "@/components/FormBuilder/Editor/Editor";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  Switch,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Popover from "@mui/material/Popover";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { ColorPicker, useColor } from "react-color-palette";
import Slider from "@mui/material/Slider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "react-color-palette/css";

import styles from "./GlobalStyling.module.css";

const GlobalStyling = ({ Notice }) => {
  const { state, setState } = useContext(UserContext);
  const key = Object.keys(state)[0];
  const initialData = state[key]?.htmlContent;

  const [globalBgColor, setGlobalBgColor] = useColor("#000000");
  const [globalBorderColor, setGlobalBorderColor] = useColor("#000000");
  const [globalFontColor, setGlobalFontColor] = useColor("#ffffff");
  const [gBorderColor, setGBorderColor] = useColor("#ffffff");
  const [gBgColor, setGBgColor] = useState(initialData.backgroundColor);
  const [gFontColor, setGFontColor] = useState(initialData.color);

  const [customCSS, setCustomCSS] = useState("");
  const [showPaddingAdvancedOptions, setShowPaddingAdvancedOptions] =
    useState(false);
  const [showMarginAdvancedOptions, setShowMarginAdvancedOptions] =
    useState(false);

  const [width, setWidth] = useState(initialData.width.replace(/%/g, ""));
  const [margin, setMargin] = useState(initialData.margin.replace(/px/g, ""));
  const [lMargin, setLMargin] = useState(
    initialData.marginLeft.replace(/px/g, "")
  );
  const [rMargin, setRMargin] = useState(
    initialData.marginRight.replace(/px/g, "")
  );
  const [tMargin, setTMargin] = useState(
    initialData.marginTop.replace(/px/g, "")
  );
  const [bMargin, setBMargin] = useState(
    initialData.marginBottom.replace(/px/g, "")
  );

  const [padding, setPadding] = useState(
    initialData.padding.replace(/px/g, "")
  );
  const [lPadding, setLPadding] = useState(
    initialData.paddingLeft.replace(/px/g, "")
  );
  const [rPadding, setRPadding] = useState(
    initialData.paddingRight.replace(/px/g, "")
  );
  const [tPadding, setTPadding] = useState(
    initialData.paddingTop.replace(/px/g, "")
  );
  const [bPadding, setBPadding] = useState(
    initialData.paddingBottom.replace(/px/g, "")
  );

  const [border, setBorder] = useState(initialData.border.replace(/px/g, ""));
  const [borderStyle, setBorderStyle] = useState(initialData.borderStyle);
  const [borderRadius, setBorderRadius] = useState(
    initialData.borderRadius.replace(/px/g, "")
  );

  const [fontSize, setFontSize] = useState(
    initialData.fontSize.replace(/px/g, "")
  );

  const [backgroundSize, setBackgroundSize] = useState(
    initialData.backgroundSize
  );

  const [selectedImage, setSelectedImage] = useState(null);

  const [bgRepeat, setBgRepeat] = useState(initialData.backgroundRepeat);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElFont, setAnchorElFont] = useState(null);
  const [anchorElBorderColor, setAnchorElBorderColor] = useState(null);

  const handleBackgroundColorChange = (newColor) => {
    setGlobalBgColor(newColor);
    setGBgColor(newColor.hex);
    globalBgcolorInputEvent(newColor);
  };

  const handleBorderColorChange = (newColor) => {
    setGlobalBorderColor(newColor);
    setGBorderColor(newColor.hex);
    globalBordercolorInputEvent(newColor);
  };

  const handleFontColorChange = (newColor) => {
    setGlobalFontColor(newColor);
    setGFontColor(newColor.hex);
    globalFontcolorInputEvent(newColor);
  };

  const handleBackgroundColorChangeButtonClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleBorderColorChangeButtonClick = (event) => {
    setAnchorElBorderColor(anchorElBorderColor ? null : event.currentTarget);
  };
  const handleFontColorChangeButtonClick = (event) => {
    setAnchorElFont(anchorElFont ? null : event.currentTarget);
  };

  const handleBorderColorClose = () => {
    setAnchorElBorderColor(null);
  };

  const handleFontColorClose = () => {
    setAnchorElFont(null);
  };
  const handleGlobalBgColorClose = () => {
    setAnchorEl(null);
  };

  const addCustomCssHandler = () => {
    const key = Object.keys(state)[0];

    if (!key || !state[key]) {
      console.error("Invalid key or state structure");
      return;
    }

    const dataArray = state[key]?.htmlContent;

    if (!dataArray) {
      console.error("Invalid dataArray");
      return;
    }

    console.log(customCSS);

    const propArray = customCSS.split("\n");

    console.log(propArray);

    setState((prevState) => {
      const newState = { ...prevState };
      const newHtmlContent = { ...dataArray };

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

        if (name && trimmedValue) {
          newHtmlContent[name] = trimmedValue;
        } else {
          console.error("Invalid property or value");
          continue;
        }
      }

      newState[key] = { ...prevState[key], htmlContent: newHtmlContent };

      return newState;
    });
  };

  const open = Boolean(anchorEl);
  const openFont = Boolean(anchorElFont);
  const openBorderColor = Boolean(anchorElBorderColor);

  const id = open ? "simple-popper" : undefined;
  const idBorderColor = openBorderColor ? "simple-popover" : undefined;
  const idFont = openFont ? "simple-popper" : undefined;

  //-----------------------------------------bgcontent color picker input-----------------------------------------------------------------
  const globalBgcolorInputEvent = (color) => {
    const dataArray = state[key]?.htmlContent;

    if (dataArray) {
      Object.keys(state).forEach((key) => {
        const oldHtmlContent = { ...dataArray };
        const name = "backgroundColor";
        oldHtmlContent[name] = color.hex;
        const newHtmlContent = { ...oldHtmlContent };
        setState((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            htmlContent: newHtmlContent,
          },
        }));
      });
    }
  };
  const globalBordercolorInputEvent = (color) => {
    const key = Object.keys(state)[0];
    const dataArray = state[key]?.htmlContent;

    if (dataArray) {
      const oldHtmlContent = { ...dataArray };
      const name = "borderColor";
      oldHtmlContent[name] = color.hex;
      const newHtmlContent = { ...oldHtmlContent };
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          htmlContent: newHtmlContent,
        },
      }));
    }
  };
  const globalFontcolorInputEvent = (color) => {
    //console.log('event==>', event)
    //---------------------------------------getting old html from selected element---------------------------------------------

    const key = Object.keys(state)[0];
    const dataArray = state[key]?.htmlContent;

    if (dataArray) {
      const oldHtmlContent = { ...dataArray };
      const name = "color";
      oldHtmlContent[name] = color.hex;
      const newHtmlContent = { ...oldHtmlContent };
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          htmlContent: newHtmlContent,
        },
      }));
    }
  };

  //--------------------------------------------------------------------------------------------------------------

  //---------------------------------GLOBAL STYLING-----------------------------

  const globalStylingHandler = (event) => {
    const value = event.target.value;
    let name = event.target.name;
    console.log("state from global styling =>>>>>>>>>>>>>>>", state);
    const key = Object.keys(state)[0];
    const dataArray = state[key]?.htmlContent;

    if (dataArray) {
      const oldHtmlContent = { ...dataArray };
      switch (name) {
        case "width":
          {
            setWidth(value);
            Object.keys(state).forEach((key) => {
              oldHtmlContent[name] = value + "%";
              const newHtmlContent = { ...oldHtmlContent };

              // // Update the state with the new HTML content
              setState((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  htmlContent: newHtmlContent,
                },
              }));
            });
          }
          break;
        case "margin":
          {
            setMargin(value);
            setLMargin(value);
            setRMargin(value);
            setBMargin(value);
            setTMargin(value);
            Object.keys(state).forEach((key) => {
              oldHtmlContent[name] = value + "px";

              const newHtmlContent = { ...oldHtmlContent };
              // Update the state with the new HTML content
              setState((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  htmlContent: newHtmlContent,
                },
              }));
            });
          }
          break;

        case "margin-left":
          {
            // name = "marginLeft";
            setLMargin(value);
            Object.keys(state).forEach((key) => {
              oldHtmlContent[name] = value + "px";
              const newHtmlContent = { ...oldHtmlContent };

              // Update the state with the new HTML content
              setState((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  htmlContent: newHtmlContent,
                },
              }));
            });
          }
          break;
        case "margin-right":
          {
            name = "marginRight";
            setRMargin(value);
            Object.keys(state).forEach((key) => {
              oldHtmlContent[name] = value + "px";
              const newHtmlContent = { ...oldHtmlContent };

              // Update the state with the new HTML content
              setState((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  htmlContent: newHtmlContent,
                },
              }));
            });
          }
          break;
        case "margin-top":
          {
            oldHtmlContent[name] = value + "px";
            setTMargin(value);
            const newHtmlContent = { ...oldHtmlContent };
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "margin-bottom":
          {
            oldHtmlContent[name] = value + "px";
            const newHtmlContent = { ...oldHtmlContent };
            setBMargin(value);
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;

        case "padding":
          {
            oldHtmlContent[name] = value + "px";
            setBPadding(value);
            setTPadding(value);
            setRPadding(value);
            setLPadding(value);
            setPadding(value);
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "padding-bottom":
          {
            name = "padding-bottom";
            oldHtmlContent[name] = value + "px";
            setBPadding(value);
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "padding-left":
          {
            name = "padding-left";
            oldHtmlContent[name] = value + "px";
            setLPadding(value);
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "padding-right":
          {
            name = "padding-right";
            oldHtmlContent[name] = value + "px";
            setRPadding(value);
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "padding-top":
          {
            name = "padding-top";
            oldHtmlContent[name] = value + "px";
            setTPadding(value);
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "border":
          {
            setBorder(value);
            console.log("border =>>>>>>>>>>>>>>>>>>", border);
            oldHtmlContent[name] = value + "px";
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "border-radius":
          {
            name = "borderRadius";
            setBorderRadius(value);
            oldHtmlContent[name] = value + "px";
            const newHtmlContent = { ...oldHtmlContent };
            console.log(newHtmlContent);
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "border-style":
          {
            name = "borderStyle";
            console.log("border Style =========>", value);
            setBorderStyle(value);
            oldHtmlContent[name] = value;
            const newHtmlContent = { ...oldHtmlContent };
            console.log(newHtmlContent);
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "font-color":
          {
            name = "fontColor";
            setBorderStyle(value);
            oldHtmlContent[name] = value;
            const newHtmlContent = { ...oldHtmlContent };
            console.log(newHtmlContent);
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "font-size":
          {
            name = "fontSize";
            setFontSize(value);
            oldHtmlContent[name] = value + "px";
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "font-family":
          {
            name = "fontFamily";
            
            oldHtmlContent[name] = value;
            const newHtmlContent = { ...oldHtmlContent };
            console.log(newHtmlContent);
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "background-repeat":
          {
            name = "backgroundRepeat";
            setBgRepeat(value);
            oldHtmlContent[name] = value;
            const newHtmlContent = { ...oldHtmlContent };
            console.log(newHtmlContent);
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "image-fit":
          {
            name = "backgroundSize";
            if (value === "fill") {
              const newValue = "100% 100%";
              setBackgroundSize(newValue);
              oldHtmlContent[name] = newValue;
              const newHtmlContent = { ...oldHtmlContent };
              console.log(newHtmlContent);
              // Update the state with the new HTML content
              setState((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  htmlContent: newHtmlContent,
                },
              }));
            } else {
              console.log("bgSize =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", value);
              setBackgroundSize(value);
              oldHtmlContent[name] = value;
              const newHtmlContent = { ...oldHtmlContent };
              console.log(newHtmlContent);
              // Update the state with the new HTML content
              setState((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  htmlContent: newHtmlContent,
                },
              }));
            }
          }
          break;

        case "background-image":
          {
            const file = event.target.files[0];
            console.log("file=>>>>>>>>>>>>>>>>>>>>>>>>>>>>", file);
            if (file) {
              let value = URL.createObjectURL(file);
              console.log("bgImage=>>>>>>>>>>>>>>>>>>>>>", value);
              oldHtmlContent[name] = `url('${value}')`;
              console.log(
                "bgImage=>>>>>>>>>>>>>>>>>>>>>",
                oldHtmlContent[name]
              );
              setSelectedImage(`url('${value}')`);
            }
            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        case "remove-background-image":
          {
            name = "background-image";
            console.log("asdhasdbasjbdhasjbhd", oldHtmlContent[name]);
            oldHtmlContent[name] = `url('')`;
            console.log("asdhasdbasjbdhasjbhd2", oldHtmlContent[name]);
            setSelectedImage(null);

            const newHtmlContent = { ...oldHtmlContent };

            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break;
        default:
          break;
      }
    }
  };

  const removeSelectedImageHandler = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        flexWrap: "wrap",
        textAlign: "left",
        color: "black",
      }}
    >
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
        <Typography>Form Width (%)</Typography>
      </Box>
      <Box sx={{ width: "90%" }}>
        <Slider
          name="width"
          min={35}
          value={width}
          onChange={globalStylingHandler}
          defaultValue={100}
          aria-label="Default"
          valueLabelDisplay="auto"
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
        <Typography>Global Margin</Typography>
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
          name="margin"
          onChange={globalStylingHandler}
          value={margin}
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
          label="LEFT"
          value={lMargin}
          name="margin-left"
          disabled={showMarginAdvancedOptions ? false : true}
          onChange={globalStylingHandler}
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
          value={rMargin}
          onChange={globalStylingHandler}
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
          value={tMargin}
          label="TOP"
          name="margin-top"
          onChange={globalStylingHandler}
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
          value={bMargin}
          name="margin-bottom"
          label="BOTTOM"
          onChange={globalStylingHandler}
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
        mt={1}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Global Padding</Typography>
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
          onChange={globalStylingHandler}
          name="padding"
          value={padding}
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
          label="LEFT"
          value={lPadding}
          disabled={showPaddingAdvancedOptions ? false : true}
          onChange={globalStylingHandler}
          name="padding-left"
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
          value={rPadding}
          onChange={globalStylingHandler}
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
          value={tPadding}
          onChange={globalStylingHandler}
          name="padding-top"
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
          value={bPadding}
          label="BOTTOM"
          onChange={globalStylingHandler}
          name="padding-bottom"
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
        <Typography>Global Border</Typography>
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
          type="number"
          name="border"
          onChange={globalStylingHandler}
          value={border}
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
          name="border-radius"
          value={borderRadius}
          onChange={globalStylingHandler}
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
          sx={{ width: "48%", margin: "10px 0", color: "black" }}
        >
          <InputLabel sx={{ fontSize: "15px" }} id="demo-simple-select-label">
            BORDER TYPE
          </InputLabel>
          <Select
            label="BORDER TYPE"
            name="border-style"
            id="filled-size-small"
            onChange={globalStylingHandler}
            sx={{ width: "100%", color: "black" }}
            value={borderStyle}
          >
            <MenuItem value={"solid"}>Solid</MenuItem>
            <MenuItem value={"dotted"}>Dotted</MenuItem>
            <MenuItem value={"dashed"}>Dashed</MenuItem>
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
            margin: "10px 0",
          }}
          aria-describedby={idBorderColor}
          type="button"
          onClick={handleBorderColorChangeButtonClick}
        >
          <Box>COLOR</Box>
          <Box
            sx={{
              width: "25px",
              height: "25px",
              border: "1px solid black",
              backgroundColor: gBorderColor,
            }}
          ></Box>
        </Button>
        {/* <Popover
          sx={{ width: "300px", height: "200px" }}
          id={idBorderColor}
          open={openBorderColor}
          anchorEl={anchorElBorderColor}
        > */}
        <Popover
          id={idBorderColor}
          open={openBorderColor}
          anchorEl={anchorElBorderColor}
          onClose={handleBorderColorClose}
          sx={{ height: "600px" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ width: "300px" }}>
            <ColorPicker
              height={100}
              color={globalBorderColor}
              onChange={handleBorderColorChange}
            />
          </Box>
        </Popover>
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
        <Typography>Global Font</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
          flexWrap: "wrap",
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
            name="font-family"
            sx={{ width: "100%", color: "black" }}
            onChange={globalStylingHandler}
          >
            <MenuItem value={"cursive"}>Cursive</MenuItem>
            <MenuItem value={"georgia"}>Georgia</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="FONT SIZE"
          id="filled-size-small"
          type="number"
          name="font-size"
          value={fontSize}
          onChange={globalStylingHandler}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{ width: "48%", margin: "10px 0" }}
        />
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
              FONT COLOR
              <FormatColorFillIcon
                sx={{ marginLeft: "20px", color: gFontColor }}
              />
            </Box>
            <Box
              sx={{
                width: "25px",
                height: "25px",
                border: "1px solid black",
                backgroundColor: gFontColor,
                marginLeft: "70px",
              }}
            ></Box>
          </Button>
          <Popover
            sx={{ height: "600px" }}
            id={idFont}
            open={openFont}
            anchorEl={anchorElFont}
            onClose={handleFontColorClose}
          >
            <Box sx={{ width: "300px" }}>
              <ColorPicker
                height={100}
                color={globalFontColor}
                onChange={handleFontColorChange}
              />
            </Box>
          </Popover>
        </Box>
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
        <Typography>Global Background Image</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "black",
          width: "100%",
        }}
      >
        <div className={styles.fileUploadDiv}>
          <label htmlFor="file" className={styles.fileUploadLabel}>
            <svg viewBox="0 0 640 512" height="1em" className={styles.icon}>
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <div className={styles.fileUploadDesign}>
              <p>Drag and Drop</p>
              <p>or</p>
              <span className={styles.browseButton}>Browse file</span>
            </div>
            <input
              onChange={globalStylingHandler}
              id="file"
              type="file"
              accept="image/*"
              name="background-image"
            />
          </label>
          {selectedImage && (
            <button
              name="remove-background-image"
              onClick={globalStylingHandler}
            >
              DELETE
            </button>
          )}
        </div>
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
          <InputLabel id="demo-simple-select-label">IMAGE FIT</InputLabel>
          <Select
            label="IMAGE FIT"
            name="image-fit"
            id="filled-size-small"
            value={backgroundSize}
            onChange={globalStylingHandler}
            sx={{ width: "100%", color: "black" }}
          >
            <MenuItem value={"fill"}>Fill</MenuItem>
            <MenuItem value={"contain"}>Contain</MenuItem>
            <MenuItem value={"cover"}>Cover</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ width: "48%", margin: "10px 0", color: "black" }}
        >
          <InputLabel id="demo-simple-select-label">IMAGE REPEAT</InputLabel>
          <Select
            label="IMAGE REPEAT"
            id="filled-size-small"
            name="background-repeat"
            value={bgRepeat}
            onChange={globalStylingHandler}
            type="number"
            sx={{ width: "100%", color: "black" }}
          >
            <MenuItem value={"repeat"}>Repeat</MenuItem>
            <MenuItem value={"no-repeat"}>No Repeat</MenuItem>
          </Select>
        </FormControl>
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
          aria-describedby={id}
          type="button"
          onClick={handleBackgroundColorChangeButtonClick}
        >
          <Box>
            BACKGROUND COLOR
            <FormatColorFillIcon sx={{ marginLeft: "20px", color: gBgColor }} />
          </Box>
          <Box
            sx={{
              width: "25px",
              height: "25px",
              border: "1px solid black",
              backgroundColor: gBgColor,
              marginLeft: "70px",
            }}
          ></Box>
        </Button>
        <Popover
          sx={{ height: "600px" }}
          id={id}
          onClose={handleGlobalBgColorClose}
          open={open}
          anchorEl={anchorEl}
        >
          <Box sx={{ width: "300px" }}>
            <ColorPicker
              height={100}
              color={globalBgColor}
              onChange={handleBackgroundColorChange}
            />
          </Box>
        </Popover>
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
    </Box>
  );
};

export default GlobalStyling;

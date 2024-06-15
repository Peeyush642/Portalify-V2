import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import classes from "../FormBuilder/FormBuilder.module.css";

const FormPreviewModal = ({
  isOpen,
  toggle,
  toggleSave,
  currentPage,
  state,
}) => {
  const [modalSize, setModalSize] = useState({
    minHeight: "90vh",
    minWidth: "90vw",
  });
  const [activeButton, setActiveButton] = useState("laptop");

  const handleSizeChange = (device) => {
    let minWidth = "90vw";
    let minHeight = "90vh";

    if (device === "phone") {
      minWidth = "380px";
      minHeight = "90vh";
    } else if (device === "tablet") {
      minWidth = "60vw";
      minHeight = "60vh";
    } else if (device === "laptop") {
      minWidth = "90vw";
      minHeight = "90vh";
    }

    setModalSize({ minWidth, minHeight });
    setActiveButton(device);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      className={classes.previewModal}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        style: modalSize,
        sx: {
          "&.MuiPaper-root": {
            transition: "all 0.5s ease",
          },
        },
      }}
    >
      <DialogTitle>
        <div className={classes.flexBetween}>
          Form Preview
          <div className={classes.flexBetween}>
            <Button
              className={activeButton === "phone" ? "activeModalSize" : ""}
              onClick={() => handleSizeChange("phone")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8 2C6.34315 2 5 3.34315 5 5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V5C19 3.34315 17.6569 2 16 2H8ZM7 5C7 4.44772 7.44772 4 8 4H16C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V5ZM10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H10Z"
                />
              </svg>
            </Button>
            <Button
              className={activeButton === "tablet" ? "activeModalSize" : ""}
              onClick={() => handleSizeChange("tablet")}
            >
              <svg width="24" height="24" viewBox="0 0 30 30">
                <path
                  fill="currentColor"
                  d="M23.001 4h-15c-1.105 0-2.001 0.896-2.001 2v20c0 1.104 0.896 2 2.001 2h15c1.104 0 1.999-0.896 1.999-2v-20c0-1.104-0.895-2-1.999-2zM15.5 27c-0.552 0-0.999-0.447-0.999-1s0.447-1 0.999-1c0.553 0 1.001 0.447 1.001 1s-0.448 1-1.001 1zM22.991 23.938h-15.026v-17.912h15.026v17.912z"
                />
              </svg>
            </Button>
            <Button
              className={activeButton === "laptop" ? "activeModalSize" : ""}
              onClick={() => handleSizeChange("laptop")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22,15H21V5a2,2,0,0,0-2-2H5A2,2,0,0,0,3,5V15H2a1,1,0,0,0-1,1,5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5A1,1,0,0,0,22,15ZM5,5H19V15H5ZM18,19H6a3.006,3.006,0,0,1-2.829-2H20.829A3.006,3.006,0,0,1,18,19Z"
                />{" "}
              </svg>
            </Button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent
        className={classes.dialogContent}
        sx={{
          "&.MuiDialogContent-root": {
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {/* Your modal body content */}
        {state &&
          Object.keys(state).map((key) => {
            const elements = state[key]?.children;
            const globalStyling = state[key]?.htmlContent;

            // Only render elements for the current page
            if (key === currentPage) {
              return (
                <form
                  key={key}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
                </form>
              );
            }

            return null; // Return null for pages other than the current page
          })}
      </DialogContent>
      <DialogActions>
        {/* Your modal footer content */}
        <Button variant="outlined" onClick={toggle}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            toggle();
            toggleSave();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPreviewModal;

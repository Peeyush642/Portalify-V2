import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import classes from "../FormBuilder/FormBuilder.module.css";
import NewForm from "../../assets/NewForm.json";
import Lottie from "lottie-react";
import UseTemplate from "../../assets/UseTemplate.json";

const NewFormModal = ({ isOpen, toggle, modalContent, modalTitle, minWidth ,minHeight }) => {
  const [modalSize, setModalSize] = useState({
    maxHeight: {minHeight},
    maxWidth: {minWidth},
  });

  return (
    <Dialog
      open={isOpen}
      // onClose={toggle}
      className={classes.previewModal}
      fullWidth
      maxWidth="lg"
      PaperProps={{
     
        sx: {
          "&.MuiPaper-root": {
            transition: "all 0.5s ease",
          },
        },
      }}
    >
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent
        className={classes.dialogContent}
        sx={{
          "&.MuiDialogContent-root": {
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {modalContent}
      </DialogContent>
    </Dialog>
  );
};

export default NewFormModal;

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function GenericModal(props) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxWidth: "90%",
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography
            id="modal-modal-title"
            textAlign={"center"}
            variant="h6"
            component="h2"
          >
            {props.heading}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.description ? props.description : ""}
          </Typography>
          <Button
            sx={{ marginTop: 2 }}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

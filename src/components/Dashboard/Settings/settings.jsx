"use client";
import { useState, useEffect } from "react";
import AuthService from "@/services/AuthService";
import { Box, Button } from "@mui/material";
import classes from "./Settings.module.css";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const Router = useRouter();
  let isAuthenticated = "";
  if (typeof window !== "undefined") {
    isAuthenticated = localStorage.getItem("isAuthenticated") || "";
  }
  let email = "";
  if (typeof window !== "undefined") {
    email = localStorage.getItem("user") || "";
  }

  // console.log("isAuthenticated==>", localStorage.getItem("isAuthenticated"));
  // console.log("user==>", localStorage.getItem("user"));
  // console.log("token==>", localStorage.getItem("token"));
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/account/signin");
      console.log("not authenticated");
    } 
    else {
      console.log("authenticated");
    }
  }, [isAuthenticated]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    //API
    AuthService.resetPasswordWithCurrentPassword({
      currentPassword,
      newPassword,
      confirmPassword,
      email,
    })
      .then((response) => {
        console.log(response);
        alert("Password Updated Successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form response:", error);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          position: "relative",
          padding: "3rem",
          width: "50%",
        }}
      >
        <Box
          sx={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#447cbf",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Password Reset
        </Box>

        <form onSubmit={handleSubmit}>
          <div className="password_reset">
            {error && <p>{error}</p>}
            <Box
              sx={{
                position: "relative",
                marginTop: "19px",
                fontWeight: "500",
                color: "#595959",
                fontSize: "18px",
              }}
            >
              Current Password
              <input
                className={classes.settings__input}
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                marginTop: "19px",
                fontWeight: "500",
                color: "#595959",
                fontSize: "18px",
              }}
            >
              New Password
              <input
                className={classes.settings__input}
                type="password"
                placeholder="New Password"
                value={newPassword}
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                marginTop: "19px",
                fontWeight: "500",
                color: "#595959",
                fontSize: "18px",
              }}
            >
              Confirm Password
              <input
                className={classes.settings__input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>

            <Button
              sx={{
                borderRadius: "8px",
                padding: "16px 24px",
                background:
                  "linear-gradient(94.43deg, #447cbf -18.98%, #111111 113.48%)",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                fontWeight: "600",
                fontSize: "16px",
                border: "1px solid #447cbf",
              }}
              style={{ margin: "20px auto", display: "block" }}
              type="submit"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default SettingsPage;

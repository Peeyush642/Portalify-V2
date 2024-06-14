"use client";
import { useState } from "react";
import { Menu, MenuItem, Divider, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import AuthService from "../../../services/AuthService";
import Image from "next/image";
import styles from "./navbar.module.css";
import { BiLogOut } from "react-icons/bi";

const TopBar = () => {
  const router = useRouter();
  const [toggleMenu, setToggleMenu] = useState(false);
  const open = Boolean(toggleMenu);
  const location = usePathname();
  // const { formID } = useParams();
  let userName = "";
  let avatar = "";

  if (typeof window !== "undefined") {
    userName = localStorage.getItem("userName") || "";
    avatar = localStorage.getItem("userAvatar") || "";
  }

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push("/account/signin");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userName");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className={`${styles.topbar} ${styles["d-flex"]}  ${styles["align-items-center"]} ${styles["justify-content-between"]}`}
    >
      <div className={styles.m2}>
        {location === "/settings" ? (
          <div
            className={`${styles.text} ${styles["my-auto"]} ${styles["topbar-head"]}`}
          >
            Settings
          </div>
        ) : location.startsWith("/responses") ? (
          <div
            className={`${styles.text} ${styles["my-auto"]} ${styles["topbar-head"]}`}
          >
            Responses
          </div>
        ) : location.startsWith("/templates") ? (
          <div
            className={`${styles.text} ${styles["my-auto"]} ${styles["topbar-head"]}`}
          >
            Templates
          </div>
        ) : (
          <div
            className={`${styles.text} ${styles["my-auto"]} ${styles["topbar-head"]}`}
          >
            Dashboard
          </div>
        )}
      </div>
      <div className={`${styles.m4}`}>
        <div className={`${styles["logout-dashboard"]} `}>
          <Tooltip arrow onClick={() => setToggleMenu(true)}>
            <div className={styles["profileMenu"]}>
              <div className={styles["user-image"]}>
                <Image
                  src={`data:image/png;base64,${avatar}`}
                  alt="icon"
                  width={"40"}
                  height={"40"}
                  borderRadius={"50%"}
                />
              </div>
              <div className={styles["user-name"]}>{userName}</div>
            </div>
          </Tooltip>
          {toggleMenu && (
            <Menu
              id="account-menu"
              open={open}
              onClose={() => setToggleMenu(false)}
              className={styles.accountMenu}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&.MuiMenu-paper": {
                      position: "relative",
                      top: { xs: "4.1rem !important", md: "4.6rem !important" },
                      width: { xs: "100%", md: "10rem" },
                      right: { xs: "1.6rem", md: "3rem" },
                      display: "flex",
                      justifyContent: "center",
                    },
                    "&.MuiMenu-paper a": {
                      color: "inherit",
                      textDecoration: "none",
                    },
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem className={styles.accountMenu_userName}>
                <div className={styles.userName}>{userName}</div>
              </MenuItem>

              <MenuItem>
                <a href="/"> Dashboard </a>
              </MenuItem>
              <MenuItem>
                <a href="/settings"> Settings </a>
              </MenuItem>

              <Divider />
              <MenuItem>
                <div className={styles["icon"]} onClick={handleLogout}>
                  <button
                    className={`${styles["primary-blue-text-grey-sm-button"]} ${styles["logout-button"]}`}
                  >
                    <BiLogOut width={"20px"} height={"20px"} /> Logout
                  </button>
                </div>
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

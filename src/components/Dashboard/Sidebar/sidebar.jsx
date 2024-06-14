"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../../../services/AuthService";
import Link from "next/link";
import styles from "./sidebar.module.css"; // Import CSS Modules styles
import logowhite from "../../../assets/logos/new-logo-white.png";
import smiconwhite from "../../../assets/logos/sm-icon-white.png";
import Dashicon from "../../../assets/icons/dashboard_icon.png";
import SettingsIcon from "../../../assets/icons/settings_icon.png";
import BuilderIcon from "../../../assets/icons/builder_icon.png";
import TemplateIcon from "../../../assets/icons/template_icon.png";
import LogoutIcon from "../../../assets/icons/logout_icon.png";
import Image from "next/image";
const Sidebar = () => {
  const router = useRouter();
  let isAdmin = "";
  if (typeof window !== "undefined") {
    isAdmin = localStorage.getItem("isAdmin") || "";
  }
  console.log("isAdmin", isAdmin);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: Dashicon,
    },
    {
      path: "/formbuilder",
      name: "Builder",
      icon: BuilderIcon,
    },
    isAdmin && {
      path: "/templates",
      name: "Templates",
      icon: TemplateIcon,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: SettingsIcon,
    },
   
  ].filter(Boolean);



  const handleLogout = async () => {
    try {
      await AuthService.logout();
      // setIsAuthenticated(false); // Set authentication state to false
      router.push("/account/signin");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userName");
      localStorage.removeItem("userAvatar");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.leftSide}>
      <a href="/" className={styles.link} style={{ textDecoration: "none" }}>
        <div className={styles.logo}>
          {" "}
          <Image src={logowhite} alt="logo" className="img-fluid" />
          <Image src={smiconwhite} alt="logo" className="img-fluid" />
        </div>
      </a>

      <div className={styles.sidebar}>
        {menuItem.map((item, index) => (
          <div className={styles.dashboardButtons} key={index}>
            <Link href={item.path} className={styles.link}>
              <div className={styles.icon}>
                <Image src={item.icon} alt="icon" />
              </div>
              <div className={styles.linkText}>
                <span>{item.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={` ${styles.logoutDashboard}`} onClick={handleLogout}>
        <div className={styles.icon}>
          <Image src={LogoutIcon} alt="icon" />
        </div>
        <div className={styles.linkText}>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

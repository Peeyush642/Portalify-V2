"use client";
import Navbar from "./Navbar/navbar";
import Table from "./Table/table";
import Sidebar from "./Sidebar/sidebar";
import styles from "./dashboard.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = ({ content }) => {
  const router = useRouter();
   let isAuthenticated = localStorage.getItem("isAuthenticated") || "";

  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/signin");
    } else {
      console.log("authenticated");
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.container}>
        <div className={styles.row}>
          <Sidebar />

          <div className={styles.mainContent}>
            <Navbar />
            <div className={styles.content}> {content} </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

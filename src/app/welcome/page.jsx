"use client";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "./welcome.module.css";
import Image from "next/image";
import logo from "../../assets/logos/Logo-white.png";
export default function Page() {
    return (
        <section className={styles["welcome-screen"]}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt="logo"
              className={styles["img-fluid"]}
              width={200}
                height={80}
            />
          </div>
  
          <div className={styles.row}>
            <Player
              className={`${styles.confetti} ${styles.confetti_1}`}
              autoplay={true}
              loop={true}
              controls={true}
              src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json"
            ></Player>
            <Player
              className={`${styles.confetti} ${styles.confetti_2}`}
              autoplay={true}
              loop={true}
              controls={true}
              src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json"
            ></Player>
  
            <div className={styles["welcome-content"]}>
              <div className={styles["welcome-text"]}>
                Welcome to the 
                <div className={styles.roller}>
                  <span className={styles.rolltext}>
                    <br />
                    <Image
                      src={logo}
                      alt="logo"
                      className={styles["img-fluid"]}
                        width={150}
                        height={40}
                    />
                    <br />
                    <span className={styles.spare_time}>Dashboard</span>
                  </span>
                  <br />
                </div>
              </div>
            </div>
  
            <Player
              className={`${styles.confetti} ${styles.confetti_3}`}
              autoplay={true}
              loop={true}
              controls={true}
              src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json"
            ></Player>
            <Player
              className={`${styles.confetti} ${styles.confetti_4}`}
              autoplay={true}
              loop={true}
              controls={true}
              src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json"
            ></Player>
          </div>
        </div>
      </section>
    );
}


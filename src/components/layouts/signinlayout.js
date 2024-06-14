import React from "react";
import Image from "next/image";
import styles from "./signinscreen.module.css";
import logo from "../../assets/logos/Logo-white.png";
import image from "../../assets/sample-image.jpg";
import SignIn from "@/components/Forms/signin/signin";
const SignInScreen = ({ form }) => {
  return (
    <section className={styles["signin-screen"]}>
      <div className={styles.container}>
        <div className={`col-lg-7 ${styles["left-side"]}`}>
          <div className={styles.logo}>
            {" "}
            <Image src={logo} alt="logo" width={200} height={100} />{" "}
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt="sampleimage"
              className={`${styles["signin-image-child2"]} ${styles["signin-image-all"]} ${styles["img-fluid"]} ${styles["justify-centre"]}`}
              width={500}
              height={500}
            />
            <Image
              src={image}
              alt="sampleimage"
              className={`${styles["signin-image-child3"]} ${styles["signin-image-all"]} ${styles["img-fluid"]} ${styles["justify-centre"]}`}
              width={500}
              height={500}
            />
            <Image
              src={image}
              alt="sampleimage"
              className={`${styles["signin-image-child1"]} ${styles["signin-image-all"]} ${styles["img-fluid"]} ${styles["justify-centre"]}`}
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className={`'col-lg-5' ${styles["right-side"]}`}>{form}</div>
      </div>
    </section>
  );
};

export default SignInScreen;

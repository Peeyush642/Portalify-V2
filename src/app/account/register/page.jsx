"use client";
import React, { useState } from "react";
import SignInScreen from "../../../components/layouts/signinlayout";
import RegisterForm1 from "../../../components/Forms/register/register";
import RegisterForm2 from "@/components/Forms/register/registerCompany";
import { useRouter } from "next/navigation";

export default function Page() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(true);
  const [displayCompanyForm, setDisplayCompanyForm] = useState(false);


  const handleNextClick = () => {
    setDisplayRegisterForm(false);
    setDisplayCompanyForm(true);
  };

  return (
    <div>
      {displayCompanyForm ? (
        <SignInScreen form={<RegisterForm2 />} />
      ) : (
        <SignInScreen form={<RegisterForm1 onNextClick={handleNextClick} />} />
      )}
    </div>
  );
}

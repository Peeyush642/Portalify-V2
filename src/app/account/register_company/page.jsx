"use client";
import React, { useState } from "react";
import SignInScreen from "../../../components/layouts/signinlayout";
import RegisterForm2 from "@/components/Forms/register/registerCompany";
import { useRouter } from "next/navigation";

export default function Page() {

  return (
    <div>
        <SignInScreen form={<RegisterForm2 />} />
    </div>
  );
}

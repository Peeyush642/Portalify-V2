"use client";
import Navbar from "@/components/FormBuilder/FormNavbar/navbar";
import FormBuilder from "@/components/FormBuilder/FormBuilderC";
import FormBuilderContext from "@/context/FormBuilderContext";
import { useRouter } from 'next/router';
export default function Page()  {
  return (
    <>
      <Navbar />
      <FormBuilderContext>
      <FormBuilder />
      </FormBuilderContext>
    </>
  );
}
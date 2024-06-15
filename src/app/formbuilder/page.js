"use client";
import Navbar from "@/components/Formbuilder/FormNavbar/navbar";
import FormBuilder from "@/components/Formbuilder/FormBuilderC";
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
"use client";
import Navbar from "@/components/FormBuilder/Navbar/navbar";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
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
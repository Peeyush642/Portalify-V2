"use client";
import Navbar from "@/components/FormBuilder/FormNavbar/navbar";
import FormBuilder from "@/components/FormBuilder/FormBuilderC";
import FormBuilderContext from "@/context/FormBuilderContext";
export default function Page({ params }) {
  const formID = params.formid;
  console.log("tempId", formID);
  return (
    <>
      <Navbar />
      <FormBuilderContext>
        <FormBuilder formid={formID} />
      </FormBuilderContext>
    </>
  );
}
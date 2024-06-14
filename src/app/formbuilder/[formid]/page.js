"use client";
import Navbar from "@/Formbuilder/Navbar/navbar";
import FormBuilder from "@/FormBuilderC/FormBuilder";
import FormBuilderContext from "../../../context/FormBuilderContext";
export default function Page({ params }) {
  const formID = params.formid;
  console.log("formiddddd", formID);
  return (
    <>
      <Navbar />
      <FormBuilderContext>
        <FormBuilder formid={formID} />
      </FormBuilderContext>
    </>
  );
}

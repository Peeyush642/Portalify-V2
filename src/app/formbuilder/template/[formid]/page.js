"use client";
import Navbar from "@/components/Formbuilder/Navbar/navbar";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
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
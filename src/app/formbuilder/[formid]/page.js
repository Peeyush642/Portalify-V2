"use client";
import Navbar from "@/components/FormBuilder/Navbar/navbar";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import FormBuilderContext from "@/context/FormBuilderContext";
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

"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Template from "@/components/Dashboard/Template/Template.jsx";
export default function Page() {
  return (
    <>
      <Dashboard content={<Template />} />
    </>
  );
}
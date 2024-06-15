"use client";
import Dashboard from "@/components/Dashboard/dashboard";
import Settings from "@/components/Dashboard/Settings/settings";
export default function Page() {
  return (
    <>
      <Dashboard content={<Settings />} />
    </>
  );
}

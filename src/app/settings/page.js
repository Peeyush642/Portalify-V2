"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Settings from "@/components/Dashboard/Settings/settings";
export default function Page() {
  return (
    <>
      <Dashboard content={<Settings />} />
    </>
  );
}

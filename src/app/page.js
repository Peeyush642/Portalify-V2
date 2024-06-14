"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Table from "@/components/Dashboard/Table/table";
import { useEffect } from "react";

export default function Home() {
  return <Dashboard content={<Table />} />;
}

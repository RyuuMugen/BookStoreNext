"use client"
import Home from "@/app/home/page";
import { Loader } from "@mantine/core";
import { Suspense, useEffect } from "react";

export default function Page() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setInterval(() => {
        document.querySelector("body > nextjs-portal")?.remove();
      }, 10);
    }
  }, []);
  return (
    <>
      <Home />
    </>
  );
}

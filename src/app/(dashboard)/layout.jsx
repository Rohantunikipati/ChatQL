"use client";
import Leftbar from "@/components/leftbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

const layout = ({ children }) => {
  return (
    <SessionProvider>
      <div className="flex">
        <Leftbar />
        <div className="w-3/4">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default layout;

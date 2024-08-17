"use client";

import HomeContent from "@/components/HomeContent";
import Leftbar from "@/components/leftbar";
import Rightbar from "@/components/rightbar";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      {/* <SessionProvider> */}
      {/* {JSON.stringify(session)} */}
      <div className="absolute top-5 right-10" >
        <HomeContent />
      </div>
      <div className="w-[100vw] h-[100vh] flex ">
        <Leftbar />
        <Rightbar />
      </div>
      {/* </SessionProvider> */}
    </>
  );
}

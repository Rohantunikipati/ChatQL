"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function HomeContent() {
  const { data } = useSession();
  console.log(data);

  return (
    <main>
      {!data && (
        <Button className="px-10 py-5 " onClick={() => signIn("google")}>
          <img
            src="/google_log.svg"
            alt="Google"
            className="inline-block w-8 h-8 mr-2"
          />
          Sign In
        </Button>
      )}
    </main>
  );
}

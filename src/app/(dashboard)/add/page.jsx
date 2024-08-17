import { options } from "@/app/api/auth/[...nextauth]/options";
import { AddFriend } from "@/components/AddFriend";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Add = async () => {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  return (
    <div>
      <AddFriend user={session.user} />
    </div>
  );
};

export default Add;

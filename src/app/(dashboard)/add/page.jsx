import { options } from "@/app/api/auth/[...nextauth]/options";
import { AddFriend } from "@/components/AddFriend";
import { getServerSession } from "next-auth";
import React from "react";


const Add = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      <AddFriend user={session.user} />
    </div>
  );
};

export default Add;

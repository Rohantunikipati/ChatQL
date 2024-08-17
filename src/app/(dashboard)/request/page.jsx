import { options } from "@/app/api/auth/[...nextauth]/options";
import RequestHandler from "@/components/ui/RequestHandler";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Request = async () => {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  var requests;

  try {
    requests = await prisma.friendRequest.findMany({
      where: {
        request_receiver_id: session.user.id,
      },
      include: {
        request_sender: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <RequestHandler requests={requests} />
    </div>
  );
};

export default Request;

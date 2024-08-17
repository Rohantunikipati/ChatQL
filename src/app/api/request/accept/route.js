import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  return new Response(JSON.stringify({ message: "This is accept route" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function POST(request) {
  const { userId } = await request.json();
  console.log(userId);
  const session = await getServerSession(options);

  if (!session) redirect("/");
  var response;
  try {
    response = await prisma.friendShip.create({
      data: {
        user1_id: session.user.id,
        user2_id: userId,
      },
    });

    console.log(response);

    await prisma.friendRequest.delete({
        where: {
          request_sender_id_request_receiver_id: {
            request_sender_id: userId,
            request_receiver_id: session.user.id,
          },
        },
      });
      

    return NextResponse.json({ success: true, response }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

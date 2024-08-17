import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(request) {
  const { username } = await request.json();
  console.log(username);
  const session = await getServerSession(options);
  var user;
  try {
    user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    const relation = await prisma.friendRequest.create({
      data: {
        request_sender_id: session.user.id,
        request_receiver_id: user.id,
      },
    });

    await pusherServer.trigger(
      toPusherKey(`user:${username}:incoming_friend_requests`),
      "incoming_friend_requests",
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    );

    return NextResponse.json({ success: true, relation }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(request) {
  return new Response(JSON.stringify({ message: "Adding frined get route" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

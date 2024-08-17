import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(request) {
  const { text, chatId } = await request.json();

  const session = await getServerSession(options);

  const [userId1, userId2] = chatId.split("--");

  const friendId = session.user.id === userId1 ? userId2 : userId1;

  try {
    const addedMsg = await prisma.messege.create({
      data: {
        senderId: session.user.id,
        receiverId: friendId,
        content: text,
      },
    });

    await pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      "incoming-message",
      addedMsg
    );

    // await pusherServer.trigger(
    //   toPusherKey(`user:${friendId}:chats`),
    //   "new_message",
    //   {
    //     text,
    //     senderImg: session.user.image,
    //     senderName: session.user.name,
    //   }
    // );

    return NextResponse.json({ success: true, addedMsg }, { status: 201 });
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

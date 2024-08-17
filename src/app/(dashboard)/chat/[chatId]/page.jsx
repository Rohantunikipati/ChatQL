import { options } from "@/app/api/auth/[...nextauth]/options";
import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

async function getChatMessages(chatId) {
  try {
    const session = await getServerSession(options);
    const [userId1, userId2] = chatId.split("--");

    const friendId = session.user.id === userId1 ? userId2 : userId1;

    const results = await prisma.messege.findMany({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: friendId },
          { senderId: friendId, receiverId: session.user.id },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}

const Chat = async ({ params }) => {
  const { chatId } = params;
  const session = await getServerSession(options);

  const [userId1, userId2] = params.chatId.split("--");

  const { user } = session;

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  const chatPatner = await prisma.user.findFirst({
    where: {
      id: chatPartnerId,
    },
  });

  const initialMessages = await getChatMessages(chatId);

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex px-8 sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                src={chatPatner.image}
                alt={`${chatPatner.name} profile picture`}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatPatner.name}
              </span>
            </div>

            <span className="text-sm text-gray-600">{chatPatner.email}</span>
          </div>
        </div>
      </div>

      <Messages
        chatId={chatId}
        chatPartner={chatPatner}
        sessionImg={session.user.image}
        sessionId={session.user.id}
        initialMessages={initialMessages}
      />
      <ChatInput chatId={chatId} chatPartner={chatPatner} />
    </div>
  );
};

export default Chat;

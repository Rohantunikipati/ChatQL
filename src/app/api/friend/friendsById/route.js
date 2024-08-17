import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id } = await request.json();
  var friends;
  try {
    friends = await prisma.friendShip.findMany({
      where: {
        OR: [{ user1_id: id }, { user2_id: id }],
      },
      include: {
        user1: true,
        user2: true,
      },
    });

    // Extract friend details from the result
    const friendList = friends.map(friend => {
      if (friend.user1_id === id) {
        return friend.user2;
      } else {
        return friend.user1;
      }
    });

    // console.log(friendList);
    return NextResponse.json({ success: true, friendList }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

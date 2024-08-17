import { prisma } from "./prismaClient"; // Import your Prisma client instance

export async function get_friends_byID(id) {
  try {
    const friends = await prisma.friendShip.findMany({
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

    return friendList;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
}

export const chat_id_formator = (id1, id2) => {
  const str = [id1, id2].sort();
  return `${str[0]}--${str[1]}`;
};

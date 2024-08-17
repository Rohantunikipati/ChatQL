"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Github, GitPullRequestArrow, LogOut, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { chat_id_formator } from "@/lib/helper";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

const Leftbar = () => {
  const { data: session, status } = useSession();
  const [friends, setFriends] = useState([]);
  const [placeholderText, setPlaceholderText] = useState("Not logged in");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchFriends = async () => {
        try {
          const response = await axios.post("/api/friend/friendsById", {
            id: session.user.id,
          });
          setFriends(response.data.friendList);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      };
      fetchFriends();
      setPlaceholderText(session.user.name);
    } else if (status === "loading") {
      setPlaceholderText("Loading...");
    }
  }, [status, session]);

  return (
    <aside className="w-1/4 border-r-2 h-[100vh] overflow-hidden">
      <Input
        type="text"
        disabled
        placeholder="Search"
        className="m-3 w-[90%]"
      />
      <Link href="/" className="text-lg font-semibold text-gray-500">
        <div className="mb-4 ml-5">ChatQL</div>
      </Link>
      <div className="min-h-[55%] max-h-[57%] overflow-y-scroll scroll-black">
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <React.Fragment key={index}>
              <Link
                href={`/chat/${chat_id_formator(session.user.id, friend.id)}`}
                className="w-full py-4 px-8 flex gap-4 items-center p-1 rounded-md hover:bg-zinc-400 transition-all duration-50 cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex  gap-4 items-center"
                >
                  <Image
                    src={friend.image}
                    alt="profile"
                    width={35}
                    height={35}
                    className=" rounded-full"
                  ></Image>
                  <div>
                    <div className="text-xl">
                      {friend.name.split("|").splice(0, 1)}
                    </div>
                  </div>
                </motion.div>
              </Link>
              <Separator />
            </React.Fragment>
          ))
        ) : (
          <div className="w-full py-4 px-8 flex-col gap-4 items-center rounded-md transition-all duration-50 cursor-pointer">
            <div className="w-full p-3 flex gap-4 items-center">
              <Skeleton className=" w-10 h-10 rounded-full"></Skeleton>
              <div>
                <Skeleton className="h-4 w-[200px]"></Skeleton>
              </div>
            </div>
            <div className="w-full p-3 flex gap-4 items-center">
              <Skeleton className=" w-10 h-10 rounded-full"></Skeleton>
              <div>
                <Skeleton className="h-4 w-[200px]"></Skeleton>
              </div>
            </div>
            <div className="w-full p-3 flex gap-4 items-center">
              <Skeleton className=" w-10 h-10 rounded-full"></Skeleton>
              <div>
                <Skeleton className="h-4 w-[200px]"></Skeleton>
              </div>
            </div>
          </div>
        )}
      </div>
      <Separator className=" mx-auto bg-[#0F172A]" />
      <div className="py-2 w-full h-[30%]">
        <Link href="/add">
          <Button variant="outline" className="w-[90%] my-2 mx-3">
            <UserPlus className="w-4 h-4 mr-4" /> Add Friend
          </Button>
        </Link>
        <Link href="/request">
          <Button variant="outline" className="w-[90%] mx-3">
            <GitPullRequestArrow className="w-4 h-4 mr-4" />
            Friend Requests
          </Button>
        </Link>
        <Link href="https://github.com/Rohantunikipati/ChatQL">
          <Button className="w-[90%] my-2 mx-3">
            <Github className="w-4 h-4 mr-4" />
            Git-Hub
          </Button>
        </Link>
        <Select>
          <SelectTrigger className="w-[90%] mx-auto">
            <SelectValue placeholder={placeholderText} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <div className="flex items-center">
                {" "}
                <LogOut className="w-4 h-4 mr-4" /> Logout
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
};

export default Leftbar;

"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Check, TicketCheck, Trash2 } from "lucide-react";
import { Separator } from "./separator";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// [
//     {
//       id: 'clzuz5y3e0009pp7gr74hidaa',
//       request_sender_id: 'clzurzog60000do4r46ov5j01',
//       request_receiver_id: 'clzuu62vr0001do4rk23rmgxt',
//       createdAt: 2024-08-15T07:44:37.082Z,
//       status: 'PENDING',
//       request_sender: {
//         id: 'clzurzog60000do4r46ov5j01',
//         name: 'Rohan TUNIKIPAT',
//         email: 'rohantunikipat@gmail.com',
//         emailVerified: null,
//         image: 'https://lh3.googleusercontent.com/a/ACg8ocL4kPFR6xbXHijSGv-rZ2XuzZ-rQAVuihOHI3uQ_cRecpfjgQ=s96-c',
//         createdAt: 2024-08-15T04:23:47.332Z,
//         updatedAt: 2024-08-15T04:23:47.332Z
//       }
//     }
//   ]

const RequestHandler = ({ requests }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const AcceptReq = async id => {
    try {
      setLoading(true);
      toast.loading("Accepting..", { id: "1" });
      const res = await axios.post("/api/request/accept", { userId: id });
      toast.success("Accepted", { id: "1" });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong", { id: "1" });
    } finally {
      router.refresh();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="p-10 space-y-4 "
    >
      <h1 className="text-center text-5xl font-semibold">Your Request(s)</h1>
      <div className="flex-col">
        {requests.map((request, index) => {
          return (
            <div key={index}>
              <div className="px-24 text-xl py-5 font-semibold flex justify-between">
                <div className="flex gap-3 items-center">
                  <Image
                    src={request.request_sender.image}
                    alt="profile"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  {request.request_sender.name}
                </div>
                <div className="flex gap-5">
                  <Button onClick={() => AcceptReq(request.request_sender.id)}>
                    {" "}
                    <Check className="w-4 h-4 mr-2" /> Accept
                  </Button>
                  <Button variant="destructive">
                    {" "}
                    <Trash2 className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              </div>
              <Separator />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RequestHandler;

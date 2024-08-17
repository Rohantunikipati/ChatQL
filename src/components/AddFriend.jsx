"use client";
import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().email({
    message: "Invalid Mail Id.",
  }),
});

export function AddFriend({ user }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${user?.email}:incoming_friend_request`)
    );
    const friendRequestHandler = () => {
      console.log("Friend Request Send");
    };
    pusherClient.bind("incoming_friend_request", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${user?.email}:incoming_friend_request`)
      );
      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
    };
  }, []);

  const onSubmit = async data => {
    // console.log(data);
    setLoading(true);
    try {
      toast.loading("Sending Request ...", { id: "1" });
      console.log(data);
      const response = await axios.post("/api/friend/add", {
        username: data.username,
      });
      toast.success("Request Sent", { id: "1" });
    } catch (error) {
      console.log(error);
      toast.error("Somthing went worng", { id: "1" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="p-10"
    >
      <h1 className="text-center text-5xl font-semibold">Add Friend</h1>
      <div className="w-[40%] mx-auto mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail Id</FormLabel>
                  <FormControl>
                    <Input placeholder="user@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Search your friend by their mail id
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              <PlusCircle className="w-4 h-4 mr-2" /> Add
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}

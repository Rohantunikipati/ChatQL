import React from "react";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiPostgresql, SiPrisma, SiPusher } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

const Rightbar = () => {
  return (
    <main className="w-3/4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="pt-5 py-5"
      >
        <h1 className="text-center text-5xl font-semibold text-[#11131C]">
          ChatQL
        </h1>
        <div className="mt-8 px-10 space-y-8">
          <h1 className="text-lg">
            <span className="font-semibold">ChatQL</span> is a cutting-edge chat
            platform designed to communicate. Whether you're chatting with
            friends, family, or colleagues, ChatQl ensures a seamless, real-time
            experience. With the latest technologies powering the platform,
            you'll enjoy fast, reliable, and engaging conversations every time.
          </h1>
          <Separator />
          <div className="">
            <h1 className="text-4xl font-semibold">Tech Stack</h1>
            <ul className=" mt-3 text-lg p-5">
              <motion.li
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4"
              >
                <span className="font-semibold text-xl inline-block">
                  {" "}
                  <div className="flex items-center gap-1">
                    <RiNextjsFill className="w-6 h-6" />
                    <div> Next.js :</div>
                  </div>
                </span>
                Utilized for powerful server-side rendering, ensuring fast load
                times and enhanced SEO.
              </motion.li>
              <div className="my-5">
                <Separator />
              </div>
              <motion.li
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4"
              >
                <span className="font-semibold text-xl inline-block">
                  {" "}
                  <div className="flex items-center gap-1">
                    <RiTailwindCssFill className="w-6 h-6" />
                    <div> TailwindCSS :</div>
                  </div>
                </span>
                Created a sleek, visually appealing design with a consistent
                user interface.
              </motion.li>
              <div className="my-5">
                <Separator />
              </div>
              <motion.li
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4"
              >
                <span className="font-semibold text-xl inline-block">
                  {" "}
                  <div className="flex items-center gap-1">
                    <SiPusher className="w-6 h-6" />
                    <div> PusherJS :</div>
                  </div>
                </span>
                Enables real-time messaging for instant, delay-free
                communication.
              </motion.li>
              <div className="my-5">
                <Separator />
              </div>
              <motion.li
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4"
              >
                <span className="font-semibold text-xl inline-block">
                  {" "}
                  <div className="flex items-center gap-1">
                    <BiLogoPostgresql className="w-6 h-6" />
                    <div> PostgreSQL :</div>
                  </div>
                </span>
                A robust, reliable, and secure relational database with high
                performance.
              </motion.li>
              <div className="my-5">
                <Separator />
              </div>
              <motion.li
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4"
              >
                <span className="font-semibold text-xl inline-block">
                  {" "}
                  <div className="flex items-center gap-1">
                    <SiPrisma className="w-6 h-6" />
                    <div> Prisma ORM :</div>
                  </div>
                </span>
                Efficient and scalable tool for managing and interacting with
                your PostgreSQL database.
              </motion.li>
              <div className="mt-5">
                <Separator />
              </div>
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Rightbar;

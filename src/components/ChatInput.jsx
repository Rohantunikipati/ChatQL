"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { ArrowRightCircleIcon } from "lucide-react";

const ChatInput = ({ chatPartner, chatId }) => {
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      const res = await axios.post("/api/message", { text: input, chatId });
      console.log(res);
      setInput("");
      console.log(input);
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t flex border-gray-200 px-10 pt-4 mb-2 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="flex justify-between">
        <Button isLoading={isLoading} onClick={sendMessage} type="submit">
          Post <ArrowRightCircleIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;

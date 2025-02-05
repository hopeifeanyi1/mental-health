"use client"
import React, { useState, useRef } from "react";
import { SendIcon } from "./Icon";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height for dynamic resizing
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`; // Grow up to 200px

    // Check if textarea height is greater than the default (52px)
    setIsExpanded(newHeight > 52);

    // Enable scrolling only when max height (200px) is reached
    if (newHeight === 180) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  };

  return (
    <div className="col-span-5">
      <div className="bg-zinc-200 p-6 relative rounded-2xl h-[80dvh]">
        {/* Chat Input Container */}
        <div
          className={`flex items-end absolute bottom-7 left-[5%] bg-white w-[90%] px-4 py-1.5 min-h-[52px] transition-all duration-300 ${
            isExpanded ? "rounded-2xl" : "rounded-full"
          }`}
        >
          {/* Expanding Textarea */}
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInput(e);
            }}
            placeholder="Type your message here..."
            className="pl-2 mr-5 outline-none w-full resize-none bg-transparent"
            rows={1}
            style={{
              height: "auto",
              maxHeight: "180px", // Prevents exceeding 200px
              overflowY: "hidden", // Will be set to "auto" when 200px is reached
            }}
          />

          {/* Fixed Send Icon */}
          <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center shrink-0">
            <SendIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

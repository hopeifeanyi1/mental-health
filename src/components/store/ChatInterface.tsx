'use client'
import React, { useRef, useState } from "react";
import { SendIcon } from "./Icon";
import { useChat } from 'ai/react';

const ChatInterface = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use the chat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e); // AI SDK handler
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`;
    setIsExpanded(newHeight > 52);
    
    if (newHeight === 180) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  };

  return (
    <div className="lg:col-span-5 col-span-8">
      <div className="bg-zinc-200 p-6 relative rounded-2xl h-[80dvh]">
        {/* Chat messages container */}
        <div className="h-[calc(80dvh-160px)] overflow-y-auto mb-4">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <div className="text-sm whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input (keep your existing styling) */}
        <form 
          onSubmit={handleSubmit}
          className={`flex items-end absolute bottom-7 left-[5%] bg-white w-[90%] px-4 py-1.5 min-h-[52px] transition-all duration-300 ${
            isExpanded ? "rounded-2xl" : "rounded-full"
          }`}
        >
          <textarea
            ref={textAreaRef}
            value={input}
            onChange={handleInput}
            placeholder="Type your message here..."
            className="pl-2 mr-5 outline-none w-full resize-none bg-transparent"
            rows={1}
            style={{
              height: "auto",
              maxHeight: "180px",
              overflowY: "hidden",
            }}
            disabled={isLoading}
          />

          <button 
            type="submit" 
            className="bg-black rounded-full w-10 h-10 flex items-center justify-center shrink-0"
            disabled={isLoading}
          >
            <SendIcon className="w-6 h-6 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
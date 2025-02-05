'use client';
import React, { useState, useRef, useEffect } from "react";
import { SendIcon } from "./Icon";
import { useChat } from 'ai/react';

const ChatInterface = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error 
  } = useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error('Chat Error:', err);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`;
    setIsExpanded(newHeight > 52);

    textarea.style.overflowY = newHeight === 180 ? "auto" : "hidden";
  };

  return (
    <div className="col-span-8 lg:col-span-5">
      <div className="bg-zinc-200 p-6 relative lg:rounded-2xl lg:h-[80dvh] h-[94dvh]">
        <div className="h-[calc(80dvh-160px)] overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <div className="text-xs text-gray-500 mb-1">
                  {m.role === 'user' ? 'You' : 'Mental Health Assistant'}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          {error && (
            <div className="text-red-500 p-2 rounded bg-red-50">
              Error: {error.message}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

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
            className={`bg-black rounded-full w-10 h-10 flex items-center justify-center shrink-0 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin text-white">↻</div>
            ) : (
              <SendIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
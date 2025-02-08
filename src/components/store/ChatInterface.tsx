'use client';
import React, { useState, useRef, useEffect } from "react";
import { SendIcon } from "./Icon";
import { useChat } from 'ai/react';
import Link from "next/link";
import Logo from "./Logo";
import { LoaderCircle } from "lucide-react";
import { Dot } from "./Icon";

const ChatInterface = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (isLoading) {
      setShowTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setShowTyping(false);
      }, 1000);
    } else {
      setShowTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  useEffect(() => {
    if (!input && textAreaRef.current) {
      textAreaRef.current.style.height = '52px';
      setIsExpanded(false);
    }
  }, [input]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`;
    setIsExpanded(newHeight > 52);
    textarea.style.overflowY = newHeight === 180 ? "auto" : "hidden";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '52px';
    }
  };

  return (
    <div className="col-span-8 lg:col-span-5">
      <div className="lg:hidden block h-[6dvh] px-5 py-2 bg-zinc-200">
        <Link href='./' className="my-auto "><Logo/></Link>
      </div>
      <div className="bg-zinc-200 py-6 relative lg:rounded-2xl lg:h-[80dvh] h-[94dvh] ">
        <div className="lg:h-[calc(80dvh-135px)] h-[calc(80dvh-10px)] overflow-y-auto space-y-4 px-4 overflow-x-hidden">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                m.role === 'user' ? 'bg-blue-200' : 'bg-gray-100'
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
          
          {showTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                <div className="text-xs text-gray-500 mb-1">Mental Health Assistant</div>
                <div className="text-sm flex gap-1">
                  <Dot className="w-4 h-4 animate-pulse delay-0" />
                  <Dot className="w-4 h-4 animate-pulse delay-200" />
                  <Dot className="w-4 h-4 animate-pulse delay-400" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-500 p-2 rounded bg-red-50">
              Error: {error.message}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form 
          onSubmit={handleFormSubmit} 
          className={`flex items-end absolute lg:bottom-7 bottom-3 left-[5%] bg-white w-[90%] px-4 py-1.5 min-h-[52px] transition-all duration-300 ${isExpanded ? "rounded-2xl" : "rounded-full"}`}
        >
          <textarea
            ref={textAreaRef}
            value={input}
            onChange={handleInput}
            placeholder="Type your message here..."
            className="pl-2 lg:mr-5 mr-2 outline-none w-full resize-none bg-transparent max-h-[180px] overflow-y-hidden py-3"
            rows={1}
            disabled={isLoading}
          />

          <button 
            type="submit" 
            className={`bg-black rounded-full w-10 h-10 flex items-center justify-center shrink-0 ${isExpanded ? "" : "my-auto"} ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin text-white text-xl"><LoaderCircle className="w-4 h-4"/></div>
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
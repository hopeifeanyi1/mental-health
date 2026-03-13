'use client';
import React, { useState, useRef, useEffect } from "react";
import { SendIcon, Bars } from "./Icon";
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Link from "next/link";
import Logo from "./Logo";
import { LoaderCircle } from "lucide-react";
import { UserAuth } from "@/app/context/AuthContext";
import { saveChatMessage, getChatMessages } from "@/services/chatService";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { TbMessageCirclePlus } from "react-icons/tb";
import HistorySection from "./HistorySection";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet"

interface ChatInterfaceProps {
  selectedConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
}

const getMessageText = (message: { parts?: { type: string; text?: string }[] }): string => {
  if (message.parts) {
    return message.parts
      .filter((p) => p.type === 'text')
      .map((p) => p.text ?? '')
      .join('');
  }
  return '';
};

const ChatInterface = ({ selectedConversationId, onNewChat, onSelectConversation }: ChatInterfaceProps) => {
  const { user } = UserAuth();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [minTimeElapsed, setMinTimeElapsed] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [conversationId, setConversationId] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (selectedConversationId) {
      setConversationId(selectedConversationId);
    } else {
      setConversationId(uuidv4());
    }
  }, [selectedConversationId]);

  const { 
    messages,
    sendMessage,
    status,
    error,
    setMessages
  } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    id: conversationId,
    onFinish: async ({ message }) => {
      console.log('[useChat] onFinish fired, message:', JSON.stringify(message, null, 2));
      if (user && conversationId) {
        try {
          const messageText = getMessageText(message);
          console.log('[useChat] Extracted text:', messageText);
          if (input.trim()) {
            await saveChatMessage({
              userId: user.uid,
              role: 'user',
              content: input,
              timestamp: Timestamp.now(),
              conversationId: conversationId
            });
            await saveChatMessage({
              userId: user.uid,
              role: 'assistant',
              content: messageText,
              timestamp: Timestamp.now(),
              conversationId: conversationId
            });
          }
        } catch (err) {
          console.error("Failed to save chat message:", err);
        }
      }
    },
    onError: (err) => {
      console.error('[useChat] Error:', err);
    }
  });

  // Log every status and messages change
  useEffect(() => {
    console.log('[useChat] status changed:', status);
  }, [status]);

  useEffect(() => {
    console.log('[useChat] messages updated:', JSON.stringify(messages, null, 2));
  }, [messages]);

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    const loadConversation = async () => {
      if (user && selectedConversationId) {
        try {
          const chatMessages = await getChatMessages(selectedConversationId, user.uid);
          const formattedMessages = chatMessages.map(msg => ({
            id: msg.id || String(msg.timestamp.toMillis()),
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
            parts: [{ type: 'text' as const, text: msg.content }],
          }));
          setMessages(formattedMessages);
        } catch (err) {
          console.error("Failed to load conversation:", err);
        }
      } else {
        setMessages([]);
      }
    };
    loadConversation();
  }, [user, selectedConversationId, setMessages]);

  useEffect(() => {
    if (isLoading) {
      setMinTimeElapsed(false);
      timeoutRef.current = setTimeout(() => setMinTimeElapsed(true), 3000);
    } else {
      setMinTimeElapsed(true);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  useEffect(() => {
    if (selectedConversationId && isSheetOpen) setIsSheetOpen(false);
  }, [selectedConversationId, isSheetOpen]);

  const showTyping = isLoading || !minTimeElapsed;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  useEffect(() => {
    if (!input && textAreaRef.current) {
      textAreaRef.current.style.height = '52px';
      setIsExpanded(false);
    }
  }, [input]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`;
    setIsExpanded(newHeight > 52);
    textarea.style.overflowY = newHeight === 180 ? "auto" : "hidden";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    console.log('[useChat] Sending message:', input);
    sendMessage({ text: input });
    setInput('');
    if (textAreaRef.current) textAreaRef.current.style.height = '52px';
  };

  const handleNewChatClick = () => {
    setConversationId(uuidv4());
    setMessages([]);
    setInput('');
    onNewChat();
  };

  const handleSelectConversation = (id: string) => {
    onSelectConversation(id);
    setIsSheetOpen(false);
  };

  return (
    <div className="col-span-8 lg:col-span-5 ">
      <div className="lg:hidden block h-[6dvh] px-5 py-2 bg-zinc-200">
        <Link href='./' className="my-auto "><Logo/></Link>
      </div>
      <div className="bg-zinc-200 pt-1 pb-6 relative lg:rounded-2xl lg:h-[85dvh] h-[94dvh] ">
        <div className="flex justify-between items-center px-6 md:mb-3 mb-0.52">
          <div className="block lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger>
                <Bars className="w-7 h-7"/> 
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetDescription className="w-full h-full">
                    <HistorySection 
                      selectedConversationId={selectedConversationId} 
                      onSelectConversation={handleSelectConversation} 
                    />
                  </SheetDescription>
                </SheetHeader>
                <SheetClose className="hidden" />
              </SheetContent>
            </Sheet>
          </div>
          <button 
            onClick={handleNewChatClick}
            className="flex items-center text-sm md:bg-[#90b0cb] md:hover:bg-[#5e92bc] rounded-full px-3 md:py-1.5 md:mx-auto mt-0 md:mt-3"
          >
            <TbMessageCirclePlus size={25} />
            <p className="ml-1.5 text-[16px] hidden md:block">New Chat</p>
          </button>
        </div>
        
        <div className="lg:h-[calc(80dvh-135px)] h-[calc(80dvh-10px)] overflow-y-auto space-y-4 px-4 overflow-x-hidden">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="md:text-xl text-lg">Welcome {user?.displayName?.split(" ")[0]}</p>
                <p className="md:text-[16px] text-md">I&apos;m here to listen. How are you feeling today?</p>
              </div>
            </div>
          ) : (
            messages.map((m) => (
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
                  <div className="text-md whitespace-pre-wrap">
                    {getMessageText(m)}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {showTyping && (
            <div className="text-sm flex pl-4">
              <div className="bg-black/70 rounded-full w-[10px] h-[10px] mr-[8px] animate-pulse delay-0"/>
              <div className="bg-black/70 rounded-full w-[10px] h-[10px] mr-[8px] animate-pulse delay-200"/>
              <div className="bg-black/70 rounded-full w-[10px] h-[10px] animate-pulse delay-400"/>
            </div>
          )}

          {error && (
            <div className="text-red-500 p-2 rounded">
              {error.message}
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
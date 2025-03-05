// src/components/store/HistorySection.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Search, Trash2, MessageCircle } from "lucide-react";
import { UserAuth } from "@/app/context/AuthContext";
import { getChatHistory, deleteConversation, ChatMessage } from "@/services/chatService";
import { formatDistanceToNow } from 'date-fns';

interface HistorySectionProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const HistorySection = ({ selectedConversationId, onSelectConversation }: HistorySectionProps) => {
  const { user } = UserAuth();
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const history = await getChatHistory(user.uid);
          setConversations(history);
        } catch (error) {
          console.error("Failed to fetch chat history:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChatHistory();
    
    // Set up a refresh interval (every 30 seconds)
    const intervalId = setInterval(fetchChatHistory, 30000);
    
    return () => clearInterval(intervalId);
  }, [user]); // Don't include selectedConversationId to prevent loops

  // Update history when a conversation is selected or deleted
  useEffect(() => {
    if (user && selectedConversationId) {
      const fetchSingleConversation = async () => {
        try {
          const history = await getChatHistory(user.uid);
          setConversations(prev => ({...prev, ...history}));
        } catch (error) {
          console.error("Failed to update conversation:", error);
        }
      };
      
      fetchSingleConversation();
    }
  }, [selectedConversationId, user]);

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the conversation from being selected when deleting
    
    try {
      await deleteConversation(conversationId);
      
      // Update state to remove the deleted conversation
      setConversations(prev => {
        const updated = {...prev};
        delete updated[conversationId];
        return updated;
      });
      
      // Deselect if the deleted conversation was selected
      if (selectedConversationId === conversationId) {
        onSelectConversation('');
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  const filteredConversations = Object.entries(conversations)
    // Filter by search term
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, messages]) => {
      if (!searchTerm.trim()) return true;
      return messages.some(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    // Sort by most recent first based on last message timestamp
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .sort(([_, messagesA], [__, messagesB]) => {
      if (messagesA.length === 0) return 1;
      if (messagesB.length === 0) return -1;
      
      const timeA = messagesA[messagesA.length - 1].timestamp.toMillis();
      const timeB = messagesB[messagesB.length - 1].timestamp.toMillis();
      return timeB - timeA;
    });

  return (
    <div className='col-span-3 lg:block hidden'>
      <div className='bg-zinc-200 p-6 relative rounded-2xl h-[80dvh]'>
        <div className="flex justify-between items-center mb-4">
          <p className='font-semibold text-xl'>My Chats</p>
        </div>
        
        <div className='flex flex-row absolute top-16 left-[5%] bg-white h-[45px] rounded-full w-[90%]'>
          <Search size={23} color="#737373" className='my-auto ml-2'/>
          <input
            type="text"
            placeholder='Search your chats...'
            className='pl-2 outline-none w-5/6'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='mt-24 space-y-2 overflow-y-auto h-[calc(80dvh-250px)]'>
          {isLoading ? (
            <div className='text-center text-gray-500 mt-10'>
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className='text-center text-gray-500 mt-10'>
              {searchTerm ? 'No matching conversations found' : 'No chat history found'}
            </div>
          ) : (
            filteredConversations.map(([conversationId, messages]) => {
              if (messages.length === 0) return null;
              
              // Get the first user message for preview
              const userMessages = messages.filter(m => m.role === 'user');
              const previewMessage = userMessages.length > 0 
                ? userMessages[0].content 
                : 'New conversation';
              
              // Get the last message's timestamp for showing the time
              const lastMessage = messages[messages.length - 1];
              const timestamp = lastMessage.timestamp.toDate();

              return (
                <div 
                  key={conversationId} 
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                    selectedConversationId === conversationId 
                    ? 'bg-blue-100' 
                    : 'hover:bg-white/50'
                  }`}
                  onClick={() => onSelectConversation(conversationId)}
                >
                  <div className='flex items-center space-x-3'>
                    <MessageCircle className='text-gray-500' size={24} />
                    <div>
                      <p className='font-medium text-sm truncate max-w-[150px]'>
                        {previewMessage.length > 30 
                          ? `${previewMessage.slice(0, 30)}...` 
                          : previewMessage}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatDistanceToNow(timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => handleDeleteConversation(conversationId, e)}
                    className='hover:bg-red-100 rounded-full p-1 group'
                  >
                    <Trash2 
                      size={18} 
                      className='text-gray-500 hover:text-red-500 group-hover:scale-110 transition'
                    />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
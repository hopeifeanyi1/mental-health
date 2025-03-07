"use client";
import React, { useState, useEffect } from 'react';
import { Search, Trash2, Edit2 } from "lucide-react";
import { UserAuth } from "@/app/context/AuthContext";
import { 
  getChatHistory, 
  deleteConversation, 
  ChatMessage, 
  saveConversationTitle,
  getConversationTitles
} from "@/services/chatService";
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface HistorySectionProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const HistorySection = ({ selectedConversationId, onSelectConversation }: HistorySectionProps) => {
  const { user } = UserAuth();
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conversationTitles, setConversationTitles] = useState<Record<string, string>>({});
  const [newTitle, setNewTitle] = useState('');
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (user) {
        try {
          setIsLoading(true);
          setError(null);
          const history = await getChatHistory(user.uid);
          setConversations(history);
          
          try {
            // Handle titles separately, so if it fails, we still have chat history
            const titles = await getConversationTitles(user.uid);
            setConversationTitles(titles);
          } catch (titleError) {
            console.error("Failed to fetch conversation titles:", titleError);
            // Don't set an error - the app can function without titles
          }
        } catch (error) {
          console.error("Failed to fetch chat history:", error);
          setError("Failed to load chat history. Please try again later.");
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
          setError(null);
          const history = await getChatHistory(user.uid);
          setConversations(prev => ({...prev, ...history}));
          
          // Refresh titles
          const titles = await getConversationTitles(user.uid);
          setConversationTitles(titles);
        } catch (error) {
          console.error("Failed to update conversation:", error);
          // Don't show error here to avoid disrupting the UI
        }
      };
      
      fetchSingleConversation();
    }
  }, [selectedConversationId, user]);

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the conversation from being selected when deleting
    
    if (!user) return; // Make sure user is defined
    
    try {
      // Pass the userId parameter here
      await deleteConversation(conversationId, user.uid);
      
      // Update state to remove the deleted conversation
      setConversations(prev => {
        const updated = {...prev};
        delete updated[conversationId];
        return updated;
      });
      
      // Also remove the title
      setConversationTitles(prev => {
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
      setError("Failed to delete conversation. Please try again.");
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEditClick = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering conversation selection
    setCurrentEditingId(conversationId);
    setNewTitle(conversationTitles[conversationId] || '');
    setDialogOpen(true);
  };

  const handleRenameSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user || !currentEditingId || !newTitle.trim()) return;
    
    try {
      await saveConversationTitle(currentEditingId, user.uid, newTitle.trim());
      
      // Update local state
      setConversationTitles(prev => ({
        ...prev,
        [currentEditingId]: newTitle.trim()
      }));
      
      setDialogOpen(false);
      setCurrentEditingId(null);
      setNewTitle('');
    } catch (error) {
      console.error("Failed to rename conversation:", error);
      setError("Failed to rename conversation. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const getConversationTitle = (conversationId: string, messages: ChatMessage[]) => {
    // First check for custom title
    if (conversationTitles[conversationId]) {
      return conversationTitles[conversationId];
    }
    
    // Fallback to first user message
    const userMessages = messages.filter(m => m.role === 'user');
    return userMessages.length > 0 
      ? userMessages[0].content 
      : 'New conversation';
  };

  const handleConversationClick = (conversationId: string) => {
    onSelectConversation(conversationId);
    
    // If on mobile, close the sheet by clicking the sheet close button
    if (window.innerWidth < 1024) {
      // Find and click the sheet close button
      const closeButton = document.querySelector('[data-radix-collection-item]');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    }
  };

  const filteredConversations = Object.entries(conversations)
    // Filter by search term
    .filter(([conversationId, messages]) => {
      if (!searchTerm.trim()) return true;
      
      // Check if title matches search
      if (conversationTitles[conversationId]?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      
      // Check if any message content matches search
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
    <div className=''>
      <div className='lg:bg-zinc-200 lg:p-6 relative rounded-2xl h-[80dvh] lg:h-[85dvh] text-black'>
        <div className="flex justify-between items-center mb-4 mt-10 lg:mt-0">
          <p className='font-semibold text-xl'>My Chats</p>
        </div>
        
        <div className='flex flex-row absolute lg:border-none border border-1 lg:top-16 lg:left-[5%] top-[40px] left-0 bg-white h-[45px] rounded-full lg:w-[90%] w-[99%]'>
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
          {error && (
            <div className='text-red-500 p-2 bg-red-50 rounded-lg my-2'>
              {error}
            </div>
          )}
          
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
              
              // Get title (custom or first message)
              const displayTitle = getConversationTitle(conversationId, messages);
              
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
                  onClick={() => handleConversationClick(conversationId)}
                >
                  <div className='flex items-center space-x-3 text-left'>
                    <div>
                      <p className='font-medium lg:text-sm text-[15px] truncate max-w-[150px]'>
                        {displayTitle.length > 30 
                          ? `${displayTitle.slice(0, 30)}...` 
                          : displayTitle}
                      </p>
                      <p className='lg:text-xs text-[15px] text-gray-500'>
                        {formatDistanceToNow(timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className='flex space-x-[2px]'>
                        <div className='bg-black w-1 h-1 rounded-full'></div>
                        <div className='bg-black w-1 h-1 rounded-full'></div>
                        <div className='bg-black w-1 h-1 rounded-full'></div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-10'>
                      <DropdownMenuItem onClick={(e) => handleEditClick(conversationId, e)} className='text-md'>
                        <Edit2 className='mr-1 inline w-4 h-4 '/> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className='text-red-600 text-md' onClick={(e) => handleDeleteConversation(conversationId, e)} >
                        <Trash2 className='mr-1'/> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='w-[90vw] md:w-auto rounded-md'>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>
              Enter a new name for this chat conversation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter chat name"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='mt-2'>Cancel</Button>
            </DialogClose>
            <Button onClick={handleRenameSubmit} disabled={!newTitle.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default HistorySection;
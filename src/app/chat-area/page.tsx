"use client";
import React, { useEffect, useState } from "react";
import ChatInterface from "@/components/store/ChatInterface";
import HistorySection from "@/components/store/HistorySection";
import { useRouter } from "next/navigation";
import Logo from "@/components/store/Logo";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { UserAuth } from "../context/AuthContext";
import ProtectedRoute from "@/components/store/ProtectedRoute";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Page = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId || null);
  };

  const handleNewChat = () => {
    // Clear the selected conversation
    setSelectedConversationId(null);
  };

  return (
    <ProtectedRoute>
      <motion.div
        className="relative grid grid-cols-8 gap-x-12 h-[100dvh] lg:px-36 lg:pt-[12dvh] lg:pb-[7dvh] p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute hidden lg:block pt-5 pl-16">
          <Logo />
        </div>
        {user && (
          <div className="absolute lg:top-5 top-[5px] lg:right-16 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="h-10 w-10 rounded-full bg-neutral-200 hover:border-2 border-black/60">
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-600">
                        {user.displayName
                          ? user.displayName.charAt(0).toUpperCase()
                          : "U"}
                      </span>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px] lg:mr-16 mr-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{user.displayName || "Unknown User"}</DropdownMenuItem>
                <DropdownMenuItem>{user.email || "No Email"}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2 text-[#1b3d58]" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <HistorySection 
          selectedConversationId={selectedConversationId} 
          onSelectConversation={handleSelectConversation} 
        />
        
        <ChatInterface 
          selectedConversationId={selectedConversationId}
          onNewChat={handleNewChat}
        />
      </motion.div>
    </ProtectedRoute>
  );
};

export default Page;
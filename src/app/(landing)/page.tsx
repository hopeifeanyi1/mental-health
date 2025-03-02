'use client'
import Landing from "@/components/store/Landing";
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from "../context/AuthContext";


export default function Home() {

  const { user, loading } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    // If the user is already logged in, redirect to chat page
    if (!loading && user) {
      router.push('/chat-area');
    }
  }, [user, loading, router]);

  return (
    <motion.div className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        transition={{ duration: 1.5 }}>
      <Landing/>
    </motion.div>
  );
}

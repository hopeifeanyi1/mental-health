'use client'
import Landing from "@/components/store/Landing";
import { motion } from "framer-motion";


export default function Home() {
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

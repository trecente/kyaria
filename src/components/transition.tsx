"use client";

import { motion } from "framer-motion";

export function Transition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.main>
  );
}

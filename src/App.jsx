import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TikTokDownloader from "@/components/TikTokDownloader";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0F0F1A] via-[#131335] to-[#1A1A40] text-foreground">
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TikTokDownloader />
      </motion.main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
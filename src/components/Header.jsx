import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4 border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Download className="h-6 w-6 text-purple-500 ml-2" />
            <span className="text-xl font-bold gradient-text">TikSave</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              كيف يعمل
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              الأسئلة الشائعة
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
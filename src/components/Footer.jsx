import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-8 mt-12 border-t border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TikSave. جميع الحقوق محفوظة.
            </p>
          </div>
          <div className="flex space-x-6">
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
              سياسة الخصوصية
            </span>
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
              شروط الخدمة
            </span>
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
              اتصل بنا
            </span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            هذه الخدمة ليست تابعة لـ TikTok. نحن لا نستضيف أي مقاطع فيديو على خوادمنا.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
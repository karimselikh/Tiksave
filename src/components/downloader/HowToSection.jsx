import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const HowToSection = () => {
  const steps = [
    {
      title: "انسخ الرابط",
      description: "انسخ رابط فيديو تيك توك الذي تريد تنزيله. يمكنك العثور على ذلك من خلال النقر على زر \"مشاركة\" في تطبيق تيك توك ثم تحديد \"نسخ الرابط\".",
      bgColor: "bg-purple-600"
    },
    {
      title: "الصق الرابط",
      description: "الصق الرابط المنسوخ في حقل الإدخال في الأعلى وانقر على زر \"جلب\".",
      bgColor: "bg-indigo-600"
    },
    {
      title: "اختر وحمّل",
      description: "بعد ظهور معاينة الفيديو، اختر الجودة أو الصيغة المطلوبة وانقر على زر التنزيل المناسب.",
      bgColor: "bg-pink-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12"
    >
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        كيفية تنزيل فيديوهات تيك توك
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="card-gradient text-center">
            <CardContent className="pt-6">
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 ${step.bgColor}`}>
                <span className="text-xl font-bold text-white">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default HowToSection;
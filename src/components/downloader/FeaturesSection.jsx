import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Music, Gift, Layers, Globe, TerminalSquare, Wrench } from "lucide-react";

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="card-gradient h-full">
      <CardContent className="pt-6 text-center">
        <div className="bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    { 
      icon: <Zap className="h-8 w-8 text-white" />, 
      title: "جودات متعددة", 
      description: "اختر من بين جودات فيديو مختلفة لتناسب احتياجاتك.",
      delay: 0.1
    },
    { 
      icon: <Music className="h-8 w-8 text-white" />, 
      title: "صوت وفيديو", 
      description: "قم بتنزيل الفيديو كاملاً أو استخرج الصوت فقط بصيغة MP3.",
      delay: 0.2
    },
    { 
      icon: <Gift className="h-8 w-8 text-white" />, 
      title: "تحويل لـ GIF", 
      description: "حوّل مقاطع الفيديو القصيرة إلى صور GIF متحركة (محاكاة).",
      delay: 0.3
    },
    { 
      icon: <Layers className="h-8 w-8 text-white" />, 
      title: "تنزيل مجمع", 
      description: "أضف عدة فيديوهات إلى قائمة التنزيل وقم بتنزيلها دفعة واحدة (محاكاة).",
      delay: 0.4
    },
    { 
      icon: <Globe className="h-8 w-8 text-white" />, 
      title: "دعم متعدد اللغات", 
      description: "واجهة مستخدم تدعم لغات متعددة لتجربة عالمية (أساسي).",
      delay: 0.5
    },
    { 
      icon: <TerminalSquare className="h-8 w-8 text-white" />, 
      title: "واجهة API للمطورين", 
      description: "واجهة برمجة تطبيقات قوية للمطورين لدمج الخدمة (محاكاة).",
      delay: 0.6
    },
     { 
      icon: <Wrench className="h-8 w-8 text-white" />, 
      title: "أدوات إضافية", 
      description: "مجموعة من الأدوات الإضافية لمعالجة الفيديو (محاكاة).",
      delay: 0.7
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-10 text-white text-center">
        ميزات TikSave المتقدمة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            icon={feature.icon} 
            title={feature.title} 
            description={feature.description}
            delay={feature.delay}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
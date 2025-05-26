import React, { useState } from "react";
import { motion } from "framer-motion";
import VideoInputForm from "@/components/downloader/VideoInputForm";
import VideoPreview from "@/components/downloader/VideoPreview";
import DownloadOptions from "@/components/downloader/DownloadOptions";
import HowToSection from "@/components/downloader/HowToSection";
import FeaturesSection from "@/components/downloader/FeaturesSection";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

const TikTokDownloader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_BASE_URL = "https://tiktok-video-no-watermark2.p.rapidapi.com"; 
  const API_ENDPOINT_PATH = "/feed/download";
  const API_KEY = "c396808c76msh56126129817d5f7p1c1acejsnde716b63607a"; 
  const API_HOST = "tiktok-video-no-watermark2.p.rapidapi.com";

  const isValidTikTokUrl = (url) => {
    const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/[\w]+|m\.tiktok\.com\/v\/[\w.-]+\.html)/;
    return tiktokRegex.test(url);
  };

  const fetchVideoInfo = async () => {
    if (!videoUrl) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رابط فيديو تيك توك",
        variant: "destructive",
      });
      return;
    }

    if (!isValidTikTokUrl(videoUrl)) {
      toast({
        title: "رابط غير صالح",
        description: "الرجاء إدخال رابط فيديو تيك توك صالح. تأكد من أن الرابط يبدأ بـ https://www.tiktok.com/",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setVideoData(null);
    
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST
        }
      };
      
      const fullApiUrl = `${API_BASE_URL}${API_ENDPOINT_PATH}?url=${encodeURIComponent(videoUrl)}`;
      const response = await fetch(fullApiUrl, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "فشل في تحليل استجابة الخطأ من الخادم" }));
        const errorMessage = errorData.message || `فشل في جلب الفيديو: ${response.statusText}`;
        
        if (response.status === 404 && errorMessage.includes("does not exist")) {
             throw new Error(`نقطة النهاية '${API_ENDPOINT_PATH}' غير موجودة على الخادم. يرجى التحقق من مسار API.`);
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();

      if (result && result.code === 0 && result.data) {
        const apiData = result.data;
        setVideoData({
          id: apiData.aweme_id || `api-video-${Date.now()}`,
          title: apiData.title || apiData.desc || "فيديو تيك توك",
          thumbnail: apiData.cover || apiData.origin_cover?.url_list?.[0] || "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlrdG9rJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D",
          downloadUrl: apiData.play || apiData.video?.play_addr?.url_list?.[0], 
          author: apiData.author?.nickname || "@username",
          duration: apiData.duration ? (apiData.duration / 1000).toFixed(0) + "s" : "00:00",
          qualities: apiData.video?.ratio ? [apiData.video.ratio] : ["720p"], 
          audioOnlyUrl: apiData.music_info?.play_url?.uri || apiData.music?.play_url?.url_list?.[0],
          mp3Url: apiData.music_info?.play_url?.uri || apiData.music?.play_url?.url_list?.[0], 
          gifUrl: null 
        });
        toast({
          title: "نجاح!",
          description: "تم العثور على الفيديو وهو جاهز للتنزيل",
        });
      } else {
        throw new Error(result.message || "فشل في جلب معلومات الفيديو من API. تأكد أن الرابط صحيح وأن API يعمل.");
      }

    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "خطأ في API",
        description: error.message || "حدث خطأ أثناء الاتصال بالـ API. يرجى المحاولة مرة أخرى أو التحقق من الرابط.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (format, quality) => {
    if (!videoData) {
      toast({ title: "خطأ", description: "لا توجد بيانات فيديو للتنزيل.", variant: "destructive" });
      return;
    }

    let urlToDownload;
    let downloadFileName = `${(videoData.title || 'tiktok_video').replace(/[<>:"/\\|?*]+/g, '_')}`;
    let description = `جاري تنزيل الفيديو الخاص بك`;

    switch (format) {
      case "video":
        urlToDownload = videoData.downloadUrl;
        downloadFileName += `_${quality || 'no_watermark'}.mp4`;
        description = `جاري تنزيل الفيديو ${quality ? `بجودة ${quality}` : ''} بدون علامة مائية`;
        break;
      case "audio":
      case "mp3":
        urlToDownload = videoData.audioOnlyUrl || videoData.mp3Url;
        if (!urlToDownload) {
            toast({ title: "غير متوفر", description: "رابط تنزيل الصوت غير متوفر من الـ API.", variant: "destructive" });
            return;
        }
        downloadFileName += ".mp3";
        description = "جاري تنزيل الصوت (MP3)";
        break;
      case "gif":
        urlToDownload = videoData.gifUrl; 
        if (!urlToDownload) {
            toast({ title: "غير متوفر", description: "ميزة تحويل GIF غير مدعومة حاليًا من الـ API.", variant: "destructive" });
            return;
        }
        downloadFileName += ".gif";
        description = "جاري تحويل الفيديو إلى GIF وتنزيله";
        break;
      default:
        toast({ title: "خطأ", description: "صيغة تنزيل غير معروفة.", variant: "destructive" });
        return;
    }

    if (!urlToDownload || urlToDownload === "#") {
      toast({ title: "خطأ في الرابط", description: `رابط التنزيل لـ ${format} ${quality || ''} غير متوفر.`, variant: "destructive" });
      return;
    }
    
    toast({
      title: "بدء التنزيل",
      description: description,
    });

    const link = document.createElement('a');
    link.href = urlToDownload;
    link.setAttribute('download', downloadFileName);
    link.setAttribute('target', '_blank'); 
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            TikSave - أداة تحميل فيديوهات تيك توك
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            قم بتنزيل فيديوهات تيك توك بدون علامة مائية بجودة عالية، وحوّلها إلى MP3 أو GIF، والمزيد!
          </p>
        </div>

        <VideoInputForm
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          loading={loading}
          fetchVideoInfo={fetchVideoInfo}
        />

        {loading && (
           <div className="flex justify-center my-8">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
           </div>
        )}

        {videoData && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <VideoPreview videoData={videoData} />
            <DownloadOptions videoData={videoData} handleDownload={handleDownload} />
          </motion.div>
        )}
        
        <FeaturesSection />
        <HowToSection />
        
      </motion.div>
    </div>
  );
};

export default TikTokDownloader;
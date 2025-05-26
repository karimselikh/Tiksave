import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileAudio, FileVideo, Film, Gift } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

const DownloadOptions = ({ videoData, handleDownload }) => {
  const [selectedQuality, setSelectedQuality] = useState(videoData.qualities && videoData.qualities.length > 0 ? videoData.qualities[0] : '720p');

  return (
    <Card className="card-gradient glow overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white text-center md:text-right">خيارات التنزيل</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">تنزيل الفيديو (بدون علامة مائية)</h4>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-auto sm:flex-grow">
               <Select 
                  value={selectedQuality} 
                  onValueChange={setSelectedQuality}
                  disabled={!videoData.qualities || videoData.qualities.length === 0}
                >
                <SelectTrigger className="w-full input-gradient text-white">
                  <SelectValue placeholder="اختر الجودة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {videoData.qualities && videoData.qualities.map((quality) => (
                    <SelectItem key={quality} value={quality} className="hover:bg-purple-600">
                      {quality}
                    </SelectItem>
                  ))}
                   {(!videoData.qualities || videoData.qualities.length === 0) && (
                    <SelectItem value="720p" disabled>لا توجد جودات محددة</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => handleDownload("video", selectedQuality)}
              className="w-full sm:w-auto button-gradient flex-shrink-0"
              disabled={!videoData.downloadUrl && !(videoData.qualities && videoData.qualities.length > 0)}
            >
              <Download className="h-5 w-5 ml-2" />
              تنزيل {selectedQuality ? `(${selectedQuality})` : ''}
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">تنزيل الصوت فقط</h4>
          <Button
            onClick={() => handleDownload("audio")}
            variant="outline"
            className="w-full button-gradient border-purple-500 hover:border-purple-400 text-white"
            disabled={!videoData.audioOnlyUrl && !videoData.mp3Url}
          >
            <FileAudio className="h-5 w-5 ml-2" />
            تنزيل الصوت (MP3)
          </Button>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">تحويلات إضافية</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => handleDownload("mp3")}
              variant="outline"
              className="w-full button-gradient border-indigo-500 hover:border-indigo-400 text-white"
              disabled={!videoData.mp3Url && !videoData.audioOnlyUrl}
            >
              <Film className="h-5 w-5 ml-2" />
              تحويل إلى MP3
            </Button>
            <Button
              onClick={() => handleDownload("gif")}
              variant="outline"
              className="w-full button-gradient border-pink-500 hover:border-pink-400 text-white"
              disabled={!videoData.gifUrl}
            >
              <Gift className="h-5 w-5 ml-2" />
              تحويل إلى GIF {videoData.gifUrl ? '' : '(غير مدعوم)'}
            </Button>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">تنزيل مجمع (محاكاة)</h4>
          <Button
            onClick={() => alert("سيتم إضافة ميزة التنزيل المجمع قريباً!")}
            variant="outline"
            className="w-full button-gradient border-teal-500 hover:border-teal-400 text-white"
          >
            <Download className="h-5 w-5 ml-2" />
            إضافة إلى قائمة التنزيل المجمع
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default DownloadOptions;
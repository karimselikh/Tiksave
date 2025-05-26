import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const VideoPreview = ({ videoData }) => {
  return (
    <Card className="card-gradient glow overflow-hidden mb-8">
      <CardHeader>
        <CardTitle className="text-white text-center md:text-right">معاينة الفيديو</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 rounded-lg overflow-hidden aspect-video">
            <img
              src={videoData.thumbnail}
              alt="صورة مصغرة للفيديو"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2 space-y-3 text-center md:text-right">
            <h3 className="text-xl font-semibold text-white mb-1 break-words">
              {videoData.title}
            </h3>
            <p className="text-purple-300">{videoData.author}</p>
            <div className="flex items-center justify-center md:justify-start text-gray-300">
              <Clock className="h-4 w-4 ml-1 text-pink-400" />
              <span className="text-sm">المدة: {videoData.duration}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
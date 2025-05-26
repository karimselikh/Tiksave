import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Link as LinkIcon } from "lucide-react";

const VideoInputForm = ({ videoUrl, setVideoUrl, loading, fetchVideoInfo }) => {
  return (
    <Card className="card-gradient glow mb-8">
      <CardHeader>
        <CardTitle className="text-center text-white">
          أدخل رابط فيديو تيك توك
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-url" className="text-white">
              رابط الفيديو
            </Label>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Input
                id="video-url"
                placeholder="https://www.tiktok.com/@username/video/1234567890"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="input-gradient text-white"
                dir="ltr"
              />
              <Button 
                onClick={fetchVideoInfo} 
                disabled={loading}
                className="button-gradient"
              >
                {loading ? (
                  <Spinner className="h-5 w-5 border-white" />
                ) : (
                  <LinkIcon className="h-5 w-5 md:mr-2" />
                )}
                <span className="hidden md:inline">{loading ? "جاري الجلب..." : "جلب"}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoInputForm;
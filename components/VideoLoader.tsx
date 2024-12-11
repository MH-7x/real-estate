"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { TikTokEmbed, TikTokEmbedProps } from "react-social-media-embed";

function VideoLoader({ url }: { url: string }) {
  const mobile = useIsMobile();
  const options: TikTokEmbedProps = {
    url: "https://www.tiktok.com/@bright_home/video/7444134613615693088?is_from_webapp=1&sender_device=pc&web_id=7447066210908472850",
    linkText: "Watch on TikTok",
    width: mobile ? 340 : 600,
  };
  return (
    <div className="mt-10">
      <TikTokEmbed {...options} />
    </div>
  );
}

export default VideoLoader;

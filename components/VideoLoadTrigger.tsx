"use client";

import { useState } from "react";
import VideoLoader from "./VideoLoader";
import { Button } from "./ui/button";
import { PlayCircleIcon } from "lucide-react";

function VideoLoadTrigger({ url }: { url: string }) {
  const [startLoading, setStartLoading] = useState(false);
  return (
    <>
      {startLoading ? (
        <VideoLoader url={url} />
      ) : (
        <Button
          aria-label="Property Detail Video"
          className="w-72 mt-5 font-semibold"
          variant={"outline"}
          size={"lg"}
          onClick={() => setStartLoading(true)}
        >
          <PlayCircleIcon className="stroke-primary" /> Watch Video
        </Button>
      )}
    </>
  );
}

export default VideoLoadTrigger;

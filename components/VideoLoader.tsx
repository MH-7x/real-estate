"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
interface WindowWithFBAsyncInit extends Window {
  fbAsyncInit: () => void;
}
interface WindowWithFB extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FB: any;
}
function VideoLoader({ url }: { url: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set up the listener to detect when the Facebook SDK has fully loaded
    const handleFBSDKLoad = () => {
      // Facebook SDK is ready, mark video as loaded
      setIsLoaded(true);
    };

    (window as unknown as WindowWithFBAsyncInit).fbAsyncInit = () => {
      (window as unknown as WindowWithFB).FB.init({
        appId: "your-app-id", // You may need to add your Facebook App ID here
        xfbml: true,
        version: "v3.2",
      });
      handleFBSDKLoad();
    };

    // Load the Facebook SDK script asynchronously
    const scriptTag = document.createElement("script");
    scriptTag.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    return () => {
      // Cleanup the script when component unmounts
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="max-w-80">
      {/* Show loader while video is loading */}
      {!isLoaded && (
        <Skeleton className="w-11/12 mx-auto h-96 flex items-center justify-center rounded-xl">
          <div className="loader"></div>
        </Skeleton>
      )}

      {/* Facebook Post Embed */}
      <div
        className={`fb-post drop-shadow-xl overflow-hidden max-w-[500px] mx-auto mt-5 rounded-2xl ${
          isLoaded ? "block" : "hidden"
        }`}
        data-show-text="false"
        data-href={`${url}`}
        data-width={"350"}
        data-lazy={true}
      ></div>

      {/* Facebook SDK script */}
      <Script
        async
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
        strategy="afterInteractive"
      />

      {/* Optional styling for the loader */}
      <style jsx>{`
        .loader {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid green;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }

        .spinner {
          display: block;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default VideoLoader;

"use client";
import { useEffect, useRef, useState } from "react";

// Define the types for the Cloudinary widget instance and options
declare global {
  interface Window {
    cloudinary?: CloudinaryNamespace;
  }
}

interface CloudinaryNamespace {
  createUploadWidget: (
    options: CloudinaryWidgetOptions,
    callback: (error: unknown, result: CloudinaryWidgetResult) => void
  ) => CloudinaryWidget;
}

interface CloudinaryWidgetOptions {
  cloudName: string;
  apiKey: string;
  uploadSignature: (
    callback: (signature: string) => void,
    paramsToSign: Record<string, unknown>
  ) => void;
}

interface CloudinaryWidget {
  open: () => void;
  destroy: () => void;
}

export interface CloudinaryWidgetResult {
  event: string;
  info: {
    secure_url: string;
    [key: string]: unknown;
  };
}

interface UploadWidgetProps {
  children: (props: {
    cloudinary?: CloudinaryNamespace;
    widget: React.MutableRefObject<CloudinaryWidget | undefined>;
    open: () => void;
  }) => React.ReactNode;
  onUpload?: (
    error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    result: CloudinaryWidgetResult,
    widget: React.MutableRefObject<CloudinaryWidget | undefined>
  ) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ children, onUpload }) => {
  const widget = useRef<CloudinaryWidget>();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    /**
     * Load the Cloudinary script and wait until it's fully loaded.
     */
    const loadCloudinaryScript = async () => {
      if (window.cloudinary) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;

      script.onload = () => {
        setIsScriptLoaded(true);
      };

      script.onerror = () => {
        alert(
          "Failed to load Cloudinary script. Check your internet connection."
        );
      };

      document.body.appendChild(script);
    };

    loadCloudinaryScript();

    return () => {
      widget.current?.destroy();
    };
  }, []);

  // Recreate the widget after every screen resize to avoid hydration issues
  useEffect(() => {
    const handleResize = () => {
      if (widget.current) {
        widget.current.destroy();
        widget.current = createWidget();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScriptLoaded]);

  // Function to generate signature
  function generateSignature(
    callback: (signature: string) => void,
    paramsToSign: Record<string, unknown>
  ) {
    fetch(`/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paramsToSign }),
    })
      .then((r) => r.json())
      .then(({ signature }) => {
        callback(signature);
      });
  }

  // Function to create a widget instance
  function createWidget(): CloudinaryWidget {
    const options: CloudinaryWidgetOptions = {
      cloudName: "doxmrrizw",
      apiKey: "327686128761362",
      uploadSignature: generateSignature,
    };

    return window.cloudinary!.createUploadWidget(options, (error, result) => {
      if (
        (error || result.event === "success") &&
        typeof onUpload === "function"
      ) {
        onUpload(error, result, widget);
      }
    });
  }

  // Function to open the widget
  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current.open();
  }

  return (
    <>
      {isScriptLoaded &&
        children({
          cloudinary: window.cloudinary,
          widget,
          open,
        })}
    </>
  );
};

export default UploadWidget;

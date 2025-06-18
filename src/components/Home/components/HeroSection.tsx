"use client";

import { Button } from "../../ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

import Link from "next/link";

export default function HeroSection() {
 
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-screen">
      {/* Background Video - Updated for consistent aspect ratio */}
      <div
        className="absolute w-full h-auto min-w-full min-h-full object-cover"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute h-full w-auto min-w-full min-h-full object-cover"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Box */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-lg w-[90%] max-w-[511px] text-center z-10">
        <h1 className="text-blue-700 text-xl md:text-3xl font-bold mb-2 md:mb-3">
          Migration Health Assessment Center
        </h1>
        <p className="text-gray-800 text-sm md:text-base mb-4 md:mb-6">
          Also, book your medical appointments effortlessly with Nippon&apos;s
          online appointment system.
        </p>
        <Link href="/booking">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium">
                BOOK NOW
              </Button>
              </Link>
</div>
      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10"
        onClick={scrollToContent}
      >
        <ChevronDown className="h-8 w-8 md:h-10 md:w-10 text-white stroke-[1.5px] bg-black/20 rounded-full p-1 md:p-2" />
      </div>
    </div>
  );
}
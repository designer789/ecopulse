"use client";

import SlideRotateText from './SlideRotateText';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for the Globe component to avoid SSR issues
const GlobeTS = dynamic(() => import('./GlobeTS'), { ssr: false });

export default function Hero() {
  const rotatingPhrases = ["Upload.", "Predict.", "Get rewarded."];
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Ensure video plays automatically and silently
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);
  
  return (
    <section className="relative w-full h-screen flex items-start pt-20 sm:items-center sm:pt-0 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/v1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center">
        <div className="max-w-full sm:max-w-2xl lg:max-w-xl lg:flex-1">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-gray-900">
            <span className="gradient-text">Track the skies.</span><br />
            <span className="text-gray-800">
              <SlideRotateText phrases={rotatingPhrases} />
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-4 sm:mt-6 md:mt-8">
            EcoPulse is a decentralized environmental and weather forecasting community 
            that allows users to monitor air quality and predict the weather using just 
            their smartphones. Your data fuels public goods—supporting science, driving 
            green action, and building the first truly crowd-sourced Earth-monitoring 
            platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-10">
            <button className="gradient-bg text-white rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-1 font-medium text-sm sm:text-base">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </button>
            <a 
              href="https://ecopulse.gitbook.io/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800/10 text-gray-800 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-gray-800/20 transition-colors flex items-center justify-center gap-1 font-medium text-sm sm:text-base border border-gray-300"
            >
              Gitbook
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3">
            <button 
              className="border border-primary/30 text-primary rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-primary/5 transition-colors flex items-center justify-center gap-1 font-medium text-sm sm:text-base"
            >
              DEXTools
            </button>
            <button 
              className="border border-secondary/30 text-secondary rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-secondary/5 transition-colors flex items-center justify-center gap-1 font-medium text-sm sm:text-base"
            >
              DEX Screener
            </button>
          </div>
        </div>

        {/* Globe */}
        <div className="flex-1 mt-8 sm:mt-10 lg:mt-0 relative flex items-center justify-center">
          <div className="w-full h-[250px] sm:h-[400px] lg:h-[600px] relative flex items-center justify-center">
            <GlobeTS />
          </div>
        </div>
      </div>
    </section>
  );
} 

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface RoadmapPhaseProps {
  number: number;
  isActive: boolean;
  onClick: () => void;
}

const RoadmapPhase: React.FC<RoadmapPhaseProps> = ({ number, isActive, onClick }) => (
  <div className="flex flex-col items-center">
    {/* Phase circle */}
    <button 
      onClick={onClick}
      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all duration-500 ${
        isActive 
          ? 'bg-gradient-to-r from-primary to-secondary text-white scale-110' 
          : 'bg-white text-gray-400 border border-gray-200 hover:border-primary/50'
      }`}
    >
      <span className="text-xl font-bold">{number}</span>
    </button>
    
    {/* Phase title */}
    <h3 className={`mt-3 text-center font-bold transition-colors duration-500 ${
      isActive ? 'text-primary' : 'text-gray-500'
    }`}>
      Phase {number}
    </h3>
  </div>
);

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const phases = [
    {
      number: 1,
      title: "Initial Phase - Platform Foundation",
      items: [
        "Launch core platform features to support data uploads and weather forecasting.",
        "Develop and test the air quality map and weather prediction model.",
        "Build the community and initial incentive mechanisms to attract early users."
      ]
    },
    {
      number: 2,
      title: "Expansion Phase - User Growth & Data Enhancement",
      items: [
        "Expand platform functionality to support more data upload formats (photos, sensors, surveys, etc.).",
        "Launch global weather prediction challenges and leaderboards.",
        "Partner with environmental organizations to apply platform data in real-world eco-projects."
      ]
    },
    {
      number: 3,
      title: "Ecosystem Development - Cross-chain & Collaborations",
      items: [
        "Integrate multi-chain support to enhance token liquidity and market acceptance.",
        "Collaborate with green finance and charity projects to fund environmental initiatives using tokens.",
        "Open governance features for platform users to participate in voting and decision-making."
      ]
    },
    {
      number: 4,
      title: "Ongoing Growth - Application Expansion & Internationalization",
      items: [
        "Expand the platform into other environmental sectors (e.g., water quality, soil monitoring).",
        "Introduce NFT rewards and eco-data incentives to encourage long-term participation.",
        "Focus on global expansion, targeting new users and partnerships with global environmental platforms."
      ]
    }
  ];

  // Calculate progress percentage based on active phase
  const calculateProgressPercentage = useCallback(() => {
    // When at the last phase (4), cap to exactly 100%
    if (activePhase === phases.length) {
      return 100;
    }
    // For other phases, calculate normally but ensure we don't exceed 100%
    const percentage = ((activePhase - 1) / (phases.length - 1)) * 100;
    return Math.min(percentage, 99.9); // Slight adjustment to avoid rounding issues
  }, [activePhase, phases.length]);

  // Move to the next phase
  const goToNextPhase = useCallback(() => {
    setActivePhase(prev => {
      // Cycle through phases
      return prev >= phases.length ? 1 : prev + 1;
    });
  }, [phases.length]);

  // Start/restart the autoplay timer
  const startAutoPlayTimer = useCallback(() => {
    // Clear any existing timers
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    
    // Set a new timer
    autoPlayTimerRef.current = setTimeout(() => {
      goToNextPhase();
    }, 6000); // 6 seconds per phase
  }, [goToNextPhase]);

  // Handle progress bar animation using a more efficient approach with requestAnimationFrame
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number | null = null;
    const duration = 6000; // 6 seconds per phase
    
    const startProgress = calculateProgressPercentage();
    const endProgress = activePhase === phases.length 
      ? 100 
      : ((activePhase) / (phases.length - 1)) * 100;
    
    // Animation function
    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current progress using easeInOutQuad for smoother animation
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      // Apply to progress bar
      setProgressPercent(startProgress + (easeProgress * (endProgress - startProgress)));
      
      // Continue animation if not complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };
    
    // Start animation
    if (true) { // Replace isAutoPlaying with true since we're always auto-playing
      animationFrameId = requestAnimationFrame(animateProgress);
    } else {
      // If not autoplaying, just set to the current phase
      setProgressPercent(startProgress);
    }
    
    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activePhase, calculateProgressPercentage, phases.length]);

  // Handle autoplay functionality
  useEffect(() => {
    startAutoPlayTimer();
    
    // Cleanup all timers on component unmount
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [activePhase, startAutoPlayTimer]);

  // Handle manual phase click
  const handlePhaseClick = (phaseNumber: number) => {
    // Stop existing timers
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    
    // Set phase immediately
    setActivePhase(phaseNumber);
    setProgressPercent(((phaseNumber - 1) / (phases.length - 1)) * 100);
    
    // Restart autoplay timer
    startAutoPlayTimer();
  };

  // Get active phase content
  const activePhaseContent = phases.find(phase => phase.number === activePhase);

  return (
    <section className="py-24 pb-0 md:py-36 md:pb-0 w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Our strategic plan for developing the EcoPulse platform and ecosystem
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mb-16">
          {/* Container with proper overflow handling */}
          <div className="max-w-4xl mx-auto px-4 relative">
            {/* Background Line - adjust the right margin to stop at last circle */}
            <div className="absolute top-7 left-4 right-4 h-[4px] bg-gray-100 rounded-full"></div>
            
            {/* Animated Progress Bar - ensure it stops exactly at the last circle */}
            <div 
              className="absolute top-7 left-4 h-[4px] bg-gradient-to-r from-primary to-secondary rounded-full transition-transform duration-300 transform-gpu origin-left"
              style={{ 
                width: `${progressPercent}%`, 
                maxWidth: 'calc(100% - 8px)' // Ensure it doesn't exceed container width
              }}
            ></div>
          </div>
          
          {/* Timeline Circles - add a containing div with the exact same width as the progress bar container */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-between relative z-10">
              {phases.map((phase) => (
                <RoadmapPhase
                  key={phase.number}
                  number={phase.number}
                  isActive={activePhase === phase.number}
                  onClick={() => handlePhaseClick(phase.number)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Phase Content Panel */}
        {activePhaseContent && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in relative z-20">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              {activePhaseContent.title}
            </h3>
            <ul className="space-y-4">
              {activePhaseContent.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
} 
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './radar-animation.css'; // We'll create this file next

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  position: 'top-left' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom-right';
  isMobile: boolean;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, position, isMobile }) => {
  // Mobile view shows features as a list instead of positioned around the radar
  if (isMobile) {
    return (
      <div className="flex items-start mb-6 last:mb-0">
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 flex items-center justify-center bg-primary-light/10 rounded-full border border-primary-light/20">
            <span className="text-primary text-xl">{icon}</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    );
  }

  // Desktop/tablet view with positioned features around the radar
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-[5%] left-[5%] md:top-[10%] md:left-[10%] lg:top-[15%] lg:left-[15%]';
      case 'top-right':
        return 'top-[5%] right-[5%] md:top-[10%] md:right-[10%] lg:top-[15%] lg:right-[15%]';
      case 'left':
        return 'top-1/2 left-0 md:left-[5%] transform -translate-y-1/2';
      case 'right':
        return 'top-1/2 right-0 md:right-[5%] transform -translate-y-1/2';
      case 'bottom-left':
        return 'bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] lg:bottom-[15%] lg:left-[15%]';
      case 'bottom-right':
        return 'bottom-[5%] right-[5%] md:bottom-[10%] md:right-[10%] lg:bottom-[15%] lg:right-[15%]';
      default:
        return '';
    }
  };

  return (
    <div className={`absolute ${getPositionClasses()} max-w-[200px] sm:max-w-[250px] md:max-w-[300px] z-10`}>
      <div className="flex flex-col items-center text-center gap-2">
        <div className="mb-1 md:mb-2">
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-primary-light/10 rounded-full border border-primary-light/20">
            <span className="text-primary text-xl md:text-2xl">{icon}</span>
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-bold">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const FeatureRadar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if viewport is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const features = [
    {
      icon: "📱",
      title: "Zero Hardware, Just Your Phone",
      description: "No need to buy devices—snap a photo, record weather conditions, or fill in a short form.",
      position: 'top-left' as const,
    },
    {
      icon: "🌤️",
      title: "Predict and Earn",
      description: "Make your own weather forecasts. If you're right, you get rewarded.",
      position: 'top-right' as const,
    },
    {
      icon: "🌫️",
      title: "Real-World Air Quality Mapping",
      description: "User-contributed data creates a live air quality map updated in real-time.",
      position: 'left' as const,
    },
    {
      icon: "🫂",
      title: "Social, Fun, and Competitive",
      description: "Join forecasting challenges, share your data, and climb the leaderboard.",
      position: 'right' as const,
    },
    {
      icon: "🔗",
      title: "Blockchain-Powered Data Integrity",
      description: "All contributions are recorded on-chain to ensure transparency, fairness, and traceability.",
      position: 'bottom-left' as const,
    },
    {
      icon: "🌍",
      title: "Designed for Real Impact",
      description: "Data fuels research, supports eco projects, and helps cities make better environmental decisions.",
      position: 'bottom-right' as const,
    },
  ];

  return (
    <section className="py-12 md:py-20 lg:py-32 w-full bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="gradient-text">Product Features & Highlights</span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            Join EcoPulse, where your everyday observations shape tomorrow's climate intelligence.
          </p>
        </div>
        
        {isMobile ? (
          // Mobile: List layout
          <div className="px-2 py-4">
            {features.map((feature, index) => (
              <Feature 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                position={feature.position}
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          // Tablet/Desktop: Radar layout
          <div className="relative w-full h-[600px] md:h-[750px] lg:h-[900px]">
            {/* Center Content with Radar Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] lg:w-[500px] lg:h-[500px]">
                {/* Radar Animation */}
                <div className="radar-loader">
                  <div className="radar-circle outer-circle"></div>
                  <div className="radar-circle middle-circle"></div>
                  <div className="radar-circle inner-circle"></div>
                  
                  {/* Flat Grid Lines */}
                  <div className="radar-grid-line radar-horizontal"></div>
                  <div className="radar-grid-line radar-vertical"></div>
                  
                  {/* Diagonal Grid Lines */}
                  <div className="absolute top-0 left-0 w-full h-full transform rotate-45">
                    <div className="radar-grid-line radar-horizontal"></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full transform -rotate-45">
                    <div className="radar-grid-line radar-horizontal"></div>
                  </div>
                  
                  {/* Radar Sweep */}
                  <div className="radar-sweep">
                    <div className="radar-beam"></div>
                  </div>
                  
                  {/* Center Logo or Icon */}
                  <div className="radar-center-icon">
                    <Image
                      src="/icon.png"
                      alt="EcoPulse Icon"
                      width={64}
                      height={64}
                      className="object-contain w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features */}
            {features.map((feature, index) => (
              <Feature 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                position={feature.position}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureRadar; 
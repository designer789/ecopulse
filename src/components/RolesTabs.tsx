"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';

interface TabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative whitespace-nowrap px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 mx-0.5 sm:mx-1 md:mx-2 lg:mx-3 text-sm sm:text-lg md:text-xl lg:text-3xl font-bold transition-all duration-300 ${
        isActive
          ? 'gradient-text'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      aria-selected={isActive}
      role="tab"
    >
      {title}
      <span 
        className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 ease-out ${
          isActive 
            ? 'bg-gradient-to-r from-primary to-secondary scale-100' 
            : 'scale-0'
        }`} 
      />
    </button>
  );
};

interface RoleItemProps {
  icon: string;
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const RoleItem: React.FC<RoleItemProps> = ({ icon, title, description, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`rounded-lg mb-2 sm:mb-3 overflow-hidden transition-all duration-300 ${
        isOpen ? 'active-gradient' : 'bg-transparent'
      }`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left"
      >
        <div className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full transition-colors ${
          isOpen ? 'bg-white text-primary' : 'text-gray-700'
        } text-xl sm:text-2xl flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-grow pr-2">
          <h3 className={`text-base sm:text-lg font-semibold transition-colors ${
            isOpen ? 'text-primary' : 'text-gray-800'
          }`}>{title}</h3>
        </div>
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ 
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 1000}px` : '0px'
        }}
      >
        <div className="flex pr-3 sm:pr-4 pb-3 sm:pb-4">
          {/* Empty div with same width as icon + gap */}
          <div className="w-11 sm:w-14 flex-shrink-0"></div>
          <div className="flex-grow">
            <p className="text-sm sm:text-base text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

type TabID = 'roles' | 'applications' | 'impact';

interface TabContentItem {
  icon: string;
  title: string;
  description: string;
}

interface TabData {
  items: TabContentItem[];
  videoSrc: string;
  alt: string;
  icon: string;
}

export default function RolesTabs() {
  const [activeTab, setActiveTab] = useState<TabID>('roles');
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize data structures to prevent unnecessary re-renders
  const tabs = useMemo(() => [
    { id: 'roles' as const, label: 'Roles' },
    { id: 'applications' as const, label: 'Data Applications' },
    { id: 'impact' as const, label: 'Environmental & Social Impact' },
  ], []);

  const tabContent = useMemo<Record<TabID, TabData>>(() => ({
    roles: {
      items: [
        {
          icon: "📸",
          title: "Data Contributors",
          description: "Upload air quality photos, surveys, and sensor data or record eco-friendly actions to earn points."
        },
        {
          icon: "🌦️",
          title: "Predictive Players",
          description: "Participate in weather forecasting and earn points and tokens for accurate predictions."
        },
        {
          icon: "🔍",
          title: "Validators",
          description: "Check the authenticity of user-submitted data and ensure ecosystem integrity."
        },
        {
          icon: "📢",
          title: "Spreaders",
          description: "Share content, attract new users, and expand the community."
        }
      ],
      videoSrc: "/v2.mp4",
      alt: "EcoPulse community members collaborating",
      icon: "👥"
    },
    applications: {
      items: [
        {
          icon: "🌍",
          title: "Air Quality Map",
          description: "User data is aggregated to create a real-time global air quality map, freely available to the public."
        },
        {
          icon: "🌤️",
          title: "Weather Prediction Model",
          description: "Combine user forecasts and data to optimize localized models available for research institutions."
        },
        {
          icon: "🌱",
          title: "Eco Partnerships",
          description: "Data supports public welfare initiatives like tree planting projects. Part of the token earnings are donated to environmental causes."
        }
      ],
      videoSrc: "/v3.mp4",
      alt: "Data applications visualization",
      icon: "🌐"
    },
    impact: {
      items: [
        {
          icon: "🌿",
          title: "Environmental Impact",
          description: "User data fills gaps in air quality monitoring and supports policy-making and public action."
        },
        {
          icon: "🌍",
          title: "Social Connection",
          description: "Challenges, leaderboards, and sharing features build a sense of community and belonging."
        },
        {
          icon: "🌱",
          title: "Long-Term Vision",
          description: "Become the world's largest decentralized environmental data platform, expanding to soil and water quality monitoring."
        }
      ],
      videoSrc: "/v4.mp4",
      alt: "Environmental impact illustration",
      icon: "🌿"
    }
  }), []);

  // Set active tab index when tab changes, reset accordion state
  useEffect(() => {
    const index = tabs.findIndex(tab => tab.id === activeTab);
    setActiveTabIndex(index >= 0 ? index : 0);
    // Reset open accordion to the first item when tab changes
    setOpenAccordion(0);
  }, [activeTab, tabs]);

  // Handle carousel scroll animation
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * activeTabIndex;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeTabIndex]);

  // Auto-play accordion items
  useEffect(() => {
    // Clear any existing interval first
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Create a new interval for auto-play
    autoPlayIntervalRef.current = setInterval(() => {
      setOpenAccordion(prev => {
        const totalItems = tabContent[activeTab].items.length;
        // Cycle through items, or go back to first item if at the end
        return prev === null ? 0 : (prev + 1) % totalItems;
      });
    }, 3000); // Change item every 3 seconds

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [activeTab, tabContent]);

  // Handle manual click on an accordion item
  const toggleAccordion = (index: number) => {
    // Reset auto-play timer when user interacts
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    
    setOpenAccordion(openAccordion === index ? null : index);
    
    // Resume auto-play after user interaction
    autoPlayIntervalRef.current = setInterval(() => {
      setOpenAccordion(prev => {
        const totalItems = tabContent[activeTab].items.length;
        return prev === null ? 0 : (prev + 1) % totalItems;
      });
    }, 3000);
  };

  // References for video elements
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Set up video refs
  const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
  };

  // Play the active video and pause others
  useEffect(() => {
    tabs.forEach((_, index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement) {
        if (index === activeTabIndex) {
          videoElement.play().catch(err => console.log("Video play failed:", err));
        } else {
          videoElement.pause();
        }
      }
    });
  }, [activeTabIndex, tabs]);

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-36 w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Tab buttons - placed at the top */}
        <div className="flex justify-center mb-6 md:mb-8 lg:mb-12">
          <div className="flex overflow-x-auto max-w-full scrollbar-hide gap-0.5 sm:gap-1 md:gap-2 justify-start sm:justify-center">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                title={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content area below tabs */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left side: Tab content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
            {/* Tab content with accordion */}
            <div className="p-0 sm:p-1">
              <div className="space-y-2 sm:space-y-4">
                {tabContent[activeTab].items.map((item, index) => (
                  <RoleItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    isOpen={openAccordion === index}
                    onClick={() => toggleAccordion(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side: Video carousel */}
          <div className="w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-lg relative order-1 lg:order-2">
            <div 
              ref={carouselRef}
              className="flex w-full h-full overflow-x-hidden scroll-smooth"
            >
              {tabs.map((tab, index) => (
                <div key={index} className="min-w-full h-full flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
                  
                  {/* Video */}
                  <video
                    ref={(el) => setVideoRef(el, index)}
                    src={tabContent[tab.id].videoSrc}
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full absolute inset-0 z-0"
                  />
                </div>
              ))}
            </div>

            {/* Indicator dots */}
            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-30">
              {tabs.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTab(tabs[index].id)}
                  className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all ${
                    index === activeTabIndex 
                      ? 'bg-white w-6 sm:w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View ${tabs[index].label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
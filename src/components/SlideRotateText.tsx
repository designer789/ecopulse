"use client";

import { useState, useEffect } from 'react';

interface SlideRotateTextProps {
  phrases: string[];
  interval?: number;
}

export default function SlideRotateText({ phrases, interval = 3000 }: SlideRotateTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'enter' | 'exit' | null>(null);

  useEffect(() => {
    // Initialize with entering animation
    setDirection('enter');
    
    const intervalId = setInterval(() => {
      // Exit animation
      setDirection('exit');
      
      // Change text and start enter animation after exit completes
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setDirection('enter');
      }, 500); // Half of the transition duration
      
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [phrases, interval]);

  // Define animation classes based on direction
  const animationClasses = {
    enter: 'translate-x-0 opacity-100',
    exit: 'translate-x-8 opacity-0',
    initial: '-translate-x-8 opacity-0'
  };

  return (
    <div className="relative inline-block overflow-hidden text-4xl sm:text-5xl md:text-7xl" style={{ minHeight: '1.2em', minWidth: '8em' }}>
      <span 
        className={`inline-block absolute transition-all duration-500 transform ${
          direction === 'enter' 
            ? animationClasses.enter
            : direction === 'exit'
              ? animationClasses.exit
              : animationClasses.initial
        }`}
      >
        {phrases[currentIndex]}
      </span>
    </div>
  );
} 
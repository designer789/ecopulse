"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Define a type for the globe methods we'll use
interface GlobeMethods {
  controls: () => {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableZoom: boolean;
    enablePan: boolean;
    enableDamping: boolean;
    dampingFactor: number;
    mouseButtons: {
      LEFT: number | null;
      MIDDLE: number | null;
      RIGHT: number | null;
    };
    enableTouch: boolean;
    update: () => void;
  };
  pointOfView: (params: { lat: number; lng: number; altitude: number }) => void;
}

interface GlobeProps {
  ref: React.RefObject<unknown>;
  globeImageUrl: string;
  bumpImageUrl: string;
  backgroundColor: string;
  width: number;
  height: number;
  animateIn: boolean;
}

// Create a type that allows us to use the ref without an explicit any
type GlobeRef = unknown;

// Dynamic import for Globe
const Globe = dynamic(
  () => import('react-globe.gl'),
  { ssr: false }
);

const GlobeTS: React.FC = () => {
  // Using a specific ref type with type assertion when accessing methods
  const globeEl = useRef<GlobeRef>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Add listener for resize
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Wait for the globe to be fully loaded
    const checkGlobe = setInterval(() => {
      if (globeEl.current && (globeEl.current as unknown as GlobeMethods).controls) {
        clearInterval(checkGlobe);
        
        // Configure controls
        const controls = (globeEl.current as unknown as GlobeMethods).controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = isMobile ? 0.6 : (isTablet ? 0.5 : 0.4);
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          
          // Enable mouse drag but disable other mouse interactions
          controls.mouseButtons = {
            LEFT: 0, // Enable left mouse button for dragging
            MIDDLE: null,
            RIGHT: null
          };
          
          // Enable touch events for mobile
          controls.enableTouch = true;
        }
        
        // Initial camera position - closer view for mobile/tablet
        (globeEl.current as unknown as GlobeMethods).pointOfView({
          lat: 25,
          lng: 20,
          altitude: isMobile ? 1.8 : (isTablet ? 2.2 : 2.5)
        });
        
        // Animation loop
        const animate = () => {
          if (globeEl.current && (globeEl.current as unknown as GlobeMethods).controls) {
            const controls = (globeEl.current as unknown as GlobeMethods).controls();
            if (controls) {
              controls.update();
            }
          }
          requestAnimationFrame(animate);
        };
        
        animate();
      }
    }, 100);
    
    return () => {
      clearInterval(checkGlobe);
    };
  }, [isMobile, isTablet]);

  // Determine the appropriate size based on screen type
  const getGlobeDimensions = () => {
    if (isMobile) {
      return { width: 300, height: 300 };
    } else if (isTablet) {
      return { width: 500, height: 500 };
    } else {
      return { width: 800, height: 800 };
    }
  };

  const { width, height } = getGlobeDimensions();

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative'
    }}>
      <div style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Globe
          // @ts-expect-error Using dynamic import with ref requires type assertion
          ref={globeEl}
          globeImageUrl="/images/texture.png"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          width={width}
          height={height}
          animateIn={true}
        />
      </div>
    </div>
  );
};

export default GlobeTS; 
"use client";

import React from 'react';
import { WorldMap } from './WorldMap';

export default function NetworkSection() {
  return (
    <section className="pt-0 md:pt-0 pb-24 md:pb-36 w-full bg-white -mt-24 md:-mt-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="p-4 md:p-8">
          <WorldMap 
            dots={[]} 
            lineColor="#10b981" // Using a green color to match the EcoPulse theme
          />
        </div>
      </div>
    </section>
  );
} 
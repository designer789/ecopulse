"use client";

import React from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-100/10 transition-all duration-300 hover:shadow-lg hover:bg-white/10">
      <div className="text-3xl md:text-4xl">{icon}</div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const ProductFeatures: React.FC = () => {
  const features = [
    {
      icon: "📱",
      title: "Zero Hardware, Just Your Phone",
      description: "No need to buy devices—snap a photo, record weather conditions, or fill in a short form."
    },
    {
      icon: "🌤️",
      title: "Predict and Earn",
      description: "Make your own weather forecasts. If you're right, you get rewarded."
    },
    {
      icon: "🌫️",
      title: "Real-World Air Quality Mapping",
      description: "User-contributed data creates a live air quality map updated in real-time."
    },
    {
      icon: "🫂",
      title: "Social, Fun, and Competitive",
      description: "Join forecasting challenges, share your data, and climb the leaderboard."
    },
    {
      icon: "🔗",
      title: "Blockchain-Powered Data Integrity",
      description: "All contributions are recorded on-chain to ensure transparency, fairness, and traceability."
    },
    {
      icon: "🌍",
      title: "Designed for Real Impact",
      description: "Data fuels research, supports eco projects, and helps cities make better environmental decisions."
    }
  ];

  return (
    <section className="py-16 md:py-24 w-full bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Product Features & Highlights</span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Join EcoPulse, where your everyday observations shape tomorrow's climate intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures; 
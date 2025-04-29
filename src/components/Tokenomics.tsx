"use client";

import React from 'react';

interface TokenomicsItemProps {
  title: string;
  items: string[];
}

const TokenomicsItem: React.FC<TokenomicsItemProps> = ({ title, items }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-bold mb-4 gradient-text">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface AllocationItemProps {
  title: string;
  percentage: string;
  color: string;
}

const AllocationItem: React.FC<AllocationItemProps> = ({ title, percentage, color }) => (
  <div className="group flex items-center gap-3 py-2 border-b border-gray-100">
    <div className={`w-3 h-3 rounded-full ${color} transition-all duration-300 group-hover:scale-125`}></div>
    <div className="flex-grow text-gray-800 group-hover:text-gray-900">{title}</div>
    <div className="font-medium text-gray-700">{percentage}</div>
  </div>
);

export default function Tokenomics() {
  const utility = [
    "Rewarding Data Contributions",
    "Incentivizing Weather Predictions",
    "Platform Governance",
    "Eco-Project Donations",
    "Staking and Yield Farming"
  ];

  const allocations = [
    { title: "Liquidity Pool", percentage: "70%", color: "bg-primary" },
    { title: "Data Mining Rewards", percentage: "10%", color: "bg-secondary" },
    { title: "Community Incentives & Air Quality Map", percentage: "10%", color: "bg-purple-500" },
    { title: "Team & Advisors", percentage: "5%", color: "bg-amber-500" },
    { title: "Strategic Partnerships & Environmental Causes", percentage: "5%", color: "bg-emerald-500" }
  ];

  return (
    <section className="py-24 md:py-36 w-full bg-green-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Tokenomics</span>
          </h2>
          <div className="flex justify-center items-center gap-3 text-xl md:text-2xl font-bold text-gray-700">
            <span>Token Symbol:</span>
            <span className="text-primary">$EPT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side: Utility and Total Supply */}
          <div className="flex flex-col h-full">
            <TokenomicsItem title="Utility" items={utility} />
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 gradient-text">Total Supply</h3>
              <p className="text-2xl font-bold text-center py-4">1,000,000,000</p>
            </div>
          </div>

          {/* Right side: Allocation - Minimal Style */}
          <div className="flex flex-col h-full">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-6 gradient-text">Allocation</h3>
              
              {/* Simplified Allocation Bar */}
              <div className="h-8 w-full rounded-full overflow-hidden bg-gray-100 mb-6">
                <div className="flex h-full">
                  <div className="h-full bg-primary" style={{ width: '70%' }}></div>
                  <div className="h-full bg-secondary" style={{ width: '10%' }}></div>
                  <div className="h-full bg-purple-500" style={{ width: '10%' }}></div>
                  <div className="h-full bg-amber-500" style={{ width: '5%' }}></div>
                  <div className="h-full bg-emerald-500" style={{ width: '5%' }}></div>
                </div>
              </div>
              
              <div className="space-y-1 flex-grow">
                {allocations.map((item, index) => (
                  <AllocationItem
                    key={index}
                    title={item.title}
                    percentage={item.percentage}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
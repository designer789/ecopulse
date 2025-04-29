"use client";

import React, { useState } from 'react';
import { BackgroundBeams } from './BackgroundBeams';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-6 text-left font-medium text-gray-900 hover:text-primary focus:outline-none transition-colors"
      >
        <span className="text-lg">{question}</span>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-700 px-6">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  
  const faqItems = [
    {
      question: "What is EcoPulse?",
      answer: "EcoPulse is a decentralized platform where users can upload air quality data, participate in weather forecasting, and earn rewards. It leverages blockchain technology to ensure transparency, fairness, and data integrity."
    },
    {
      question: "How can I participate in EcoPulse?",
      answer: "Simply register on the platform, upload weather observations or air quality data, and participate in weather forecasting. Accurate predictions and valuable data contributions will earn you tokens and other rewards."
    },
    {
      question: "Do I need special hardware to participate?",
      answer: "No, you can use your smartphone to upload photos, record weather conditions, or fill out surveys. No additional sensors or equipment are required."
    },
    {
      question: "How are rewards distributed?",
      answer: "Rewards are distributed based on accurate weather predictions and the quality of the data you upload. The more accurate your predictions and the more valuable your contributions, the more tokens you can earn."
    },
    {
      question: "How does EcoPulse ensure data authenticity?",
      answer: "All data submitted by users is verified through a decentralized process. Additionally, validators help ensure the integrity and accuracy of the data, which is stored on-chain for transparency."
    },
    {
      question: "What can I do with the tokens I earn?",
      answer: "Tokens can be used for platform governance, staking, or contributing to eco-projects. You can also redeem tokens for rewards or exchange them within the ecosystem."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all data uploaded to EcoPulse is encrypted and stored securely on the blockchain. It is fully transparent and cannot be altered once it's recorded."
    },
    {
      question: "What kind of environmental impact does EcoPulse have?",
      answer: "EcoPulse helps fill gaps in air quality monitoring, supports environmental policy-making, and promotes public welfare initiatives, such as tree planting and green finance projects."
    },
    {
      question: "Can I participate in the platform's governance?",
      answer: "Yes, if you hold EcoPulse tokens, you can participate in governance decisions by voting on platform updates and new features, contributing to the direction of the project."
    },
    {
      question: "What are EcoPulse's long-term goals?",
      answer: "EcoPulse aims to become the world's largest decentralized environmental data platform. We plan to expand beyond air quality, covering areas like water and soil monitoring, and to collaborate globally for environmental betterment."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 md:py-36 w-full bg-gray-50 relative overflow-hidden">
      <BackgroundBeams className="opacity-40" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
         
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
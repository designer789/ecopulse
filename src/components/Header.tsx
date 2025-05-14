"use client";

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Navigation items wrapped in useMemo to prevent recreating on every render
  const navigationItems = useMemo(() => [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Roles', href: '#roles' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'FAQ', href: '#faq' }
  ], []);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.replace('#', '')).filter(id => id);
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i] || 'home');
            break;
          }
        }
      }
      
      // If scrolled to the top, set home as active
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);
  
  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '') || 'home';
    const targetElement = targetId === 'home' 
      ? document.body 
      : document.getElementById(targetId);
      
    if (targetElement) {
      window.scrollTo({
        top: targetId === 'home' ? 0 : targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full ${
        scrolled 
          ? 'bg-white py-1 sm:py-2 shadow-sm' 
          : 'bg-transparent py-2 sm:py-4'
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
              <Image
                src="/icon.png"
                alt="EcoPulse Logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">
              EcoPulse
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 lg:space-x-6">
            {navigationItems.map((item) => {
              const isActive = (
                activeSection === (item.href.replace('#', '') || 'home')
              );
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-xs lg:text-sm font-medium transition-all duration-200 px-2 py-1 rounded-md relative ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-800 hover:text-gray-600'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a 
              href="https://x.com/EcoPulse_COIN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs lg:text-sm font-medium px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://t.me/EcoPulse_Portal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary to-secondary text-white text-xs lg:text-sm font-medium px-3 lg:px-4 py-1.5 lg:py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Telegram
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-3 sm:px-4 pt-2 pb-3 sm:pb-4 w-full ${
          scrolled 
            ? 'bg-white border-t border-gray-100' 
            : 'bg-white border-t border-gray-100'
        }`}>
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = (
                activeSection === (item.href.replace('#', '') || 'home')
              );
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`block py-2 px-3 rounded-md text-sm sm:text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-800 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="pt-3 sm:pt-4 flex flex-col space-y-2 sm:space-y-3">
              <a 
                href="https://x.com/EcoPulse_COIN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium px-4 py-1.5 sm:py-2 rounded-full text-primary border border-primary/20 transition-colors text-center"
              >
                Twitter
              </a>
              <a 
                href="https://t.me/EcoPulse_Portal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:py-2 rounded-full hover:opacity-90 transition-opacity text-center"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 

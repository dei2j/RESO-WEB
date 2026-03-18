import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SharedSidebar = ({ currentPage = 'home', onGoAboutUs, onGoHomeAndScrollTo, onGoWorks, onGoContactUs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDarkBg = currentPage === 'home';

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'works', label: 'Works' },
    { id: 'contact', label: 'Contact us' },
  ];

  const handleItemClick = (item) => {
    if (item.id === 'about') {
      if (currentPage !== 'about-us') onGoAboutUs?.();
    } else if (item.id === 'works') {
      onGoWorks?.();
    } else if (item.id === 'contact') {
      onGoContactUs?.();
    } else {
      if (currentPage === 'about-us' || currentPage === 'works') {
        onGoHomeAndScrollTo?.(item.id);
      } else {
        const target = document.querySelector(`#${item.id}`);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-8 right-8 z-50 p-2 focus:outline-none cursor-pointer ${isDarkBg ? 'mix-blend-difference' : ''}`}
        aria-label="메뉴"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
          <span
            className={`block w-10 h-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-3' : ''}`}
            style={{ backgroundColor: isMenuOpen ? '#fff' : (isDarkBg ? '#fff' : '#1907b7') }}
          />
          <span
            className={`block w-10 h-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
            style={{ backgroundColor: isMenuOpen ? '#fff' : (isDarkBg ? '#fff' : '#1907b7') }}
          />
          <span
            className={`block w-10 h-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-3' : ''}`}
            style={{ backgroundColor: isMenuOpen ? '#fff' : (isDarkBg ? '#fff' : '#1907b7') }}
          />
        </div>
      </motion.button>

      <div
        className={`fixed inset-y-0 right-0 z-40 w-full md:w-[460px] bg-[#1907b7] transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full justify-center px-12 text-right" style={{ marginTop: '-4vh' }}>
          <nav className="flex flex-col space-y-12">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="text-4xl md:text-[52px] font-inter font-bold italic text-white hover:text-[#ef283f] transition-colors duration-300 leading-tight drop-shadow-md block text-right"
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex justify-end mt-10">
            <div className="w-6 h-6 rounded-full bg-[#ef283f]" />
            <div className="w-6 h-6 rounded-full bg-[#ef283f] -ml-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedSidebar;

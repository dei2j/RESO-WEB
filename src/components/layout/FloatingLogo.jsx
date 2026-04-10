import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../Logo';

const FloatingLogo = ({ onClickLogo }) => {
  const location = useLocation();
  const isAboutUsPage = location.pathname === '/about-us';
  const isWorksPage = location.pathname === '/works';
  const isContactUsPage = location.pathname === '/contact-us';
  const [isWhiteTheme, setIsWhiteTheme] = useState(true);

  useEffect(() => {
    const checkBackground = () => {
      if (isWorksPage || isContactUsPage) {
        setIsWhiteTheme(false);
        return;
      }
      // 로고 영역을 피해 콘텐츠 배경 감지 (로고: top-8, 높이 ~100px)
      const x = window.innerWidth / 2;
      const y = 180;
      const element = document.elementFromPoint(x, y);

      if (!element) return;

      const section = element.closest('section') || element.closest('footer') || element.closest('div[id="hero"]');

      if (section) {
        const id = section.id;
        if (id === 'hero' || id === 'footer-section') {
          setIsWhiteTheme(true);
        } else if (['about', 'services', 'culture', 'works', 'testimonials'].includes(id) || id === 'about-us-hero') {
          setIsWhiteTheme(false);
        }
      } else if (isAboutUsPage) {
        // About Us 페이지: 밝은 배경 → 컬러 로고 (섹션 감지 실패 시 폴백)
        setIsWhiteTheme(false);
      }
    };

    window.addEventListener('scroll', checkBackground, { passive: true });
    window.addEventListener('resize', checkBackground);
    checkBackground();

    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, [isAboutUsPage, isWorksPage, isContactUsPage]);

  const content = (
    <div className="relative w-28 md:w-36 flex items-center justify-center">
      <div className={`transition-opacity duration-500 ${isWhiteTheme ? 'opacity-100' : 'opacity-0'}`}>
        <Logo className="w-full h-auto text-white" />
      </div>
      <div className={`absolute inset-0 transition-opacity duration-500 ${isWhiteTheme ? 'opacity-0' : 'opacity-100'}`}>
        <img src="/img/reso.webp" alt="RESO" className="w-full h-auto" />
      </div>
    </div>
  );

  return (
    <motion.div
      className="fixed top-8 left-1/2 z-50 mix-blend-normal pointer-events-auto"
      style={{ x: '-50%' }}
    >
      {onClickLogo ? (
        <button type="button" onClick={onClickLogo} className="focus:outline-none cursor-pointer" aria-label="홈으로">
          {content}
        </button>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default FloatingLogo;

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="hero" className="relative w-full h-screen bg-white overflow-hidden font-kulim">
      <div className="absolute inset-0 bg-gray-900 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src="/video/Website video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" aria-hidden />
      </div>

      <div className="absolute top-[18%] md:top-[28%] left-[6%] md:left-[10%] z-10 pointer-events-none">
        <motion.h1
          className="text-[36px] md:text-[66px] 3xl:text-[90px] 4xl:text-[100px] font-bold text-white/70 leading-[1.1] drop-shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Where Culture <br />
          Meets Creativity,
        </motion.h1>
      </div>

      {/* 원 + 화살표 */}
      <div className="absolute top-[38%] md:top-auto md:bottom-[22%] left-[6%] md:left-[10%] z-10 pointer-events-none flex items-center gap-3">
        <motion.div
          className="w-4 h-4 md:w-5 md:h-5 4xl:w-7 4xl:h-7 rounded-full bg-white/70"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        />
        <motion.svg
          width="90"
          height="24"
          viewBox="0 0 90 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70px] md:w-[90px] 4xl:w-[110px]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 1 }}
        >
          <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>

      <div className="absolute bottom-[14%] md:bottom-[24%] right-[6%] md:right-[10%] z-10 text-right pointer-events-none">
        <motion.h2
          className="text-[36px] md:text-[66px] 3xl:text-[90px] 4xl:text-[100px] font-bold text-white/70 leading-[1.1] drop-shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          We Bring <br />
          Stories To Life
        </motion.h2>
      </div>

    </div>
  );
};

export default Hero;

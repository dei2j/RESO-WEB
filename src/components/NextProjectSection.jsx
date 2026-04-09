import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const smoothEase = [0.16, 1, 0.3, 1];
const enterEase = [0.33, 1, 0.68, 1];

const NextProjectSection = ({ nextHeroImage, nextTitle, nextHref }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const titleChars = nextTitle.split('');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[28vh] md:min-h-[35vh] lg:min-h-[40vh] flex items-center justify-center overflow-hidden cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{ scale: isHovering ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <motion.img
          src={nextHeroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{ filter: isHovering ? 'blur(0px)' : 'blur(3px)' }}
          transition={{ duration: 0.8, ease: smoothEase }}
        />
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            backgroundColor: isHovering ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.45)',
          }}
          transition={{ duration: 0.6, ease: smoothEase }}
        />
      </motion.div>

      <div className="relative z-10 text-center pointer-events-none select-none flex flex-col items-center">
        <motion.p
          className="font-kulim font-light text-xs md:text-sm 3xl:text-sm 4xl:text-base tracking-[0.2em] uppercase mb-3 md:mb-4 text-white/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Next Project
        </motion.p>

        <motion.div
          className="inline-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
          }}
        >
          <p className="font-kulim font-extrabold text-white text-2xl sm:text-3xl md:text-5xl lg:text-5xl 3xl:text-5xl 4xl:text-6xl drop-shadow-lg">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.6, ease: enterEase },
                  },
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </p>

          <motion.div
            className="mt-2 flex items-center"
            style={{ width: 'calc(100% + 8%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-[1.5px] bg-white origin-left flex-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovering ? 1 : 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
            />
            <motion.svg
              width="8" height="12" viewBox="0 0 8 12" fill="none" className="shrink-0 -ml-[5px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>

      <Link
        to={nextHref}
        className="absolute inset-0 z-20 cursor-none"
        aria-label={`Go to next project: ${nextTitle}`}
      />

      {cursorVisible && (
        <motion.div
          className="fixed z-50 pointer-events-none flex items-center justify-center"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <span
            className="font-kulim font-black text-2xl md:text-5xl uppercase tracking-tight"
            style={{
              backgroundImage: `url(${encodeURI(nextHeroImage)})`,
              backgroundSize: '150vw 150vh',
              backgroundPosition: `calc(50% - ${cursorPos.x - window.innerWidth / 2}px) calc(50% - ${cursorPos.y - window.innerHeight / 2}px)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'brightness(2) saturate(1.5) contrast(1.3)',
            }}
          >
            NEXT
          </span>
        </motion.div>
      )}
    </section>
  );
};

export default NextProjectSection;

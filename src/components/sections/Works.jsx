import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Works = () => {
  const navigate = useNavigate();
  const works = [
    { title: 'AIA', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/포트폴리오 썸네일/AIA.png', caseUrl: '/case/aia' },
    { title: 'KT', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/포트폴리오 썸네일/KT.png', caseUrl: '/case/kt' },
    { title: 'Agent F', desc: 'Digital Experience', color: 'bg-black', image: '/img/포트폴리오 썸네일/Agent F.png', caseUrl: '/case/agent-f' },
    { title: 'Royal Salute', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/포트폴리오 썸네일/Royal Salute.png', caseUrl: '/case/royal-salute' },
    { title: 'Zeta Mobility', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/포트폴리오 썸네일/Zeta Mobility.png', caseUrl: '/case/zeta-mobility' },
    { title: 'HSBC', desc: 'Digital Experience', color: 'bg-black', image: '/img/포트폴리오 썸네일/HSBC.png', caseUrl: '/case/hsbc' },
    { title: '프로그래머스', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/포트폴리오 썸네일/프로그래머스.png', caseUrl: '/case/programmers' },
    { title: 'Hermes', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/포트폴리오 썸네일/hermes.png', caseUrl: '/case/hermes' },
    { title: 'Kumho Tire', desc: 'Digital Experience', color: 'bg-black', image: '/img/포트폴리오 썸네일/Kumho Tire.png', caseUrl: '/case/kumho-tire' },
    { title: 'CJ 제일제당', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/포트폴리오 썸네일/CJ 제일제당.png', caseUrl: '/case/cj' },
    { title: 'Desilo', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/포트폴리오 썸네일/Desilo.png', caseUrl: '/case/desilo' },
    { title: 'Takamol', desc: 'Digital Experience', color: 'bg-black', image: '/img/포트폴리오 썸네일/Takamol.png', caseUrl: '/case/takamol' },
    { title: 'Parc', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/포트폴리오 썸네일/Parc.png', caseUrl: '/case/parc' },
    { title: 'Ecover', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/포트폴리오 썸네일/Ecover.png', caseUrl: '/case/ecover' },
    { title: 'Rosatis', desc: 'Digital Experience', color: 'bg-black', image: '/img/포트폴리오 썸네일/Rosati_s.png', caseUrl: '/case/rosatis' },
    { title: 'Guro', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/Portfolio/Guro/Screenshot 2026-02-10 070056.png', caseUrl: '/case/guro' },
    { title: 'CIMB Bank', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/Portfolio/CIMB/Screenshot 2026-02-10 064935.png', caseUrl: '/case/cimb' },
    { title: '한국주택금융공사', desc: 'Digital Experience', color: 'bg-black', image: '/img/Portfolio/Desilo/Screenshot 2026-02-10 065738.png', caseUrl: '/case/khfc' },
    { title: 'Lotte wellfood', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/포트폴리오 썸네일/Lotte.png', caseUrl: '/case/lotte-wellfood' },
    { title: 'Urban break', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/포트폴리오 썸네일/Urban Break.png', caseUrl: '/case/urban-break' },
  ];
  const infiniteWorks = Array(20).fill(works).flat();

  const [index, setIndex] = useState(0);
  const GAP = 32;
  const [isMobile, setIsMobile] = useState(false);
  const [is3xl, setIs3xl] = useState(false);
  const [is4xl, setIs4xl] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIs3xl(window.innerWidth >= 1800);
      setIs4xl(window.innerWidth >= 2400);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const CARD_WIDTH_DESKTOP = is4xl ? 740 : is3xl ? 560 : 540;

  const ITEMS_PER_MOVE = isMobile ? 1 : 2;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || isMobile) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + ITEMS_PER_MOVE;
        if (next >= infiniteWorks.length - 4) return 0;
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [ITEMS_PER_MOVE, infiniteWorks.length, isHovered, isMobile]);

  const handlePrev = () => {
    setIndex((prev) => (prev <= 0 ? works.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => {
      if (isMobile) return prev >= works.length - 1 ? 0 : prev + 1;
      const next = prev + ITEMS_PER_MOVE;
      if (next >= infiniteWorks.length - 4) return 0;
      return next;
    });
  };

  // Mobile: simplified card carousel
  if (isMobile) {
    const currentWork = works[index % works.length];
    return (
      <section id="works" className="py-16 bg-gray-50 overflow-hidden font-kulim">
        <div className="px-5">
          <div className="overflow-hidden">
            <motion.div
              key={index}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              role="button"
              tabIndex={0}
              onClick={() => currentWork.caseUrl && navigate(currentWork.caseUrl)}
              onKeyDown={(e) => currentWork.caseUrl && (e.key === 'Enter' || e.key === ' ') && navigate(currentWork.caseUrl)}
              className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 ${currentWork.color} opacity-90`}></div>
              <img src={currentWork.image} alt={currentWork.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="border-b border-white/30 pb-3">
                  <h3 className="text-3xl font-bold text-white">{currentWork.title}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-white/80 text-sm uppercase tracking-wider">{currentWork.desc}</span>
                  <span className="flex items-center gap-2 text-white text-sm">
                    Watch more
                    <span className="w-7 h-7 rounded-full bg-[#ee2c41] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Navigation arrows */}
          <div className="flex justify-between items-center mt-4 px-1">
            <button onClick={handlePrev} className="p-2" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={handleNext} className="p-2" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: infinite carousel with flip cards
  const viewedWidth = CARD_WIDTH_DESKTOP * 2 + GAP;
  const startOffset = typeof window !== 'undefined' ? window.innerWidth / 2 - viewedWidth / 2 : 0;
  const desktopX = startOffset - index * (CARD_WIDTH_DESKTOP + GAP);

  return (
    <section id="works" className="py-32 bg-gray-50 overflow-hidden font-kulim">
      <div className="w-full h-[480px] 3xl:h-[480px] 4xl:h-[660px] flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <motion.div className="flex" style={{ gap: GAP }} animate={{ x: desktopX }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {infiniteWorks.map((work, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => work.caseUrl && navigate(work.caseUrl)}
              onKeyDown={(e) => work.caseUrl && (e.key === 'Enter' || e.key === ' ') && navigate(work.caseUrl)}
              className="relative flex-none h-[400px] 3xl:h-[420px] 4xl:h-[580px] group shadow-lg cursor-pointer"
              style={{ width: CARD_WIDTH_DESKTOP, borderRadius: 0, perspective: '1000px' }}
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front face — image-dominant */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden bg-black">
                  <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-10 4xl:p-14 flex flex-col justify-end">
                    <h3 className="text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-white leading-tight tracking-tight">{work.title}</h3>
                    <span className="text-white/50 text-xs 4xl:text-sm uppercase tracking-[0.2em] mt-3">{work.desc}</span>
                  </div>
                  <div className="absolute top-8 right-8 4xl:top-10 4xl:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-10 h-10 4xl:w-12 4xl:h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>
                {/* Back face — dark, content-focused */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden bg-[#0a0a0a]">
                  <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-15 blur-sm scale-110" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 4xl:p-14 text-center">
                    <span className="text-white/40 text-xs 4xl:text-sm uppercase tracking-[0.25em] mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Case Study</span>
                    <h3 className="text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-white leading-tight tracking-tight mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{work.title}</h3>
                    <p className="text-white/50 text-sm 3xl:text-base 4xl:text-lg tracking-wider mb-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{work.desc}</p>
                    <button onClick={(e) => { e.stopPropagation(); work.caseUrl && navigate(work.caseUrl); }} className="border border-white/20 text-white px-10 py-3.5 text-sm 4xl:text-base tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-200">View Case</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center mt-10 4xl:mt-14">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.ceil(works.length / 2) }).map((_, pageI) => {
            const isActive = Math.floor((index % works.length) / 2) === pageI;
            return (
              <button
                key={pageI}
                onClick={() => setIndex(pageI * 2)}
                className={`h-[2px] transition-all duration-500 ease-out cursor-pointer ${isActive ? 'w-10 bg-black/60' : 'w-3 bg-black/10 hover:bg-black/20'}`}
                aria-label={`Go to page ${pageI + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Works;

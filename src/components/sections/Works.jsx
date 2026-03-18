import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Works = () => {
  const navigate = useNavigate();
  const works = [
    { title: 'AIA', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/Portfolio/AIA/Screenshot 2026-02-10 064548.png', caseUrl: '/case/aia' },
    { title: 'KT', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: '/img/Portfolio/KT/Sce 1-01.png의 사본.png', caseUrl: '/case/kt' },
    { title: 'Agent F', desc: 'Digital Experience', color: 'bg-black', image: 'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/agent-f' },
    { title: 'Royal Salute', desc: 'Brand Identity', color: 'bg-[#1907b7]', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/royal-salute' },
    { title: 'Zeta Mobility', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/zeta-mobility' },
    { title: 'HSBC', desc: 'Digital Experience', color: 'bg-black', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/hsbc' },
    { title: '프로그래머스', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: 'https://images.unsplash.com/photo-1549439602-43ebca23d7e5?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/programmers' },
    { title: 'Hermes', desc: 'Event Campaign', color: 'bg-[#ef283f]', image: 'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/hermes' },
    { title: 'Kumho Tire', desc: 'Website Renewal', color: 'bg-black', image: '/img/Portfolio/Kumho Tire/Screenshot 2026-03-13 111701.png', caseUrl: '/case/kumho-tire' },
    { title: 'CJ 제일제당', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: '/img/Portfolio/CJ/Screenshot 2026-02-10 065257.png', caseUrl: '/case/cj' },
    { title: 'Desilo', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/desilo' },
    { title: 'Takamol', desc: 'Digital Experience', color: 'bg-black', image: 'https://images.unsplash.com/photo-1549439602-43ebca23d7e5?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/takamol' },
    { title: 'Parc', desc: 'Digital Experience', color: 'bg-[#1907b7]', image: 'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/parc' },
    { title: 'Lotte wellfood', desc: 'Digital Experience', color: 'bg-[#ef283f]', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/lotte-wellfood' },
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

  const CARD_WIDTH_DESKTOP = is4xl ? 740 : is3xl ? 680 : 540;

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
      <div className="w-full h-[480px] 3xl:h-[600px] 4xl:h-[660px] flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <motion.div className="flex" style={{ gap: GAP }} animate={{ x: desktopX }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {infiniteWorks.map((work, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => work.caseUrl && navigate(work.caseUrl)}
              onKeyDown={(e) => work.caseUrl && (e.key === 'Enter' || e.key === ' ') && navigate(work.caseUrl)}
              className="relative flex-none h-[400px] 3xl:h-[520px] 4xl:h-[580px] group shadow-lg cursor-pointer"
              style={{ width: CARD_WIDTH_DESKTOP, borderRadius: 0, perspective: '1000px' }}
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden bg-white">
                  <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="border-b border-white/30 pb-4">
                      <h3 className="text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-2">{work.title}</h3>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-white/80 text-lg 4xl:text-2xl uppercase tracking-wider">{work.desc}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-10 right-10">
                    <span className="bg-white/20 text-white px-4 py-2 text-sm backdrop-blur-sm">View Case</span>
                  </div>
                </div>
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden bg-black">
                  <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-10 text-center">
                    <h3 className="text-5xl 3xl:text-6xl 4xl:text-6xl font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{work.title}</h3>
                    <p className="text-white/80 text-xl 3xl:text-2xl 4xl:text-2xl tracking-wider mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{work.desc}</p>
                    <button onClick={(e) => { e.stopPropagation(); work.caseUrl && navigate(work.caseUrl); }} className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors translate-y-4 group-hover:translate-y-0 duration-500 delay-200">View Case</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center mt-8 space-x-3">
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.ceil(works.length / 2) }).map((_, pageI) => {
            const isActive = Math.floor((index % works.length) / 2) === pageI;
            return (
              <div key={pageI} className="flex gap-0.5">
                <div className={`h-1 transition-all duration-300 ${isActive ? 'w-12 bg-[#1907b7]' : 'w-4 bg-gray-300'}`} />
                <div className={`h-1 transition-all duration-300 ${isActive ? 'w-12 bg-[#1907b7]' : 'w-4 bg-gray-300'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Works;

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, wrap } from 'framer-motion';

const Services = () => {
  const services = [
    { id: '01', title: 'Motion Graphics', video: '/video/home_list/Motion_v3.mp4' },
    { id: '02', title: 'UI/UX', video: '/video/home_list/UIUX_v3.mp4' },
    { id: '03', title: 'Graphic Design', video: '/video/home_list/Graphic_v3.mp4' },
    { id: '04', title: 'App Development', video: '/video/home_list/App_v2.mp4' },
    { id: '05', title: 'ERP', video: '/video/home_list/ERP_v2.mp4' },
    { id: '06', title: 'System Development', video: '/video/home_list/System developement_v1.mp4' },
    { id: '07', title: 'AI/AX', video: '/video/home_list/AI AX_v2.mp4' },
  ];
  const infiniteServices = Array(20).fill(services).flat();

  const containerRef = useRef(null);
  const itemRef = useRef(null);
  const itemWidthRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const baseVelocity = -0.5;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const setupAnimation = () => {
      if (itemRef.current) {
        const w = itemRef.current.offsetWidth + 24;
        itemWidthRef.current = w;
        const cycleWidth = w * services.length;
        x.set(-cycleWidth * 4);
        setIsReady(true);
      }
    };
    const timer = setTimeout(setupAnimation, 100);
    window.addEventListener('resize', setupAnimation);
    return () => {
      window.removeEventListener('resize', setupAnimation);
      clearTimeout(timer);
    };
  }, []);

  useAnimationFrame((_t, delta) => {
    if (isMobile || isDragging.current || itemWidthRef.current === 0) return;
    const cappedDelta = Math.min(delta, 32);
    const moveBy = baseVelocity * (cappedDelta / 16);
    const cycleWidth = itemWidthRef.current * services.length;
    const currentX = x.get();
    const newX = currentX + moveBy;
    const wrappedX = wrap(-cycleWidth * 9, -cycleWidth * 4, newX);
    x.set(wrappedX);
  });

  const handlePrev = () => setMobileIndex((prev) => (prev <= 0 ? services.length - 1 : prev - 1));
  const handleNext = () => setMobileIndex((prev) => (prev >= services.length - 1 ? 0 : prev + 1));

  // Mobile: index-based carousel
  if (isMobile) {
    return (
      <section id="services" className="bg-white py-12 overflow-hidden font-kulim">
        <div className="relative w-full px-5">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${mobileIndex * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {services.map((service, index) => (
                <div key={`${service.id}-${index}`} className="relative w-full flex-shrink-0 aspect-[350/365] bg-black p-5 flex flex-col justify-between select-none">
                  <div className="flex justify-between items-start z-10">
                    <h3 className="text-3xl font-bold text-white leading-tight">
                      {service.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h3>
                    <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white text-sm font-light">{service.id}</div>
                  </div>
                  <div className="relative w-full flex-1 overflow-hidden mt-2">
                    <video
                      src={service.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              ))}
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

  // Desktop: infinite auto-scroll
  return (
    <section id="services" className="bg-white py-20 overflow-hidden font-kulim">
      <div className={`w-full overflow-hidden cursor-grab active:cursor-grabbing transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`} ref={containerRef}>
        <motion.div
          className="flex w-max gap-6"
          style={{ x, willChange: 'transform' }}
          drag="x"
          dragConstraints={{ left: -500000, right: 500000 }}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 300); }}
        >
          {infiniteServices.map((service, index) => (
            <div key={`${service.id}-${index}`} ref={index === 0 ? itemRef : null} className="relative w-[380px] 3xl:w-[470px] 4xl:w-[600px] h-[470px] 3xl:h-[560px] 4xl:h-[720px] bg-black p-6 3xl:p-8 4xl:p-10 flex flex-col justify-between shrink-0 border border-black group select-none pointer-events-none" style={{ contain: 'layout' }}>
              <div className="flex justify-between items-start z-10 h-[130px] 3xl:h-[155px] 4xl:h-[200px]">
                <h3 className="text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-white leading-tight">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>
                <div className="w-12 h-12 4xl:w-16 4xl:h-16 rounded-full border border-white/40 flex items-center justify-center text-white text-base 4xl:text-xl font-light">{service.id}</div>
              </div>
              <div className="relative w-full flex-1 overflow-hidden">
                <video
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

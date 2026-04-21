import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, wrap } from 'framer-motion';

const sharedObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const cb = entry.target._lazyVideoCb;
      if (cb) cb(entry.isIntersecting);
    }
  },
  { rootMargin: '1500px' }
);

const LazyVideo = ({ src, className }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const mountedRef = useRef(false);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    el._lazyVideoCb = (isIntersecting) => {
      if (isIntersecting && !mountedRef.current) {
        mountedRef.current = true;
        setShouldMount(true);
      }
      const video = videoRef.current;
      if (!video) return;
      if (isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    sharedObserver.observe(el);
    return () => {
      sharedObserver.unobserve(el);
      delete el._lazyVideoCb;
    };
  }, [src]);

  return (
    <div ref={ref} className={className}>
      {shouldMount ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <div className="w-full h-full bg-black" />
      )}
    </div>
  );
};

const Services = () => {
  const services = [
    { id: '01', title: 'Motion Graphics', video: '/video/home_list/Motion.mp4' },
    { id: '02', title: 'UI/UX', video: '/video/home_list/UIUX.mp4' },
    { id: '03', title: 'Graphic Design', video: '/video/home_list/Graphic.mp4' },
    { id: '04', title: 'App Development', video: '/video/home_list/App 2.mp4' },
    { id: '05', title: 'ERP', video: '/video/home_list/ERP 2.mp4' },
    { id: '06', title: 'System Development', video: '/video/home_list/System developement.mp4' },
    { id: '07', title: 'AI/AX', video: '/video/home_list/AI AX_2.mp4' },
  ];
  const infiniteServices = Array(6).fill(services).flat();

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

  // 페이지 로드 완료 후 유휴 시간에 서비스 영상 7개 prefetch (HTTP 캐시)
  useEffect(() => {
    const prefetchAll = () => {
      services.forEach((s) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'video';
        link.href = s.video;
        document.head.appendChild(link);
      });
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(prefetchAll, { timeout: 3000 });
      } else {
        setTimeout(prefetchAll, 1500);
      }
    };
    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
      return () => window.removeEventListener('load', schedule);
    }
  }, []);

  useEffect(() => {
    const setupAnimation = () => {
      if (itemRef.current) {
        const w = itemRef.current.offsetWidth + 24;
        itemWidthRef.current = w;
        const cycleWidth = w * services.length;
        x.set(-cycleWidth * 2);
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
    const wrappedX = wrap(-cycleWidth * 4, -cycleWidth * 2, newX);
    x.set(wrappedX);
  });

  const handlePrev = () => setMobileIndex((prev) => (prev <= 0 ? services.length - 1 : prev - 1));
  const handleNext = () => setMobileIndex((prev) => (prev >= services.length - 1 ? 0 : prev + 1));

  // Mobile: index-based carousel
  if (isMobile) {
    return (
      <section id="services" className="bg-white py-0 md:py-12 overflow-hidden font-kulim">
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
                  <LazyVideo src={Math.abs(mobileIndex - index) <= 1 ? service.video : ''} className="relative w-full flex-1 overflow-hidden mt-2" />
                </div>
              ))}
            </motion.div>
          </div>
          {/* Navigation arrows */}
          <div className="flex justify-between items-center mt-4 px-1">
            <button onClick={handlePrev} className="p-2" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={handleNext} className="p-2" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
              <LazyVideo src={service.video} className="relative w-full flex-1 overflow-hidden" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

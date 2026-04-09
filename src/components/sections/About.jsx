import React from 'react';
import { motion } from 'framer-motion';
import Counter from '../Counter';

const About = () => {
  const logoFiles = [
    '/img/logo/1. 에르메스.png', '/img/logo/2. 삼성전자 로고_2.png', '/img/logo/3. 3M.png',
    '/img/logo/4. 펩시.png', '/img/logo/5. 현대 L&C.png', '/img/logo/6. Honda.png',
    '/img/logo/7. CJ 제일제당.png', '/img/logo/8. CJ 대한통운.webp', '/img/logo/9. 카카오 로고.svg',
    '/img/logo/10. gs25 로고.svg', '/img/logo/11. kt-ci.png', '/img/logo/12. HSBC.png',
    '/img/logo/13. Lotte_Wellfood_logo.svg.png', '/img/logo/14. KB 금융.png', '/img/logo/15. SK 쉴더스.png',
    '/img/logo/16. 한화비전.png', '/img/logo/17. 한컴 로고.png', '/img/logo/18. 펄어비스.png',
    '/img/logo/19. 교보 DTS.jpg', '/img/logo/20. 오늘의 집 로고.png', '/img/logo/21. 기획재정부 로고.png',
    '/img/logo/22. 국방과학연구소.png', '/img/logo/23. 서울시.png', '/img/logo/24. 경기도교육청_2.png',
    '/img/logo/25. 서대문구청.png', '/img/logo/26. 한국전력공가 로고.svg', '/img/logo/27. 화성특레시.svg',
  ];
  const allLogos = [...logoFiles, ...logoFiles];
  const stats = [
    { value: 7, suffix: ' Brands', label: 'TOP 100 Global Brands' },
    { value: 110000, prefix: '$ ', label: 'Largest Project Scale' },
    { value: 8, suffix: ' Countries', label: 'Countries Expanded Into' },
    { value: 2200, suffix: ' +', label: 'Projects Delivering' },
  ];

  return (
    <section id="about" className="w-full md:min-h-screen bg-white pt-13 pb-0 md:pb-10 3xl:pb-16 4xl:pb-20 relative font-kulim flex flex-col justify-between">
      <div className="w-full overflow-hidden shrink-0 mt-4 mb-6 3xl:mb-25">
        <div className="flex w-max animate-marquee items-center gap-16">
          {allLogos.map((src, index) => (
            <div key={index} className="flex-shrink-0">
              <img src={src} alt={`Client Logo ${index}`} className="h-8 md:h-9 3xl:h-10 4xl:h-12 w-auto object-contain max-w-[120px] 3xl:max-w-[140px] 4xl:max-w-[180px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="w-full px-6 pt-6 flex flex-col lg:hidden">
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="relative w-[150px] h-[220px] shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <video src="/video/home/Innovation - Layers 3.mp4" autoPlay muted loop playsInline className="w-full h-full object-contain" />
          </motion.div>
          <motion.h2 className="text-[36px] font-[400] leading-[42px] text-gray-900" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}>
            Leading <br /><span className="text-[#1907b7] italic font-bold">the charge</span> <br />in global <br />business <br /><span className="text-[#ef283f] italic font-bold">innovation.</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 gap-y-8 gap-x-6">
          {stats.map((stat, index) => (
            <motion.div key={index} className="border-l-[1px] border-gray-200 pl-4" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: 'easeOut' }}>
              <h3 className="text-[28px] font-kulim font-normal text-gray-900 whitespace-nowrap tracking-tighter leading-[32px]">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </h3>
              <p className="text-[11px] font-inter font-light text-gray-500 mt-1 uppercase leading-[14px] max-w-[130px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="w-full px-6 md:px-20 lg:px-24 pt-4 4xl:pt-30 hidden lg:grid grid-cols-12 gap-8 3xl:gap-10 4xl:gap-14 items-center flex-grow max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto">
        <div className="lg:col-span-4 flex justify-center lg:justify-start relative">
          <motion.div
            className="relative w-64 h-[400px] lg:w-72 lg:h-[450px] 3xl:w-[28rem] 3xl:h-[580px] 4xl:w-[32rem] 4xl:h-[720px] lg:mt-14 3xl:-mt-2 4xl:-mt-16 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <video src="/video/home/Innovation - Layers 3.mp4" autoPlay muted loop playsInline className="w-full h-full object-contain" />
          </motion.div>
        </div>

        <div className="lg:col-span-5 text-center lg:text-left mb-12 lg:mb-0 3xl:self-start 3xl:pt-4 4xl:self-start 4xl:pt-1">
          <motion.h2 className="text-4xl lg:text-5xl 3xl:text-[3.25rem] 4xl:text-7xl font-light leading-tight text-gray-900 pb-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}>
            Leading <span className="text-[#1907b7] italic font-bold">the charge</span> <br />
            in global business <br />
            <span className="text-[#ef283f] italic font-bold">innovation.</span>
          </motion.h2>
          <motion.div className="mt-44 3xl:mt-56 ml-2 hidden lg:block 4xl:scale-125 origin-left" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}>
            <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        <div className="lg:col-span-3 3xl:self-start 3xl:pt-4 4xl:pt-1 grid grid-cols-2 lg:grid-cols-1 gap-y-10 gap-x-6 lg:gap-0 lg:space-y-6 3xl:space-y-8 4xl:space-y-10">
          {stats.map((stat, index) => (
            <motion.div key={index} className="border-l-2 border-gray-100 pl-4 lg:pl-8 4xl:pl-12 hover:border-[#1907b7] transition-colors duration-300" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: 'easeOut' }}>
              <h3 className="text-3xl lg:text-4xl 3xl:text-[2.6rem] 4xl:text-6xl font-kulim font-normal text-gray-900 whitespace-nowrap leading-normal">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </h3>
              <p className="text-sm 3xl:text-base 4xl:text-lg font-inter font-normal text-gray-900 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="w-full px-6 md:px-20 lg:px-32 shrink-0 pb-6 mt-20 md:mt-16 3xl:mt-24 4xl:mt-28 max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}>
        {/* 모바일 화살표 - 텍스트 위 */}
        <motion.div className="mb-6 md:hidden" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.7 }}>
          <svg width="70" height="20" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <div className="flex justify-between items-end">
          <h2 className="text-[36px] md:text-[40px] lg:text-[48px] 3xl:text-[52px] 4xl:text-[72px] font-normal text-gray-800 leading-[1.15]">
            We deliver <br className="block md:hidden" /> <span className="text-[#1907b7] font-bold">the best results</span> - <br />
            always with <br className="block md:hidden" /> <span className="text-[#ef283f] font-bold">the right solution.</span>
          </h2>
          <motion.div className="hidden md:block mb-2 4xl:scale-125 origin-right" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.7 }}>
            <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

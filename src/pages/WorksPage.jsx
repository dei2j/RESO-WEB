import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// ── 랜딩 인트로에 사용할 로고 10개 ──
const INTRO_LOGOS = [
  '/img/logo/1. 에르메스.webp',
  '/img/logo/2. 삼성전자 로고_2.webp',
  '/img/logo/3. 3M.webp',
  '/img/logo/4. 펩시.webp',
  '/img/logo/6. Honda.webp',
  '/img/logo/9. 카카오 로고.svg',
  '/img/logo/11. kt-ci.webp',
  '/img/logo/12. HSBC.webp',
  '/img/logo/14. KB 금융.webp',
  '/img/logo/7. CJ 제일제당.webp',
  '/img/logo/13. Lotte_Wellfood_logo.svg.webp',
  '/img/logo/15. SK 쉴더스.webp',
  '/img/logo/16. 한화비전.webp',
  '/img/logo/18. 펄어비스.webp',
  '/img/logo/20. 오늘의 집 로고.webp',
  '/img/logo/21. 기획재정부 로고.webp',
  '/img/logo/22. 국방과학연구소.webp',
  '/img/logo/23. 서울시.webp',
  '/img/logo/24. 경기도교육청_2.webp',
  '/img/logo/25. 서대문구청.webp',
  '/img/logo/26. 한국전력공가 로고.svg',
  '/img/logo/27. 화성특레시.svg',
];

// ── 로고별 랜덤 시작 위치 + 3D 회전값 ──
const getRandomPositions = (count) => {
  const positions = [];
  // 안쪽/바깥쪽 두 링으로 나눠서 골고루 배치
  const innerCount = Math.ceil(count / 2);
  const outerCount = count - innerCount;
  for (let i = 0; i < count; i++) {
    const isInner = i < innerCount;
    const ringIndex = isInner ? i : i - innerCount;
    const ringTotal = isInner ? innerCount : outerCount;
    const offset = isInner ? 0 : Math.PI / outerCount; // 바깥 링 살짝 회전
    const angle = (ringIndex / ringTotal) * Math.PI * 2 + offset + (Math.random() * 0.15 - 0.075);
    const dist = isInner ? 20 + Math.random() * 12 : 36 + Math.random() * 14;
    positions.push({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      rotate: Math.random() * 30 - 15,
      rotateX: Math.random() * 60 - 30,
      rotateY: Math.random() * 60 - 30,
      scale: 0.6 + Math.random() * 0.5,
    });
  }
  return positions;
};

const luxuryEase = [0.76, 0, 0.24, 1];
const smoothEase = [0.16, 1, 0.3, 1];

// ── 인트로 컴포넌트 (appear → gather → pulse → split) ──
const WorksIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('appear');
  const positions = useMemo(() => getRandomPositions(INTRO_LOGOS.length), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('gather'), 700);
    const t2 = setTimeout(() => setPhase('pulse'), 1600);
    const t3 = setTimeout(() => setPhase('split'), 2000);
    const t4 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const isGathered = phase !== 'appear';
  const isPulseOrLater = phase === 'pulse' || phase === 'split';
  const isSplit = phase === 'split';

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ perspective: '800px' }}>
      {/* 분할 배경 — 상단 */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-white"
        animate={{ y: isSplit ? '-100%' : 0 }}
        transition={{ duration: 0.8, ease: luxuryEase }}
      />
      {/* 분할 배경 — 하단 */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-white"
        animate={{ y: isSplit ? '100%' : 0 }}
        transition={{ duration: 0.8, ease: luxuryEase }}
      />

      {/* 로고들 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {INTRO_LOGOS.map((src, i) => {
          const pos = positions[i];
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${pos.x}vw`,
                y: `${pos.y}vh`,
                opacity: 0,
                scale: 0,
                rotate: pos.rotate,
                rotateX: pos.rotateX,
                rotateY: pos.rotateY,
              }}
              animate={{
                x: isGathered ? 0 : `${pos.x}vw`,
                y: isGathered ? 0 : `${pos.y}vh`,
                opacity: isPulseOrLater ? 0 : 1,
                scale: isGathered ? 0.4 : pos.scale,
                rotate: isGathered ? 0 : pos.rotate,
                rotateX: isGathered ? 0 : pos.rotateX,
                rotateY: isGathered ? 0 : pos.rotateY,
              }}
              transition={
                isPulseOrLater
                  ? { duration: 0.3, ease: 'easeOut' }
                  : isGathered
                    ? { duration: 0.8, ease: luxuryEase, delay: i * 0.02 }
                    : { duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.015 }
              }
            >
              <img
                src={src}
                alt=""
                className="h-16 md:h-22 w-auto object-contain max-w-[200px] select-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 가운데 빛 효과 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(25,7,183,0.2) 0%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isPulseOrLater ? 6 : isGathered ? 2.5 : 0,
          opacity: isSplit ? 0 : isGathered ? 0.9 : 0,
        }}
        transition={{ duration: isPulseOrLater ? 0.4 : 0.8, ease: smoothEase }}
      />
    </div>
  );
};

// ── Work Items ──
const WORK_ITEMS = [
  { title: 'AIA', category: 'Digital experience', image: '/img/포트폴리오 썸네일/AIA.webp', caseUrl: '/case/aia' },
  { title: 'KT', category: 'Digital experience', image: '/img/포트폴리오 썸네일/KT.webp', caseUrl: '/case/kt' },
  { title: 'Agent F', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Agent F.webp', caseUrl: '/case/agent-f' },
  { title: 'HSBC', category: 'Digital experience', image: '/img/포트폴리오 썸네일/HSBC.webp', caseUrl: '/case/hsbc' },
  { title: 'Royal Salute', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Royal Salute.webp', caseUrl: '/case/royal-salute' },
  { title: 'Zeta Mobility', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Zeta Mobility.webp', caseUrl: '/case/zeta-mobility' },
  { title: 'Hermes', category: 'Digital experience', image: '/img/포트폴리오 썸네일/hermes.webp', caseUrl: '/case/hermes' },
  { title: 'Kumho Tire', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Kumho Tire.webp', caseUrl: '/case/kumho-tire' },
  { title: 'CJ 제일제당', category: 'Digital experience', image: '/img/포트폴리오 썸네일/CJ 제일제당.webp', caseUrl: '/case/cj' },
  { title: '프로그래머스', category: 'Digital experience', image: '/img/포트폴리오 썸네일/프로그래머스.webp', caseUrl: '/case/programmers' },
  { title: 'Desilo', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Desilo.webp', caseUrl: '/case/desilo' },
  { title: 'Takamol', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Takamol.webp', caseUrl: '/case/takamol' },
  { title: 'Parc', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Parc.webp', caseUrl: '/case/parc' },
  { title: 'Ecover', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Ecover.webp', caseUrl: '/case/ecover' },
  { title: 'Rosatis', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Rosati_s.webp', caseUrl: '/case/rosatis' },
  { title: 'Guro', category: 'Digital experience', image: '/img/포트폴리오 썸네일/guro.webp', caseUrl: '/case/guro' },
  { title: 'CIMB Bank', category: 'Digital experience', image: '/img/포트폴리오 썸네일/cimb.webp', caseUrl: '/case/cimb' },
  { title: '한국주택금융공사', category: 'Digital experience', image: '/img/Portfolio/한국주택금융공사/Screenshot 2026-03-30 140743.webp', caseUrl: '/case/khfc' },
  { title: 'Urban break', category: 'Digital experience', image: '/img/Portfolio/Urban Break/Screenshot 2026-03-31 170926.webp', caseUrl: '/case/urban-break' },
  { title: 'Lotte wellfood', category: 'Digital experience', image: '/img/포트폴리오 썸네일/Lotte.webp', caseUrl: '/case/lotte-wellfood' },
  { title: 'SI', category: 'Digital experience', image: '/img/포트폴리오 썸네일/si.webp', caseUrl: '/case/deulgogayu' },
  { title: 'Lolpago', category: 'Digital experience', image: '/img/포트폴리오 썸네일/롤파고.webp', caseUrl: '/case/lolpago' },
  { title: 'Taekwondo Tournament', category: 'Digital experience', image: '/img/포트폴리오 썸네일/태권도.webp', caseUrl: '/case/taekwondo' },
];

function chunkByPattern(items, pattern = [1, 2]) {
  const rows = [];
  let i = 0;
  let patternIndex = 0;
  while (i < items.length) {
    const size = pattern[patternIndex % pattern.length];
    rows.push(items.slice(i, i + size));
    i += size;
    patternIndex += 1;
  }
  return rows;
}

// ── 애니메이션 variants ──
const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.2, ease: smoothEase },
  },
};

const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
};

// ── 헤딩 마스크 리빌 ──
const headingReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1, ease: smoothEase, delay: 0.2 },
  },
};

// ── GridCard ──
const GridCard = ({ title, category, image, caseUrl, index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 30 });

  const aspectClass = 'aspect-[4/3] md:aspect-[5/4]';
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
    >
      {/* 이미지 */}
      <motion.div variants={clipReveal}>
        {caseUrl ? (
          <Link to={caseUrl} className="block mb-5 md:mb-6" onClick={() => { window.__fromWorksToCase = true; }}>
            <div className="relative w-full overflow-hidden bg-gray-100" ref={ref}>
              <div className={aspectClass}>
                <motion.img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover min-h-[120%] object-top"
                  style={{ y: parallaxY }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.6, ease: smoothEase }}
                />
              </div>
            </div>
          </Link>
        ) : (
          <div className="mb-5 md:mb-6">
            <div className="relative w-full overflow-hidden bg-gray-100" ref={ref}>
              <div className={aspectClass}>
                <motion.img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover min-h-[120%] object-top"
                  style={{ y: parallaxY }}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* 넘버 + 타이틀 + 화살표 */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-baseline gap-2 md:gap-4">
          <motion.span
            variants={textFadeUp}
            className="font-kulim font-light text-gray-300 text-xs md:text-base"
          >
            {num}
          </motion.span>
          <motion.h3
            variants={textFadeUp}
            className="font-kulim font-bold italic text-[#1907b7] text-xl md:text-4xl lg:text-5xl leading-tight"
          >
            {title}
          </motion.h3>
        </div>
        {caseUrl && (
          <motion.div variants={textFadeUp}>
            <Link
              to={caseUrl}
              onClick={() => { window.__fromWorksToCase = true; }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ee2c41] flex items-center justify-center shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-4 md:h-4">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>

      {/* 카테고리 */}
      <motion.p
        variants={textFadeUp}
        className="font-pretendard font-extralight text-gray-400 text-[11px] md:text-sm leading-tight mb-3 pl-6 md:pl-10"
      >
        {category}
      </motion.p>

    </motion.article>
  );
};

// ── FeaturedCard ──
const FeaturedCard = ({ title, category, image, caseUrl, index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 30 });
  const num = String(index + 1).padStart(2, '0');

  const imageBlock = (
    <motion.div
      className="relative w-full overflow-hidden bg-gray-100"
      ref={ref}
      variants={clipReveal}
    >
      <div className={`aspect-[4/3] ${index === 0 ? 'md:aspect-[16/9]' : 'md:aspect-[16/9]'}`}>
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover min-h-[120%] object-top"
          style={{ y: parallaxY }}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 pointer-events-none hidden md:block">
          <div className="flex items-baseline gap-2 md:gap-4 mb-1">
            <span className="font-kulim font-light text-white/40 text-xs md:text-base">{num}</span>
            <h3 className="font-kulim font-bold italic text-white text-2xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight drop-shadow-md">
              {title}
            </h3>
          </div>
          <p className="font-pretendard font-extralight text-white/60 text-[11px] md:text-sm leading-tight mb-2 md:mb-3 pl-6 md:pl-10">
            {category}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.article
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {caseUrl ? <Link to={caseUrl} className="block" onClick={() => { window.__fromWorksToCase = true; }}>{imageBlock}</Link> : imageBlock}

      {/* 모바일: 이미지 아래 제목 + 화살표 */}
      <div className="md:hidden mt-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-baseline gap-2">
            <span className="font-kulim font-light text-gray-300 text-xs">{num}</span>
            <h3 className="font-kulim font-bold italic text-[#1907b7] text-xl leading-tight">{title}</h3>
          </div>
          {caseUrl && (
            <Link
              to={caseUrl}
              onClick={() => { window.__fromWorksToCase = true; }}
              className="w-8 h-8 rounded-full bg-[#ee2c41] flex items-center justify-center shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
        </div>
        <p className="font-pretendard font-extralight text-gray-400 text-[11px] leading-tight pl-6">{category}</p>
      </div>
    </motion.article>
  );
};

// ── '사라락' reveal variants ──
const softRevealVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
    clipPath: 'inset(10% 0% 10% 0%)',
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 1.2,
      ease: smoothEase,
      delay: (i % 4) * 0.1,
    },
  }),
};

// ── ArchiveCard (compact grid card) ──
const ArchiveCard = ({ title, image, caseUrl, index }) => {
  const navigate = useNavigate();
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      custom={index}
      variants={softRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      role="button"
      tabIndex={0}
      onClick={() => { if (caseUrl) { window.__fromWorksToCase = true; navigate(caseUrl); } }}
      onKeyDown={(e) => { if (caseUrl && (e.key === 'Enter' || e.key === ' ')) { window.__fromWorksToCase = true; navigate(caseUrl); } }}
      className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-gray-100"
    >
      {/* 이미지: 호버 시 미세 확대 */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />

      {/* 호버 그라디언트 오버레이: 하단 강화 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* 인덱스 번호 */}
      <span className="absolute top-4 left-4 3xl:top-5 3xl:left-5 text-white/0 group-hover:text-white/50 text-xs 3xl:text-sm font-light tracking-wider transition-all duration-500 delay-75 z-20">
        {num}
      </span>

      {/* 콘텐츠: 스르륵 페이드 */}
      <div className="absolute inset-x-0 bottom-0 p-5 3xl:p-6 4xl:p-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {/* 레드 포인트 바 */}
        <div className="w-10 h-[2px] bg-[#ef283f] mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        <div className="space-y-1">
          <h4 className="text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl font-bold italic text-white uppercase">
            {title}
          </h4>
          <p className="text-white/60 text-[10px] md:text-xs 3xl:text-sm tracking-widest uppercase">
            Digital Experience
          </p>
        </div>
      </div>

      {/* 화살표 */}
      <div className="absolute top-4 right-4 3xl:top-5 3xl:right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 scale-75 group-hover:scale-100 z-20">
        <div className="w-8 h-8 3xl:w-9 3xl:h-9 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </motion.div>
  );
};

const WorksPage = () => {
  const rows = useMemo(() => chunkByPattern(WORK_ITEMS, [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1]), []);
  const [activeTab, setActiveTab] = useState('featured');
  // 케이스 스터디에서 돌아온 경우(뒤로가기 or Back to list) 스킵
  const skipIntro = !!window.__fromWorksToCase;
  const [introDone, setIntroByDone] = useState(skipIntro);
  const handleIntroDone = useMemo(() => () => setIntroByDone(true), []);
  useEffect(() => { window.__fromWorksToCase = false; }, []);

  return (
    <>
      {/* 랜딩 인트로: 로고 scatter → gather → fade */}
      <AnimatePresence>
        {!introDone && <WorksIntro onComplete={handleIntroDone} />}
      </AnimatePresence>

      <main className="bg-white text-black min-h-screen font-kulim">
        <div className="w-full max-w-[1100px] 3xl:max-w-[1300px] 4xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 pt-20 md:pt-32">
          {/* 헤딩 마스크 리빌 */}
          <motion.div
            className="mb-8 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              variants={headingReveal}
              className="font-kulim font-bold italic text-[#1907b7] text-3xl md:text-5xl lg:text-[64px] leading-tight"
            >
              Our Works
            </motion.h1>
          </motion.div>

          {/* 탭 */}
          <div className="flex gap-10 md:gap-12 border-b border-gray-100 mb-14 md:mb-24">
            {['featured', 'archive'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative pb-4 group cursor-pointer"
              >
                <span className={`text-xs md:text-sm uppercase tracking-[0.3em] transition-colors duration-300 ${
                  activeTab === tab ? 'text-[#1907b7] font-bold' : 'text-gray-400 group-hover:text-gray-600'
                }`}>
                  {tab}
                </span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="works-tab-line"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1907b7]"
                    transition={{ duration: 0.4, ease: smoothEase }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="pb-20 md:pb-40">
          <AnimatePresence mode="wait">
            {activeTab === 'featured' ? (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: smoothEase }}
                className="w-full max-w-[1100px] 3xl:max-w-[1300px] 4xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16"
              >
                <div className="space-y-16 md:space-y-40">
                  {rows.map((row, rowIndex) => {
                    let cumIndex = 0;
                    for (let r = 0; r < rowIndex; r++) cumIndex += rows[r].length;

                    return (
                      <React.Fragment key={rowIndex}>
                        {row.length === 1 ? (
                          <div className="relative">
                            <section className={`w-full mx-auto ${cumIndex === 0 ? 'max-w-full' : 'max-w-full md:max-w-[78%] lg:max-w-[75%]'}`}>
                              <FeaturedCard
                                title={row[0].title}
                                category={row[0].category}
                                image={row[0].image}
                                caseUrl={row[0].caseUrl}
                                index={cumIndex}
                              />
                            </section>
                            {cumIndex !== 0 && (
                              <>
                                <motion.div className="hidden md:block absolute bottom-0 left-0" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}>
                                  <svg width="60" height="16" viewBox="0 0 90 24" fill="none"><path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </motion.div>
                                <motion.div className="hidden md:block absolute bottom-0 right-0" initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}>
                                  <svg width="60" height="16" viewBox="0 0 90 24" fill="none"><path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </motion.div>
                              </>
                            )}
                          </div>
                        ) : (
                          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-end max-w-full">
                            {row.map((item, idx) => (
                              <GridCard
                                key={item.title}
                                title={item.title}
                                category={item.category}
                                image={item.image}
                                caseUrl={item.caseUrl}
                                index={cumIndex + idx}
                              />
                            ))}
                          </section>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="archive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                className="w-full max-w-[1100px] 3xl:max-w-[1300px] 4xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {WORK_ITEMS.map((item, idx) => (
                    <ArchiveCard
                      key={item.title}
                      title={item.title}
                      image={item.image}
                      caseUrl={item.caseUrl}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default WorksPage;

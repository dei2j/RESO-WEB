import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// ── 랜딩 인트로에 사용할 로고 10개 ──
const INTRO_LOGOS = [
  '/img/logo/1. 에르메스.png',
  '/img/logo/2. 삼성전자 로고_2.png',
  '/img/logo/3. 3M.png',
  '/img/logo/4. 펩시.png',
  '/img/logo/6. Honda.png',
  '/img/logo/9. 카카오 로고.svg',
  '/img/logo/11. kt-ci.png',
  '/img/logo/12. HSBC.png',
  '/img/logo/14. KB 금융.png',
  '/img/logo/7. CJ 제일제당.png',
  '/img/logo/13. Lotte_Wellfood_logo.svg.png',
  '/img/logo/15. SK 쉴더스.png',
  '/img/logo/16. 한화비전.png',
  '/img/logo/18. 펄어비스.png',
  '/img/logo/20. 오늘의 집 로고.png',
  '/img/logo/21. 기획재정부 로고.png',
  '/img/logo/22. 국방과학연구소.png',
  '/img/logo/23. 서울시.png',
  '/img/logo/24. 경기도교육청_2.png',
  '/img/logo/25. 서대문구청.png',
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
  { title: 'AIA', category: 'Digital experience', image: '/img/Portfolio/AIA/Screenshot%202026-02-10%20064548.png', caseUrl: '/case/aia' },
  { title: 'KT', category: 'Digital experience', image: '/img/Portfolio/KT/Sce 1-01.png의 사본.png', caseUrl: '/case/kt' },
  { title: 'Agent F', category: 'Digital experience', image: '/img/Portfolio/Agent%20F/0s-10s-04.png', caseUrl: '/case/agent-f' },
  { title: 'Royal Salute', category: 'Digital experience', image: '/img/Portfolio/Royal%20Salute/Screenshot%202026-02-10%20073827.png', caseUrl: '/case/royal-salute' },
  { title: 'Zeta Mobility', category: 'Digital experience', image: '/img/Portfolio/Zeta/Screenshot%202026-02-10%20074349.png', caseUrl: '/case/zeta-mobility' },
  { title: 'HSBC', category: 'Digital experience', image: '/img/Portfolio/HSBC/Screenshot%202026-02-10%20070438.png', caseUrl: '/case/hsbc' },
  { title: '프로그래머스', category: 'Digital experience', image: '/img/Portfolio/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4/Screenshot%202026-02-10%20063923.png', caseUrl: '/case/programmers' },
  { title: 'Hermes', category: 'Digital experience', image: '/img/Portfolio/hermes/1.png', caseUrl: '/case/hermes' },
  { title: 'Kumho Tire', category: 'Digital experience', image: '/img/Portfolio/Kumho Tire/Screenshot 2026-03-13 111701.png', caseUrl: '/case/kumho-tire' },
  { title: 'CJ 제일제당', category: 'Digital experience', image: '/img/Portfolio/CJ/Screenshot%202026-02-10%20065257.png', caseUrl: '/case/cj' },
  { title: 'Desilo', category: 'Digital experience', image: '/img/Portfolio/Desilo/Screenshot%202026-02-10%20065716.png', caseUrl: '/case/desilo' },
  { title: 'Takamol', category: 'Digital experience', image: '/img/Portfolio/Takamol/Screenshot%202026-02-10%20074036.png', caseUrl: '/case/takamol' },
  { title: 'Parc', category: 'Digital experience', image: '/img/Portfolio/Parc%205/Screenshot%202026-02-10%20071031.png', caseUrl: '/case/parc' },
  { title: 'Ecover', category: 'Digital experience', image: '/img/Portfolio/Ecover/Screenshot%202026-02-10%20074713.png', caseUrl: '/case/ecover' },
  { title: 'Rosatis', category: 'Digital experience', image: '/img/Portfolio/Rosati/Screenshot%202026-02-10%20072923.png', caseUrl: '/case/rosatis' },
  { title: 'Guro', category: 'Digital experience', image: '/img/Portfolio/Guro/Screenshot%202026-02-10%20070056.png', caseUrl: '/case/guro' },
  { title: 'Stock video', category: 'Digital experience', image: 'https://images.unsplash.com/photo-1549439602-43ebca23d7e5?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/stock-video' },
  { title: '한국주택금융공사', category: 'Digital experience', image: 'https://images.unsplash.com/photo-1610945265078-386f3b58d86f?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/khfc' },
  { title: 'Lotte wellfood', category: 'Digital experience', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/lotte-wellfood' },
  { title: 'Urban break', category: 'Digital experience', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?q=80&w=800&auto=format&fit=crop', caseUrl: '/case/urban-break' },
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

const headingLineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.6 },
  },
};

// ── GridCard ──
const GridCard = ({ title, category, image, caseUrl, variant = 'tall', index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 30 });

  const aspectClass = variant === 'tall' ? 'aspect-[4/3] md:aspect-[670/580]' : 'aspect-[4/3] md:aspect-[670/440]';
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
                  className="absolute inset-0 w-full h-full object-cover min-h-[120%] object-center"
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
                  className="absolute inset-0 w-full h-full object-cover min-h-[120%] object-center"
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

      {/* 호버 도트 */}
      <motion.div className="flex gap-1.5 md:gap-2 pl-6 md:pl-10" initial={false}>
        <motion.span
          className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bg-[#ee2c41] shrink-0"
          aria-hidden
          animate={{ x: isHovered ? -4 : 0, scale: isHovered ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 14 }}
        />
        <motion.span
          className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bg-[#ee2c41] shrink-0"
          aria-hidden
          animate={{ x: isHovered ? 4 : 0, scale: isHovered ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 0.04 }}
        />
      </motion.div>
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
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 30 });
  const num = String(index + 1).padStart(2, '0');

  const imageBlock = (
    <motion.div
      className="relative w-full overflow-hidden bg-gray-100"
      ref={ref}
      variants={clipReveal}
    >
      <div className="aspect-[4/3] md:aspect-[21/9]">
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover min-h-[120%] object-center"
          style={{ y: parallaxY }}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 pointer-events-none">
          <div className="flex items-baseline gap-2 md:gap-4 mb-1">
            <span className="font-kulim font-light text-white/40 text-xs md:text-base">{num}</span>
            <h3 className="font-kulim font-bold italic text-white text-2xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight drop-shadow-md">
              {title}
            </h3>
          </div>
          <p className="font-pretendard font-extralight text-white/60 text-[11px] md:text-sm leading-tight mb-2 md:mb-3 pl-6 md:pl-10">
            {category}
          </p>
          <motion.div className="flex gap-1.5 md:gap-2 pl-6 md:pl-10" initial={false}>
            <motion.span
              className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bg-[#ee2c41] shrink-0"
              aria-hidden
              animate={{ x: isHovered ? -4 : 0, scale: isHovered ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 14 }}
            />
            <motion.span
              className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bg-[#ee2c41] shrink-0"
              aria-hidden
              animate={{ x: isHovered ? 4 : 0, scale: isHovered ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 0.04 }}
            />
          </motion.div>
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
    </motion.article>
  );
};

const WorksPage = () => {
  const rows = useMemo(() => chunkByPattern(WORK_ITEMS), []);
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
        <div className="w-full max-w-[1920px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 pt-20 md:pt-32 pb-20 md:pb-40">
          {/* 헤딩 마스크 리빌 */}
          <motion.div
            className="mb-10 md:mb-28"
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
            <motion.div
              variants={headingLineReveal}
              className="h-px bg-[#1907b7]/20 mt-4 md:mt-6 origin-left"
            />
          </motion.div>

          <div className="space-y-16 md:space-y-40">
            {rows.map((row, rowIndex) => {
              // 누적 인덱스 계산
              let cumIndex = 0;
              for (let r = 0; r < rowIndex; r++) cumIndex += rows[r].length;

              return (
                <React.Fragment key={rowIndex}>
{row.length === 1 ? (
                    <section className="w-full max-w-full md:max-w-[90%] lg:max-w-[88%] mx-auto">
                      <FeaturedCard
                        title={row[0].title}
                        category={row[0].category}
                        image={row[0].image}
                        caseUrl={row[0].caseUrl}
                        index={cumIndex}
                      />
                    </section>
                  ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 items-end">
                      {row.map((item, idx) => (
                        <GridCard
                          key={item.title}
                          title={item.title}
                          category={item.category}
                          image={item.image}
                          caseUrl={item.caseUrl}
                          variant={idx === 0 ? 'tall' : 'wide'}
                          index={cumIndex + idx}
                        />
                      ))}
                    </section>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default WorksPage;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CASE_DATA } from '../data/caseStudies';

// ── Luxury easing curves ──
const luxuryEase = [0.76, 0, 0.24, 1];
const enterEase = [0.33, 1, 0.68, 1];
const smoothEase = [0.16, 1, 0.3, 1];

// ── Hero: 라인별 마스크 리빌 ──
const heroLineMask = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 1.1, ease: luxuryEase, delay: 0.3 + i * 0.12 },
  }),
};

const heroFade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: enterEase, delay: 0.7 + i * 0.15 },
  }),
};

// ── Hero BG ──
const heroBgVariants = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: smoothEase },
  },
};

// ── Body: 마스크 리빌 ──
const textMaskVariants = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: { duration: 1, ease: luxuryEase },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: enterEase },
  },
};

// ── Info grid: 스태거 리빌 ──
const infoGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const infoItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: enterEase },
  },
};

// ── 이미지: clipPath 리빌 ──
const imageClipVariants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.2, ease: smoothEase },
  },
};

const imageStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

// ── 스크롤 패럴랙스 이미지 컴포넌트 ──
const ParallaxImg = ({ src, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const y = useSpring(rawY, { stiffness: 80, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden rounded-lg bg-white/5 ${className || ''}`}
      variants={imageClipVariants}
    >
      <motion.img
        src={src}
        alt=""
        className="w-full h-[116%] object-cover"
        style={{ y }}
      />
    </motion.div>
  );
};

// ── 구분선 컴포넌트 ──
const Divider = () => (
  <motion.div
    className="w-full h-px bg-white/10 my-4"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: smoothEase }}
    style={{ transformOrigin: 'left' }}
  />
);

// ── 프로젝트 순서 계산 ──
const slugKeys = Object.keys(CASE_DATA);
const totalProjects = slugKeys.length;

// ── Next Project 섹션 (1. 패럴랙스 / 2. 프로젝트 번호 / 3. 글자별 스태거 / 4. 블러→선명) ──
const NextProjectSection = ({
  sectionRef, isHovering, setIsHovering,
  cursorVisible, cursorPos,
  nextHeroImage, nextTitle, nextHref, nextSlug,
}) => {
  // 2. 프로젝트 번호
  const nextIndex = nextSlug ? slugKeys.indexOf(nextSlug) + 1 : totalProjects;
  const nextNum = String(nextIndex).padStart(2, '0');
  const totalNum = String(totalProjects).padStart(2, '0');

  // 3. 타이틀 글자별 스태거
  const titleChars = nextTitle.split('');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[28vh] md:min-h-[35vh] lg:min-h-[40vh] flex items-center justify-center overflow-hidden cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* BG: 패럴랙스 + 블러→선명 전환 */}
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

      {/* Center content */}
      <div className="relative z-10 text-center pointer-events-none select-none flex flex-col items-center">
        {/* 프로젝트 번호 */}
        <motion.p
          className="font-kulim font-light text-[10px] md:text-xs 3xl:text-xs 4xl:text-sm tracking-[0.3em] uppercase mb-2 text-white/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          {nextNum} / {totalNum}
        </motion.p>

        {/* Next Project 라벨 */}
        <motion.p
          className="font-kulim font-light text-xs md:text-sm 3xl:text-sm 4xl:text-base tracking-[0.2em] uppercase mb-3 md:mb-4 text-white/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Next Project
        </motion.p>

        {/* 타이틀: 글자별 스태거 리빌 */}
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

          {/* 호버 화살표 */}
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

      {/* 클릭 링크 */}
      <Link
        to={nextHref}
        className="absolute inset-0 z-20 cursor-none"
        aria-label={`Go to next project: ${nextTitle}`}
      />

      {/* NEXT 커서 */}
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

const CaseStudyPage = () => {
  const { slug } = useParams();
  const data = CASE_DATA[slug];
  const CUSTOM_HERO = {
    deulgogayu: '/img/Portfolio/들고가유/Crop SI 1.webp',
    lolpago: '/img/Portfolio/롤파고/Crop Lolpago 1.webp',
    taekwondo: '/img/Portfolio/태권도/Crop Taekwondo tournaments 1.webp',
  };
  const nextData = data?.nextSlug ? CASE_DATA[data.nextSlug] : null;
  const nextHeroImage = nextData?.heroImage || CUSTOM_HERO[data?.nextSlug] || data?.heroImage;
  const nextTitle = data?.nextTitle || 'Our Works';
  const nextHref = data?.nextSlug ? `/case/${data.nextSlug}` : '/works';

  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setCursorVisible(false);
    setCursorPos({ x: 0, y: 0 });
    setIsHovering(false);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const onEnter = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const onLeave = () => {
      setCursorVisible(false);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [slug]);

  if (!data) return <Navigate to="/works" replace />;

  const imgs = data.images || [];

  return (
    <main key={slug} className="bg-[#050505] text-black min-h-screen">

      {/* ━━ Hero ━━ */}
      <section className="relative w-full min-h-[55vh] md:min-h-[75vh] overflow-hidden">
        <motion.img
          src={data.heroImage}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover"
          variants={heroBgVariants}
          initial="hidden"
          animate="visible"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#050505]" />

        <motion.div
          className="relative z-10 max-w-[1200px] 3xl:max-w-[1400px] 4xl:max-w-[1920px] mx-auto px-5 md:px-12 lg:px-16 pt-20 md:pt-32 pb-12 md:pb-20 flex flex-col justify-end min-h-[55vh] md:min-h-[75vh]"
          initial="hidden"
          animate="visible"
        >
          {/* subtitle - 마스크 리빌 */}
          <div className="overflow-hidden pb-1">
            <motion.p
              className="font-kulim font-normal text-white/80 text-xl sm:text-2xl md:text-[42px] 3xl:text-[48px] 4xl:text-[52px] leading-tight"
              variants={heroLineMask}
              custom={0}
            >
              {data.subtitle}
            </motion.p>
          </div>

          {/* title - 마스크 리빌 */}
          <div className="overflow-hidden pb-1 mt-1 md:mt-2">
            <motion.h1
              className="font-kulim font-bold text-[#f9f8ff] text-3xl sm:text-4xl md:text-[64px] 3xl:text-[74px] 4xl:text-[86px] leading-[1.05]"
              variants={heroLineMask}
              custom={1}
            >
              {data.title}
            </motion.h1>
          </div>

          {/* category - 페이드 */}
          <motion.p
            className="font-inter font-light text-white/60 text-sm md:text-base 3xl:text-lg 4xl:text-xl mt-4 md:mt-6"
            variants={heroFade}
            custom={0}
          >
            {data.category}
          </motion.p>
        </motion.div>
      </section>

      {/* ━━ 목록으로 돌아가기 ━━ */}
      <div className="bg-[#050505]">
        <div className="max-w-[1200px] 3xl:max-w-[1400px] 4xl:max-w-[1920px] mx-auto px-5 md:px-12 lg:px-16 pt-8 md:pt-10 pb-0">
          <Link
            to="/works"
            onClick={() => { window.__fromWorksToCase = true; }}
            className="inline-flex items-center gap-2 md:gap-3 font-kulim text-white/50 hover:text-white text-base md:text-lg 3xl:text-xl 4xl:text-2xl transition-colors duration-300 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-x-2">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to list
          </Link>
        </div>
      </div>

      {/* ━━ 본문 ━━ */}
      <section className="bg-[#050505] text-white">
        <div className="max-w-[1200px] 3xl:max-w-[1400px] 4xl:max-w-[1920px] mx-auto px-5 md:px-12 lg:px-16 py-10 md:py-24">

          {/* Info Grid - 스태거 리빌 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-8 mb-12 md:mb-20"
            variants={infoGridVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={infoItemVariants}>
              <p className="font-kulim font-normal text-white/50 text-xs md:text-base 3xl:text-lg 4xl:text-xl mb-1 uppercase tracking-wider">Client</p>
              <Divider />
              <p className="font-kulim font-bold text-white text-base md:text-2xl 3xl:text-[28px] 4xl:text-[32px] mt-2 md:mt-3">{data.client}</p>
            </motion.div>
            <motion.div variants={infoItemVariants}>
              <p className="font-kulim font-normal text-white/50 text-xs md:text-base 3xl:text-lg 4xl:text-xl mb-1 uppercase tracking-wider">My Role</p>
              <Divider />
              <p className="font-pretendard font-bold text-white text-sm md:text-xl 3xl:text-[22px] 4xl:text-2xl mt-2 md:mt-3 break-keep">{data.role}</p>
            </motion.div>
            <motion.div variants={infoItemVariants}>
              <p className="font-kulim font-normal text-white/50 text-xs md:text-base 3xl:text-lg 4xl:text-xl mb-1 uppercase tracking-wider">Project</p>
              <Divider />
              <p className="font-pretendard font-bold text-white text-sm md:text-xl 3xl:text-[22px] 4xl:text-2xl mt-2 md:mt-3 break-keep">{data.project}</p>
            </motion.div>
            <motion.div variants={infoItemVariants} className="flex items-end">
              <Link
                to="/contact-us"
                className="inline-block w-full md:w-auto px-4 md:px-5 py-2 md:py-2.5 rounded-[32px] border border-white/30 font-pretendard font-bold text-white text-xs md:text-base 3xl:text-lg 4xl:text-xl hover:bg-white hover:text-black transition-all duration-500 text-center whitespace-nowrap"
              >
                레퍼런스 문의하기
              </Link>
            </motion.div>
          </motion.div>

          {/* The Project - 마스크 리빌 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="overflow-hidden pb-2">
              <motion.h2
                className="font-kulim font-bold text-white text-2xl sm:text-3xl md:text-[48px] 3xl:text-[56px] 4xl:text-[64px] leading-tight"
                variants={textMaskVariants}
              >
                The Project
              </motion.h2>
            </div>
            <motion.p
              className="font-pretendard font-light text-white/70 text-sm md:text-base 3xl:text-lg 4xl:text-xl leading-relaxed max-w-2xl mt-4 md:mt-6 mb-12 md:mb-20"
              variants={fadeUpVariants}
            >
              {data.description}
            </motion.p>
          </motion.div>

          {/* ━━ 영상 ━━ */}
          {data.video && (
            <motion.div
              className="mb-8 md:mb-12"
              variants={imageClipVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={data.video}
                  title={data.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            </motion.div>
          )}

          {/* ━━ 이미지 그리드 - clipPath + 패럴랙스 ━━ */}
          <motion.div
            className="space-y-4 md:space-y-8"
            variants={imageStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* 5장: 2 - 1(풀) - 2 */}
            {imgs.length === 5 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[0]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[1]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
                <ParallaxImg src={imgs[2]} className="aspect-[4/3] md:aspect-[16/9] md:max-w-[75%] mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[3]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[4]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
              </>
            )}
            {/* 7장+: 2 - 2 - 1(풀) - 2 - 나머지 2씩 */}
            {imgs.length >= 7 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[0]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[1]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[2]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[3]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
                <ParallaxImg src={imgs[4]} className="aspect-[4/3] md:aspect-[1511/774] md:max-h-[500px] md:max-w-[75%] mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[5]} className="aspect-[4/3] md:aspect-[733/723]" />
                  <ParallaxImg src={imgs[6]} className="aspect-[4/3] md:aspect-[733/723]" />
                </div>
                {/* 8장 이상: 나머지 이미지 2개씩 그리드 */}
                {imgs.slice(7).reduce((rows, src, i) => {
                  if (i % 2 === 0) rows.push([src]);
                  else rows[rows.length - 1].push(src);
                  return rows;
                }, []).map((pair, pi) => (
                  pair.length === 2 ? (
                    <div key={`extra-${pi}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <ParallaxImg src={pair[0]} className="aspect-[4/3] md:aspect-[733/359]" />
                      <ParallaxImg src={pair[1]} className="aspect-[4/3] md:aspect-[733/359]" />
                    </div>
                  ) : (
                    <ParallaxImg key={`extra-${pi}`} src={pair[0]} className="aspect-[4/3] md:aspect-[16/9] md:max-w-[75%] mx-auto" />
                  )
                ))}
              </>
            )}
            {/* 4장: 2 - 2 */}
            {imgs.length === 4 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[0]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[1]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[2]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[3]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
              </>
            )}
            {/* 6장: 2 - 1(풀) - 2 - 1(풀) */}
            {imgs.length === 6 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[0]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[1]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
                <ParallaxImg src={imgs[2]} className="aspect-[4/3] md:aspect-[16/9] md:max-w-[75%] mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[3]} className="aspect-[4/3] md:aspect-[733/359]" />
                  <ParallaxImg src={imgs[4]} className="aspect-[4/3] md:aspect-[733/359]" />
                </div>
                <ParallaxImg src={imgs[5]} className="aspect-[4/3] md:aspect-[16/9] md:max-w-[75%] mx-auto" />
              </>
            )}
            {/* 1장 */}
            {imgs.length === 1 && (
              <ParallaxImg src={imgs[0]} className="aspect-[4/3] md:aspect-[16/9] md:max-w-[75%] mx-auto" />
            )}
            {/* 2~3장 */}
            {imgs.length >= 2 && imgs.length <= 3 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <ParallaxImg src={imgs[0]} className="aspect-[4/3] md:aspect-video" />
                  <ParallaxImg src={imgs[1]} className="aspect-[4/3] md:aspect-video" />
                </div>
                {imgs.length === 3 && (
                  <ParallaxImg src={imgs[2]} className="aspect-[4/3] md:aspect-[16/9] md:max-w-[75%] mx-auto" />
                )}
              </>
            )}
          </motion.div>

        </div>
      </section>

      {/* ━━ Next Project ━━ */}
      <NextProjectSection
        sectionRef={sectionRef}
        isHovering={isHovering}
        setIsHovering={setIsHovering}
        cursorVisible={cursorVisible}
        cursorPos={cursorPos}
        nextHeroImage={nextHeroImage}
        nextTitle={nextTitle}
        nextHref={nextHref}
        nextSlug={data?.nextSlug}
      />
    </main>
  );
};

export default CaseStudyPage;

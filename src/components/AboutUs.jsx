import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ── Luxury easing curves ──
const luxuryEase = [0.76, 0, 0.24, 1];       // slow-fast-slow (dramatic)
const enterEase = [0.33, 1, 0.68, 1];         // fast start, gentle decel
const smoothEase = [0.16, 1, 0.3, 1];         // smooth decel

// ── Hero: 라인별 마스크 리빌 ──
const heroLineVariants = {
    hidden: { y: '110%' },
    visible: (i) => ({
        y: '0%',
        transition: {
            duration: 1,
            ease: luxuryEase,
            delay: 0.15 + i * 0.1,
        },
    }),
};

const heroFadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.9, ease: enterEase, delay: 0.6 + i * 0.15 },
    }),
};

// ── Body: 섹션 리빌 ──
const textMask = {
    hidden: { y: '100%' },
    visible: { y: '0%', transition: { duration: 1, ease: luxuryEase } },
};

const fadeUpText = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: enterEase },
    },
};

// ── 이미지: clipPath inset 리빌 ──
const imageClipReveal = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 1.2, ease: smoothEase },
    },
};

// ── Capabilities ──
const CAPABILITIES = [
    {
        id: 'digital-creative',
        label: 'CAPABILITIES',
        title: 'Digital Creative',
        items: ['Global Strategy', 'Digital Design I', 'Digital Design II', '2D Motion', '3D Motion'],
    },
    {
        id: 'digital-experience',
        label: 'CAPABILITIES',
        title: 'Digital Experience',
        items: ['Frontend', 'Backend', 'Platform Dev', 'DevOps & Support'],
    },
];

const TIMELINE_LINE_CENTER = 7;
const TIMELINE_PADDING_LEFT = TIMELINE_LINE_CENTER + 24;
const TIMELINE_DOT_LEFT = TIMELINE_LINE_CENTER - TIMELINE_PADDING_LEFT;

const TimelineItem = ({ label, variants }) => (
    <motion.li
        variants={variants}
        transition={{ duration: 0.8, ease: enterEase }}
        className="relative flex items-center min-h-[48px]"
    >
        <span
            className="absolute rounded-full bg-black shrink-0 ring-[1px] md:ring-2 ring-white z-10 w-[10px] h-[10px] md:w-[12px] md:h-[12px]"
            style={{
                left: `${TIMELINE_DOT_LEFT}px`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            aria-hidden
        />
        <span
            className="relative z-20 font-kulim font-normal md:font-light pl-[33px] md:pl-10 whitespace-nowrap text-[20px] md:text-[24px] 3xl:text-[26px] 4xl:text-[32px] leading-[22.7px] md:leading-normal"
            style={{ color: '#000000' }}
        >
            {label}
        </span>
    </motion.li>
);

// ── 스크롤 패럴랙스 이미지 ──
const ParallaxImage = ({ src, alt, className, overlayClassName, gradientClassName, objectPosition }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const rawY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const y = useSpring(rawY, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            className={`relative w-full overflow-hidden ${className || ''}`}
            variants={imageClipReveal}
        >
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                className={`absolute -top-[10%] left-0 right-0 w-full h-[120%] object-cover ${objectPosition || 'object-center'} ${overlayClassName || ''}`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: smoothEase }}
            />
            {gradientClassName && <div className={`absolute inset-0 ${gradientClassName}`} />}
        </motion.div>
    );
};

const AboutUs = () => {
    return (
        <main className="bg-white text-black font-kulim">
            {/* ━━ Hero: sticky + 라인별 마스크 리빌 ━━ */}
            <section
                id="about-us-hero"
                className="sticky top-0 z-0 w-full h-[70vh] md:h-[80vh] min-h-[500px] md:min-h-[600px] overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/img/bg.webp)' }}
            >
                <motion.div
                    className="relative z-10 max-w-[1400px] 3xl:max-w-[1500px] 4xl:max-w-[1900px] mx-auto px-5 md:px-5 lg:px-6 pt-12 md:pt-16 pb-24 mt-16 md:mt-32 3xl:mt-40 4xl:mt-80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-50"
                    initial="hidden"
                    animate="visible"
                >
                    {/* 왼쪽: 라인별 마스크 리빌 헤드라인 */}
                    <div className="flex-1 max-w-2xl 4xl:max-w-4xl">
                        {/* Mobile Text */}
                        <h1 className="md:hidden font-kulim font-normal text-[#1907b7] text-[40px] leading-[45.4px] tracking-tight">
                            <div className="overflow-hidden pb-1">
                                <motion.div variants={heroLineVariants} custom={0}>
                                    We create stories
                                </motion.div>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <motion.div variants={heroLineVariants} custom={1}>
                                    that <span className="font-bold text-[#ef283f]">resonate</span>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <motion.div variants={heroLineVariants} custom={2}>
                                    with<span className="italic font-bold"> the world.</span>
                                </motion.div>
                            </div>
                        </h1>
                        {/* Desktop Text */}
                        <h1 className="hidden md:block font-kulim font-normal text-[#1907b7] text-[28px] sm:text-4xl md:text-6xl lg:text-[68px] 3xl:text-[72px] 4xl:text-[100px] leading-[1.2]">
                            <div className="overflow-hidden pb-1">
                                <motion.div variants={heroLineVariants} custom={0}>
                                    We create stories
                                </motion.div>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <motion.div variants={heroLineVariants} custom={1}>
                                    that <span className="font-bold text-[#ef283f]">resonate</span>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <motion.div variants={heroLineVariants} custom={2}>
                                    with<span className="italic font-bold"> the world.</span>
                                </motion.div>
                            </div>
                        </h1>
                    </div>

                    {/* 오른쪽: 오브 + 서브텍스트 */}
                    <div className="flex-1 flex flex-col items-start lg:items-end">
                        <motion.div
                            className="relative w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-64 3xl:w-40 3xl:h-56 4xl:w-56 4xl:h-80 shrink-0 -translate-x-2 lg:-translate-x-100 4xl:-translate-x-130 lg:translate-y-10"
                            variants={heroFadeVariants}
                            custom={0}
                        >
                            <img
                                src="/img/circle.webp"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                        <motion.p
                            className="mt-6 md:mt-8 max-w-[552px] 4xl:max-w-[700px] text-left text-[20px] md:text-2xl lg:text-[22px] 4xl:text-[28px] font-light leading-[23.8px] md:leading-[28.64px] lg:leading-[27px] 4xl:leading-[36px] text-[#1907b7] tracking-tight md:tracking-normal"
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                            variants={heroFadeVariants}
                            custom={1}
                        >
                            Fueled by this connection, we infuse new meaning into your brand, sparking the transformation from the ordinary to the extraordinary.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* ━━ 아래 콘텐츠: hero 위로 덮음 ━━ */}
            <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.08)] min-h-screen">

                {/* ━━ Trusted partners ━━ */}
                <section className="max-w-[1300px] 3xl:max-w-[1400px] 4xl:max-w-[1600px] mx-auto px-5 md:px-4 lg:px-8 py-16 md:py-24 lg:py-32">

                    {/* 타이틀: 마스크 리빌 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-150px' }}
                        className="mb-12 md:mb-32 pl-0 md:pl-2"
                    >
                        <div className="overflow-hidden pb-4">
                            {/* Mobile Text */}
                            <motion.h2
                                variants={textMask}
                                className="md:hidden text-[40px] leading-[45.4px] font-normal text-black tracking-tight pt-5"
                            >
                                Trusted partners, driving <span className="font-bold text-[#1907b7]">your success.</span>
                            </motion.h2>
                            {/* Desktop Text */}
                            <motion.h2
                                variants={textMask}
                                className="hidden md:block text-2xl sm:text-3xl md:text-5xl lg:text-[55px] font-normal text-black leading-tight"
                            >
                                Trusted partners, driving{' '}
                                <span className="font-bold text-[#1907b7]">your success.</span>
                            </motion.h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
                        {/* CULTURE */}
                        <motion.div
                            className="flex flex-col gap-6 md:space-y-10 md:gap-0"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-200px' }}
                            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                        >
                            <motion.div variants={fadeUpText} className="flex justify-between items-start w-full px-0 md:px-2">
                                <h3 className="text-[24px] md:text-[34px] font-semibold tracking-wide md:tracking-normal leading-[27.24px] md:leading-normal">CULTURE</h3>
                                <img src="/img/dot.webp" alt="" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                            </motion.div>
                            <motion.p variants={fadeUpText} className="text-[16px] md:text-[19px] 3xl:text-[19px] 4xl:text-[21px] font-kulim font-[300] leading-[24px] md:leading-relaxed text-gray-800 h-auto md:h-[180px] px-0 md:px-2 whitespace-pre-line md:whitespace-normal">
                                {"Great work starts with understanding people. We dive deep into your brand’s values, then shape and amplify them so your audience feels instantly connected. When culture leads, stories stick."}
                            </motion.p>
                            <ParallaxImage
                                src="/img/homePage/graphics.webp"
                                alt="Culture"
                                className="aspect-[1.19] md:aspect-[6/7]"
                                objectPosition="object-[60%_center]"
                            />
                        </motion.div>

                        {/* CREATIVITY */}
                        <motion.div
                            className="flex flex-col gap-6 md:space-y-10 md:gap-0 mt-8 md:mt-0"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-200px' }}
                            variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } } }}
                        >
                            <ParallaxImage
                                src="/img/homePage/Motion.webp"
                                alt="Creativity"
                                className="order-3 md:order-1 aspect-[1.166] md:aspect-[6/7]"
                            />
                            <motion.div variants={fadeUpText} className="order-1 md:order-2 flex justify-between items-start w-full px-0 md:px-2">
                                <h3 className="text-[24px] md:text-[34px] font-semibold tracking-wide md:tracking-normal leading-[27.24px] md:leading-normal">CREATIVITY</h3>
                                <img src="/img/dot.webp" alt="" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                            </motion.div>
                            <motion.p variants={fadeUpText} className="order-2 md:order-3 text-[16px] md:text-[19px] 3xl:text-[19px] 4xl:text-[21px] font-kulim font-[300] leading-[24px] md:leading-relaxed text-gray-800 px-0 md:px-2 h-auto md:h-[180px] whitespace-pre-line md:whitespace-normal">
                                {"“Good enough” isn’t in our vocabulary. We re‑imagine the familiar, break a few rules, and surprise viewers with fresh, on‑point ideas that make every project pop."}
                            </motion.p>
                        </motion.div>

                        {/* STORYTELLING */}
                        <motion.div
                            className="flex flex-col gap-6 md:space-y-10 md:gap-0 mt-8 md:mt-0"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-200px' }}
                            variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } } }}
                        >
                            <motion.div variants={fadeUpText} className="order-1 flex justify-between items-start w-full px-0 md:px-2">
                                <h3 className="text-[24px] md:text-[34px] font-semibold tracking-wide md:tracking-normal leading-[27.24px] md:leading-normal">STORYTELLING</h3>
                                <img src="/img/dot.webp" alt="" className="w-6 h-6 md:w-8 md:h-8 object-contain md:hidden" />
                                <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black hidden md:block">
                                    <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                            <motion.p variants={fadeUpText} className="order-2 text-[16px] md:text-[19px] 3xl:text-[19px] 4xl:text-[21px] font-kulim font-[300] leading-[24px] md:leading-relaxed text-gray-800 h-auto md:h-[180px] px-0 md:px-2 whitespace-pre-line md:whitespace-normal">
                                {"Stories move markets. From concept and script to shoot and final cut, our full‑service team turns your message into a narrative that engages, inspires, and—most importantly—gets remembered."}
                            </motion.p>
                            <ParallaxImage
                                src="/img/homePage/System (1).webp"
                                alt="Storytelling"
                                className="order-3 aspect-[1.16] md:aspect-[6/7]"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ━━ Capabilities ━━ */}
                <section className="max-w-[1100px] 3xl:max-w-[1200px] 4xl:max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16 pb-24 md:pb-36 lg:pb-48 pt-8 mt-16 md:mt-12 lg:mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 lg:gap-20 3xl:gap-24 4xl:gap-28 items-start translate-x-0 md:translate-x-0">
                    {/* 왼쪽: Digital Creative */}
                    <motion.article
                        key={CAPABILITIES[0].id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-200px' }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.8,
                                },
                            },
                        }}
                        className="text-left"
                    >
                        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8 mb-8 md:mb-10 ml-0 md:-ml-[110px]">
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}
                                className="hidden md:block"
                            >
                                <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                                    <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                            <h2 className="text-[24px] md:text-[36px] 3xl:text-[40px] 4xl:text-[48px] font-semibold font-kulim text-black tracking-tight whitespace-nowrap leading-[27.24px] md:leading-tight">
                                {CAPABILITIES[0].title}
                            </h2>
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}
                                className="md:hidden"
                            >
                                <svg width="70" height="20" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                                    <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        </div>
                        <ul
                            className="relative list-none space-y-5 md:space-y-8"
                            style={{ paddingLeft: TIMELINE_PADDING_LEFT }}
                        >
                            <div
                                className="absolute top-0 bg-black z-0"
                                style={{
                                    left: TIMELINE_LINE_CENTER,
                                    width: '1px',
                                    height: '100%',
                                }}
                                aria-hidden
                            />
                            {CAPABILITIES[0].items.map((label) => (
                                <TimelineItem
                                    key={label}
                                    label={label}
                                    variants={{
                                        hidden: { opacity: 0, y: -12 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                />
                            ))}
                        </ul>
                    </motion.article>

                    {/* 가운데: box.png + circle.png + shadow.png */}
                    <div
                        className="flex md:flex relative w-full md:w-[260px] lg:w-[300px] 3xl:w-[340px] 4xl:w-[380px] min-h-[160px] md:min-h-[400px] flex-shrink-0 items-center justify-center mt-6 md:mt-12 order-last md:order-none"
                        aria-hidden
                    >
                        <img
                            src="/img/shadow.webp"
                            alt=""
                            className="absolute bottom-[-260px] right-[-1250px] w-[200%] min-w-[1600px] max-w-[1800px] h-auto object-contain object-bottom z-0"
                        />
                        <img
                            src="/img/circle.webp"
                            alt=""
                            className="absolute right-[18%] top-[58%] -translate-y-1/2 w-[72px] lg:w-[100px] 3xl:w-[110px] 4xl:w-[120px] h-auto object-contain z-[1]"
                        />
                        <img
                            src="/img/box.webp"
                            alt=""
                            className="relative max-w-full max-h-[400px] 3xl:max-h-[440px] 4xl:max-h-[500px] w-auto h-auto object-contain z-10"
                        />
                    </div>

                    {/* 오른쪽: Digital Experience */}
                    <motion.article
                        key={CAPABILITIES[1].id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-200px' }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.8,
                                },
                            },
                        }}
                        className="text-left"
                    >
                        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8 mb-8 md:mb-10 ml-0 md:-ml-[110px]">
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}
                                className="hidden md:block"
                            >
                                <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                                    <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                            <h2 className="text-[24px] md:text-[36px] 3xl:text-[40px] 4xl:text-[48px] font-semibold font-kulim text-black tracking-tight whitespace-nowrap leading-[27.24px] md:leading-tight">
                                {CAPABILITIES[1].title}
                            </h2>
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}
                                className="md:hidden"
                            >
                                <svg width="70" height="20" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                                    <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        </div>
                        <ul
                            className="relative list-none space-y-5 md:space-y-8"
                            style={{ paddingLeft: TIMELINE_PADDING_LEFT }}
                        >
                            <div
                                className="absolute top-0 bg-black z-0"
                                style={{
                                    left: TIMELINE_LINE_CENTER,
                                    width: '1px',
                                    height: '100%',
                                }}
                                aria-hidden
                            />
                            {CAPABILITIES[1].items.map((label) => (
                                <TimelineItem
                                    key={label}
                                    label={label}
                                    variants={{
                                        hidden: { opacity: 0, y: -12 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                />
                            ))}
                        </ul>
                    </motion.article>
                </section>
            </div>

        </main>
    );
};

export default AboutUs;

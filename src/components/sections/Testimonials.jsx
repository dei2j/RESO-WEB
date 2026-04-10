import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    client: 'Kakao',
    image: '/img/review/카카오 썸네일.webp',
    text: '규모가 크지 않은 프로젝트였음에도,\n디테일한 수정사항까지 꼼꼼하게 반영해주셔서 감사드립니다.\n차후 큰 프로젝트로 다시 만나뵙길 기대합니다.',
  },
  {
    client: 'CJ 제일제당',
    image: '/img/review/CJ제일제당 첫 영상.webp',
    text: '수정사항이 많고 짧은 시간에도 잘 대응해주셔서 감사했습니다.\n특히 성우를 여러번 바꿈에도 친절하게 기간내 응대해주셔서 감사드립니다.',
  },
  {
    client: 'CSG',
    image: '/img/review/CSG.webp',
    text: '처음 영상 제작을 의뢰하면서 많이 걱정했는데, 합리적인 비용으로 기대한 만큼의 결과물이 나와 아주 만족합니다.\n특히, 추가되는 요구사항에 대한 피드백이 빠른 점이 좋았고, 항상 친절하게 대응해주시는 점이 인상 깊었습니다.',
  },
  {
    client: 'Hass',
    image: '/img/review/Hass.webp',
    text: '마감 일정을 정확히 지켜주셔서 무사히 마무리할 수 있었습니다.\n적절한 곡으로 BGM까지 선정해 주셔서 분위기가 훨씬 살아났습니다.\n여러 번 수정 요청을 드렸음에도 꼼꼼하게 작업해 주셔서 정말 감사했습니다.',
  },
];

const INTERVAL = 4000;
const transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

// 카드: scale + blur only (좌우 이동 없이 피어나듯 전환)
const cardVariants = {
  enter: () => ({
    opacity: 0,
    filter: 'blur(10px)',
    scale: 1.05,
  }),
  center: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition,
  },
  exit: () => ({
    opacity: 0,
    filter: 'blur(10px)',
    scale: 0.95,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

// 이미지: 깊이감 스케일
const imageVariants = {
  enter: { scale: 1.1, opacity: 0 },
  center: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.8 },
  },
};

// 텍스트 시차
const stagger = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

const Testimonials = () => {
  const [[current, direction], setCurrent] = useState([0, 1]);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((idx) => {
    setCurrent((prev) => [idx, idx > prev[0] ? 1 : -1]);
    setProgress(0);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / INTERVAL, 1));
    };
    const timer = setInterval(tick, 30);
    const advance = setTimeout(() => {
      setCurrent((prev) => [(prev[0] + 1) % reviews.length, 1]);
      setProgress(0);
    }, INTERVAL);
    return () => {
      clearInterval(timer);
      clearTimeout(advance);
    };
  }, [current]);

  const review = reviews[current];

  return (
    <section id="testimonials" className="bg-white text-black font-kulim pt-16 md:pt-32 pb-20 md:pb-40 px-5 md:px-6">
      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2200px] mx-auto">
        <h2 className="text-[40px] md:text-5xl 3xl:text-6xl 4xl:text-7xl font-light mb-10 md:mb-16 4xl:mb-20 text-black leading-[45.4px] md:leading-normal tracking-[-1.2px] md:tracking-normal text-left md:text-center">
          Reasonable Chosen <br />
          <span className="text-gray-400">by</span>{' '}
          <span className="font-bold text-[#ef283f] italic tracking-normal">Global Leaders</span>
        </h2>

        <div className="relative max-w-[900px] 3xl:max-w-[1100px] 4xl:max-w-[1400px] mx-auto">
          <div className="relative overflow-hidden shadow-2xl bg-[#1a1065]">
            {/* 배경 블러 서클 */}
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-[#1907b7]/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-1/3 -left-1/4 w-[400px] h-[400px] bg-[#ef283f]/10 rounded-full blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative flex flex-col md:flex-row items-stretch h-[480px] md:h-[360px] 3xl:h-[400px] 4xl:h-[480px] gap-0 overflow-hidden"
              >
                {/* image */}
                <div className="w-full md:w-[45%] relative overflow-hidden bg-black/10 h-[200px] md:h-full shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={review.image}
                      src={review.image}
                      alt={review.client}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  {/* 이미지→텍스트 융합 그래디언트 */}
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-[#1a1065]/50 to-[#1a1065] hidden md:block z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1a1065] to-transparent md:hidden z-10" />
                </div>

                {/* content */}
                <div className="w-full md:w-[55%] bg-[#1a1065] p-6 md:p-12 3xl:p-14 4xl:p-20 flex flex-col justify-center relative md:-ml-1 z-0">
                  <motion.div
                    key={`text-${current}`}
                    initial="initial"
                    animate="animate"
                    variants={{
                      initial: { transition: { staggerChildren: 0.1 } },
                      animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                    }}
                    className="space-y-0"
                  >
                    <motion.p
                      variants={{ initial: { opacity: 0, x: -10 }, animate: { opacity: 0.4, x: 0 } }}
                      transition={stagger}
                      className="text-white text-xs md:text-sm 3xl:text-sm 4xl:text-base tracking-[0.2em] uppercase mb-3"
                    >
                      Client Review
                    </motion.p>

                    <motion.h3
                      variants={{ initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } }}
                      transition={stagger}
                      className="text-2xl md:text-4xl 3xl:text-5xl 4xl:text-5xl font-bold text-white tracking-tight"
                    >
                      {review.client}
                    </motion.h3>

                    <motion.div
                      variants={{ initial: { opacity: 0, scaleX: 0 }, animate: { opacity: 0.6, scaleX: 1 } }}
                      transition={stagger}
                      className="h-[1px] w-12 bg-gradient-to-r from-[#ef283f] to-transparent my-6 md:my-8 origin-left"
                    />

                    <motion.p
                      variants={{ initial: { opacity: 0, x: -10, filter: 'blur(4px)' }, animate: { opacity: 0.9, x: 0, filter: 'blur(0px)' } }}
                      transition={stagger}
                      className="text-white text-xs md:text-sm 3xl:text-sm 4xl:text-lg leading-relaxed md:leading-[1.9] font-light whitespace-pre-line"
                    >
                      {review.text}
                    </motion.p>
                  </motion.div>

                  <div className="absolute top-4 right-6 md:top-8 md:right-10 text-white/[0.04] text-[80px] md:text-[120px] 4xl:text-[160px] font-serif leading-none select-none pointer-events-none">
                    &rdquo;
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* progress bar */}
          <div className="flex justify-center gap-2 mt-8 md:mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-[2px] overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ width: i === current ? 40 : 12, backgroundColor: i === current ? 'transparent' : 'rgba(0,0,0,0.08)' }}
                aria-label={`Go to review ${i + 1}`}
              >
                {i === current && (
                  <>
                    <div className="absolute inset-0 bg-black/5" />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#1a1065]/60"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

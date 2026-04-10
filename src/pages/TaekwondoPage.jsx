import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NextProjectSection from '../components/NextProjectSection';

const images = [
  ...Array.from({ length: 13 }, (_, i) => `/img/Portfolio/태권도/Crop Taekwondo tournaments ${i + 1}.webp`),
  '/img/Portfolio/태권도/Crop Taekwondo tournaments14.webp',
];

const TaekwondoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <div className="fixed top-0 left-0 z-10 px-5 md:px-12 lg:px-16 pt-28 md:pt-36 pb-6 md:pb-10">
        <Link
          to="/works"
          onClick={() => { window.__fromWorksToCase = true; }}
          className="inline-flex items-center gap-2 md:gap-3 font-kulim text-black/50 hover:text-black text-base md:text-lg 3xl:text-xl 4xl:text-2xl transition-colors duration-300 group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-x-2">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to list
        </Link>
      </div>

      <div className="w-full flex flex-col">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Taekwondo Tournament ${i + 1}`}
            className="w-full"
          />
        ))}
      </div>

      <NextProjectSection
        nextHeroImage="/img/Portfolio/AIA/Screenshot 2026-02-10 064548.webp"
        nextTitle="AIA"
        nextHref="/case/aia"
      />
    </main>
  );
};

export default TaekwondoPage;

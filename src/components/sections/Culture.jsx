import React from 'react';

const Culture = () => {
  return (
    <section id="culture" className="bg-white pt-10 pb-2 md:py-40 px-5 sm:px-6 md:px-10 lg:px-16 font-kulim">
      <div className="max-w-[1300px] 3xl:max-w-[1400px] 4xl:max-w-[2100px] mx-auto flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-10 md:gap-20 lg:gap-0 3xl:gap-0 4xl:gap-0">
        <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-between">
          <h2 className="text-[36px] md:text-[44px] lg:text-[48px] 3xl:text-[52px] 4xl:text-[72px] font-extralight text-black leading-[45.4px] md:leading-[1.2]">
            <span className="font-bold text-[#1907b7]">Culture</span> unites <br />
            us, shaping <br />
            <span className="font-bold text-[#ef283f] italic">every story</span> <br />
            <span className="font-bold text-[#ef283f] italic">we share.</span>
          </h2>
          <div className="hidden lg:block mt-65 lg:mt-0">
            <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black 4xl:scale-125 origin-left">
              <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="hidden lg:block lg:w-2/3 w-full">
          <div className="relative w-full aspect-video overflow-hidden shadow-2xl">
            <video
              src="/video/home/Reso_Section 2.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;

import React from 'react';

const Culture = () => {
  return (
    <section id="culture" className="bg-white py-16 md:py-40 px-5 sm:px-6 md:px-10 lg:px-16 font-kulim">
      <div className="max-w-[1300px] 3xl:max-w-[1400px] 4xl:max-w-[2100px] mx-auto flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-10 md:gap-20 lg:gap-0 3xl:gap-0 4xl:gap-0">
        <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-between">
          <h2 className="text-[40px] md:text-[44px] lg:text-[48px] 3xl:text-[52px] 4xl:text-[72px] font-extralight text-black leading-[45.4px] md:leading-[1.2]">
            <span className="font-bold text-[#1907b7]">Culture</span> unites <br />
            us, shaping <br />
            <span className="font-bold text-[#ef283f] italic">every story</span> <br />
            <span className="font-bold text-[#ef283f] italic">we share.</span>
          </h2>
          <div className="mt-65 lg:mt-0">
            <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black 4xl:scale-125 origin-left">
              <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="lg:w-2/3 w-full">
          <div className="relative w-full aspect-video overflow-hidden shadow-2xl group">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" alt="Culture Video Thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 cursor-pointer hover:bg-white/30 transition-all">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
              <h3 className="text-4xl md:text-5xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-2">TODAY</h3>
              <p className="text-xl md:text-3xl 3xl:text-3xl 4xl:text-3xl font-light text-white tracking-widest">WE LOOK INTO 2022</p>
              <p className="text-xl md:text-3xl 3xl:text-3xl 4xl:text-3xl font-light text-white tracking-widest">WITH EXPECTATIONS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;

import React from 'react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-white text-black font-kulim pt-16 md:pt-32 pb-20 md:pb-40 px-5 md:px-6">
      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2200px] mx-auto text-center">
        <h2 className="text-[40px] md:text-5xl 3xl:text-6xl 4xl:text-7xl font-light mb-10 md:mb-16 4xl:mb-20 text-black leading-[45.4px] md:leading-normal tracking-[-1.2px] md:tracking-normal text-left md:text-center">
          Reasonable Chosen <br />
          <span className="text-gray-400">by</span>{' '}
          <span className="font-bold text-[#ef283f] italic tracking-normal">Global Leaders</span>
        </h2>

        <div className="bg-[#1907b7] rounded-[1.2rem] md:rounded-[2rem] p-0 flex flex-col md:flex-row overflow-hidden max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto shadow-2xl items-stretch h-auto md:h-[320px] 3xl:h-[400px] 4xl:h-[460px]">
          <div className="w-full md:w-1/3 bg-[#88aaf9] relative overflow-hidden flex items-end justify-center min-h-[160px] md:min-h-[200px]">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1907b7] to-transparent opacity-40"></div>
          </div>

          <div className="w-full md:w-2/3 p-6 md:p-12 4xl:p-16 text-left relative flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white">kakao</h3>
              <div className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
                <img src="/img/logo/9. 카카오 로고.svg" alt="Kakao" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="mb-6 relative z-10">
              <p className="text-white/90 text-sm md:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed font-light">
                규모가 크지 않은 프로젝트였음에도,<br className="hidden md:block" />
                디테일한 수정사항까지 꼼꼼하게 반영해주셔서 감사드립니다.<br className="hidden md:block" />
                차후 큰 프로젝트로 다시 만나뵙길 기대합니다.
              </p>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-white/60 text-sm font-medium">안전 보건 / 매니저</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

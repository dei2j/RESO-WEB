import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Footer = () => {
  return (
    <footer id="footer-section" className="bg-black text-white font-kulim px-5 md:px-8 pt-16 md:pt-24 pb-8 md:pb-16">
      <div className="w-full max-w-[1600px] 3xl:max-w-[2200px] 4xl:max-w-[2800px] mx-auto px-0 md:px-20 flex flex-col justify-between min-h-[280px] md:min-h-[400px]">
        {/* 상단: 타이틀 + 설명 */}
        <div>
          <h2 className="text-[20px] sm:text-3xl md:text-5xl 3xl:text-5xl 4xl:text-6xl font-light md:font-normal leading-[22.7px] md:leading-tight mb-3 md:mb-8">
            Transforming<br /> digital experiences.
          </h2>
          <p className="text-white font-light max-w-lg 3xl:max-w-xl 4xl:max-w-2xl text-[10px] md:text-base 3xl:text-lg 4xl:text-xl leading-[12.1px] md:leading-loose">
            We offer an all-in-one solution that covers everything<br />
            from video planning to shooting and editing, tailored<br />
            to both NYT and KST time zones.
          </p>
        </div>

        {/* 중간: 로고 오른쪽 */}
        <div className="mt-10 md:mt-16 flex justify-end">
          <Link to="/" className="inline-block w-24 md:w-48 4xl:w-56 text-white hover:opacity-80 transition-opacity" aria-label="홈으로">
            <Logo className="w-full h-auto fill-white text-white" />
          </Link>
        </div>

        {/* 하단: 회사정보 + 사업자정보 */}
        <div className="mt-6 md:mt-10">
          <div className="flex justify-between items-end w-full">
            <div className="text-[10px] md:text-base 4xl:text-lg text-white font-light space-y-0.5 md:space-y-2 leading-[12.1px]">
              <p className="font-bold text-white mb-1.5 md:mb-4 text-[10px] md:text-lg 4xl:text-xl">RESO 르쏘</p>
              <p>대표이사 김민준</p>
              <p>010-4956-7914</p>
              <p>mjkim@resopr.com</p>
            </div>

            <div className="text-[10px] md:text-sm 4xl:text-base text-white font-light space-y-0.5 md:space-y-2 text-right leading-[12.1px]">
              <p>사업자번호 : 435-19-02088</p>
              <p>대전광역시 유성구 대학로 99,</p>
              <p>충남대학교 산학연 901호</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

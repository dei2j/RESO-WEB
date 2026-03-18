import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import FloatingLogo from './FloatingLogo';
import SharedSidebar from './SharedSidebar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToRef = useRef(null);
  const isAboutUs = location.pathname === '/about-us';
  const isWorks = location.pathname === '/works';
  const isContactUs = location.pathname === '/contact-us';
  const currentPage = isAboutUs ? 'about-us' : isWorks ? 'works' : isContactUs ? 'contact-us' : 'home';

  // 페이지 전환/새로고침 시 최상단으로 스크롤
  useEffect(() => {
    if (scrollToRef.current && location.pathname === '/') return;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !scrollToRef.current) return;
    const id = scrollToRef.current;
    scrollToRef.current = null;
    const timer = setTimeout(() => {
      const el = document.querySelector(`#${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleGoHomeAndScrollTo = (sectionId) => {
    scrollToRef.current = sectionId;
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingLogo onClickLogo={() => navigate('/')} />
      <SharedSidebar
        currentPage={currentPage}
        onGoAboutUs={() => navigate('/about-us')}
        onGoHomeAndScrollTo={handleGoHomeAndScrollTo}
        onGoWorks={() => navigate('/works')}
        onGoContactUs={() => navigate('/contact-us')}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

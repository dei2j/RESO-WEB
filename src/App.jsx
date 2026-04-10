import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

const AboutUs = lazy(() => import('./pages/AboutUs'));
const WorksPage = lazy(() => import('./pages/WorksPage'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const DeulgogayuPage = lazy(() => import('./pages/DeulgogayuPage'));
const LolpagoPage = lazy(() => import('./pages/LolpagoPage'));
const TaekwondoPage = lazy(() => import('./pages/TaekwondoPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<Suspense fallback={null}><AboutUs /></Suspense>} />
          <Route path="works" element={<Suspense fallback={null}><WorksPage /></Suspense>} />
          <Route path="contact-us" element={<Suspense fallback={null}><ContactUs /></Suspense>} />
          <Route path="case/deulgogayu" element={<Suspense fallback={null}><DeulgogayuPage /></Suspense>} />
          <Route path="case/lolpago" element={<Suspense fallback={null}><LolpagoPage /></Suspense>} />
          <Route path="case/taekwondo" element={<Suspense fallback={null}><TaekwondoPage /></Suspense>} />
          <Route path="case/:slug" element={<Suspense fallback={null}><CaseStudyPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

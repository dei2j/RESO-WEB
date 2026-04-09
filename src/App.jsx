import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WorksPage from './pages/WorksPage';
import ContactUs from './pages/ContactUs';
import CaseStudyPage from './pages/CaseStudyPage';
import DeulgogayuPage from './pages/DeulgogayuPage';
import LolpagoPage from './pages/LolpagoPage';
import TaekwondoPage from './pages/TaekwondoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="works" element={<WorksPage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="case/deulgogayu" element={<DeulgogayuPage />} />
          <Route path="case/lolpago" element={<LolpagoPage />} />
          <Route path="case/taekwondo" element={<TaekwondoPage />} />
          <Route path="case/:slug" element={<CaseStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

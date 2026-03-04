
import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { PageType } from './types';
import { SEO_CONFIG } from './constants';
import ErrorBoundary from './components/ErrorBoundary';

const Features = lazy(() => import('./pages/Features'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Resources = lazy(() => import('./pages/Resources'));
const Contact = lazy(() => import('./pages/Contact'));
const Work = lazy(() => import('./pages/Work'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Studio = lazy(() => import('./pages/Studio'));
const TalentForm = lazy(() => import('./pages/TalentForm'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const SEOManager: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const rawPage = (path.replace('/', '') || 'home') as PageType;
  const page =
    path.startsWith('/service/')
      ? 'service'
      : rawPage === 'features'
        ? 'about-us'
        : rawPage === 'solutions'
          ? 'service'
          : rawPage;
  const config = SEO_CONFIG[page] || SEO_CONFIG.home;

  useEffect(() => {
    document.title = config.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', config.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', config.description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', config.title);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', config.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const path = location.pathname === '/' ? '' : location.pathname;
      canonical.setAttribute('href', `https://mediabossafrica.com${path}`);
    }
  }, [page, config]);

  return null;
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const rawActivePage = (location.pathname.replace('/', '') || 'home') as PageType;
  const activePage = location.pathname.startsWith('/service/')
    ? 'service'
    : rawActivePage === 'features'
      ? 'about-us'
      : rawActivePage === 'solutions'
        ? 'service'
        : rawActivePage;

  const handleNavigate = (page: PageType) => {
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  const isIsolatedPage = location.pathname === '/talent-form';

  return (
    <ErrorBoundary>
      <div className="bg-white dark:bg-brand-deep min-h-screen text-gray-900 dark:text-white selection:bg-brand-magenta selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
        <SEOManager />
        <ScrollToTop />
        {!isIsolatedPage && (
          <>
            <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-brand-magenta z-[110] origin-left shadow-[0_0_15px_#ff00a0]" style={{ scaleX }} />
            <Navbar activePage={activePage} onNavigate={handleNavigate} />
          </>
        )}
        <main className={`relative z-10 min-h-screen ${isIsolatedPage ? '' : ''}`} id="main-content">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="min-h-screen"
              >
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Routes location={location}>
                    <Route path="/" element={<Home onNavigate={handleNavigate} />} />
                    <Route path="/about-us" element={<Features />} />
                    <Route path="/service" element={<Solutions />} />
                    <Route path="/service/:industrySlug" element={<IndustryDetail />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/solutions/:industrySlug" element={<IndustryDetail />} />
                    <Route path="/pricing" element={<Pricing onNavigate={handleNavigate} />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/talent" element={<Navigate to="/talent-form" replace />} />
                    <Route path="/talent/apply" element={<Navigate to="/talent-form" replace />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/studio" element={<Studio />} />
                    <Route path="/talent-form" element={<TalentForm />} />
                    {/* Catch-all: dedicated branded 404 page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
        {!isIsolatedPage && <Footer onNavigate={handleNavigate} />}
        {!isIsolatedPage && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.02)_0%,_transparent_60%)]" />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;

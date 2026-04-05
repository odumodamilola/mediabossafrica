
import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { PageType } from './types';
import { SEO_CONFIG, INDUSTRIES } from './constants';
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
const Talent = lazy(() => import('./pages/Talent'));
const TalentForm = lazy(() => import('./pages/TalentForm'));
const TalentApply = lazy(() => import('./pages/talent/ApplyForm'));
const TalentDetail = lazy(() => import('./pages/TalentDetail'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const SEOManager: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const config = React.useMemo(() => {
    // 1. Handle Industry Dynamic Pages
    if (path.startsWith('/service/') || path.startsWith('/solutions/')) {
      const slug = path.split('/').pop();
      const industry = INDUSTRIES.find(i => toSlug(i.name) === slug);
      if (industry) {
        return {
          title: `${industry.name} | Industries We Serve | Mediaboss Africa`,
          description: `Strategic talent management and influencer marketing for the ${industry.name} sector in Africa.`,
          keywords: `${industry.name} influencer marketing, ${industry.name} talent management Nigeria`,
          ogImage: industry.image,
          twitterImage: industry.image
        };
      }
    }

    // 2. Handle Static Pages
    const rawPage = (path.replace('/', '') || 'home') as PageType;
    const pageKey =
      path.startsWith('/service/') || rawPage === 'solutions'
        ? 'service'
        : rawPage === 'features'
          ? 'about-us'
          : rawPage;
    
    return (SEO_CONFIG as any)[pageKey] || SEO_CONFIG.home;
  }, [path]);

  useEffect(() => {
    // Basic SEO
    document.title = config.title;
    
    const updateMeta = (name: string, content: string, attr: string = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', config.description);
    if (config.keywords) updateMeta('keywords', config.keywords);

    // Open Graph
    updateMeta('og:title', config.title, 'property');
    updateMeta('og:description', config.description, 'property');
    updateMeta('og:image', config.ogImage || 'https://mediabossafrica.com/og-home.jpg', 'property');
    updateMeta('og:url', `https://mediabossafrica.com${path}`, 'property');

    // Twitter
    updateMeta('twitter:title', config.title);
    updateMeta('twitter:description', config.description);
    updateMeta('twitter:image', config.twitterImage || 'https://mediabossafrica.com/og-home.jpg');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const cleanPath = path === '/' ? '' : path;
    canonical.setAttribute('href', `https://mediabossafrica.com${cleanPath}`);
  }, [config, path]);

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
    : location.pathname.startsWith('/talent/')
      ? 'talent'
    : rawActivePage === 'talent/apply'
      ? 'talent'
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
                    <Route path="/talent" element={<Talent />} />
                    <Route path="/talent/apply" element={<TalentApply />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/studio" element={<Studio />} />
                    <Route path="/talent-form" element={<TalentForm />} />
                    <Route path="/favicon.ico" element={null} />
                    <Route path="/:talentSlug" element={<TalentDetail />} />
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

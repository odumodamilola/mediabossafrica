
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import Work from './pages/Work';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { PageType } from './types';
import { SEO_CONFIG, VALID_PAGES } from './constants';
import ErrorBoundary from './components/ErrorBoundary';

const SEOManager: React.FC<{ page: PageType }> = ({ page }) => {
  const config = SEO_CONFIG[page] || SEO_CONFIG.home;
  const baseUrl = "https://mediabossafrica.com";
  const canonicalUrl = `${baseUrl}/#${page === 'home' ? '' : page}`;

  useEffect(() => {
    document.title = config.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', config.description);
  }, [page, config]);

  return null;
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  console.log('App rendering, active page:', activePage); // DEBUG

  useEffect(() => {
    console.log('App mounted'); // DEBUG
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      console.log('Hash changed to:', hash); // DEBUG
      // Use the centralized VALID_PAGES manifest as source of truth
      if (VALID_PAGES.includes(hash as PageType)) {
        console.log('Valid page, setting:', hash); // DEBUG
        setActivePage(hash as PageType);
      } else {
        console.warn('Invalid page, redirecting to home:', hash); // DEBUG
        // Failsafe: Force redirect to home for undefined routes
        window.location.hash = 'home';
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    console.log('Navigate clicked:', page); // DEBUG
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    try {
      console.log('Rendering page:', activePage); // DEBUG
      switch (activePage) {
        case 'home': return <Home onNavigate={handleNavigate} />;
        case 'features': return <Features />;
        case 'solutions': return <Solutions />;
        case 'pricing': return <Pricing onNavigate={handleNavigate} />;
        case 'resources': return <Resources />;
        case 'contact': return <Contact />;
        case 'apply': return <Apply />;
        case 'work': return <Work />;
        case 'privacy': return <Privacy />;
        case 'terms': return <Terms />;
        default: {
          console.warn('Unknown page, defaulting to home:', activePage);
          return <Home onNavigate={handleNavigate} />;
        }
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return <Home onNavigate={handleNavigate} />; // Failsafe
    }
  };

  return (
    <ErrorBoundary>
      <div className="bg-white dark:bg-brand-deep min-h-screen text-gray-900 dark:text-white selection:bg-brand-magenta selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
        <SEOManager page={activePage} />
        <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-brand-magenta z-[110] origin-left shadow-[0_0_15px_#ff00a0]" style={{ scaleX }} />
        <Navbar activePage={activePage} onNavigate={handleNavigate} />
        <main className="relative z-10 min-h-screen" id="main-content">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="min-h-screen"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
        <Footer onNavigate={handleNavigate} />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.02)_0%,_transparent_60%)]" />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
